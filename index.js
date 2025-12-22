import http from "http";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

const JWT_SECRET = "velora_super_secret";
const disconnectTimers = new Map();

const server = http.createServer((req, res) => {
  // 🔥 CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    // req.on("end", () => {
    //   const { username } = JSON.parse(body);

    //   if (!username) {
    //     res.writeHead(400);
    //     return res.end("Username required");
    //   }

    //   const token = jwt.sign({ username }, JWT_SECRET, {
    //     expiresIn: "7d",
    //   });

    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(JSON.stringify({ token }));
    // });
    req.on("end", () => {
      const { username, room } = JSON.parse(body);

      if (!username || !room) {
        res.writeHead(400);
        return res.end("Username and room required");
      }

      const token = jwt.sign({ username, room }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ token }));
    });
  }
});

const wss = new WebSocketServer({ server });
server.listen(8080, () =>
  console.log("✅ Server running on http://localhost:8080")
);

const rooms = new Map();

wss.on("connection", (socket, req) => {
  const params = new URLSearchParams(req.url.replace("/?", ""));
  const token = params.get("token");

  if (!token) return socket.close();

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return socket.close();
  }

  socket.username = payload.username;
  socket.room = payload.room;

  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    // if (msg.type === "join") {
    //   socket.room = msg.room;

    //   if (!rooms.has(socket.room)) {
    //     rooms.set(socket.room, new Map());
    //   }

    //   const roomMap = rooms.get(socket.room);
    //   roomMap.set(socket.username, socket);

    //   broadcastUserList(socket.room);

    //   broadcastToRoom(socket.room, {
    //     type: "system",
    //     message: `${socket.username} joined the room`,
    //   });
    // }

    if (msg.type === "join") {
      const room = socket.room;

      if (!rooms.has(room)) {
        rooms.set(room, new Map());
      }

      const roomMap = rooms.get(room);

      // 🔁 Cancel pending disconnect (refresh-safe)
      if (disconnectTimers.has(socket.username)) {
        clearTimeout(disconnectTimers.get(socket.username));
        disconnectTimers.delete(socket.username);
      }

      const isReconnect = roomMap.has(socket.username);

      // Always update socket reference
      roomMap.set(socket.username, socket);

      broadcastUserList(room);

      // 🟢 Only announce if this is a REAL join
      if (!isReconnect) {
        broadcastToRoom(room, {
          type: "system",
          message: `${socket.username} joined ${room}`,
        });
      }
    }

    if (msg.type === "chat") {
      broadcastToRoom(socket.room, {
        type: "chat",
        username: socket.username,
        message: msg.message,
      });
    }

    if (msg.type === "typing") {
      broadcastToRoom(socket.room, {
        type: "typing",
        username: socket.username,
        isTyping: msg.isTyping,
      });
    }
  });

  // socket.on("close", () => {
  //   const roomMap = rooms.get(socket.room);
  //   if (!roomMap) return;

  //   roomMap.delete(socket.username);
  //   broadcastUserList(socket.room);

  //   broadcastToRoom(socket.room, {
  //     type: "system",
  //     message: `${socket.username} left the room`,
  //   });
  // });

  socket.on("close", () => {
    const { room, username } = socket;
    if (!room || !rooms.has(room)) return;

    const roomMap = rooms.get(room);

    const timer = setTimeout(() => {
      // 🛑 If user reconnected, skip delete
      if (roomMap.get(username) !== socket) return;

      roomMap.delete(username);
      broadcastUserList(room);

      broadcastToRoom(room, {
        type: "system",
        message: `${username} left the room`,
      });

      disconnectTimers.delete(username);
    }, 2000);

    disconnectTimers.set(username, timer);
  });
});

function broadcastUserList(room) {
  const roomMap = rooms.get(room);
  if (!roomMap) return;

  const users = [...roomMap.keys()];
  broadcastToRoom(room, { type: "users", users });
}

function broadcastToRoom(room, payload) {
  const roomMap = rooms.get(room);
  if (!roomMap) return;

  const data = JSON.stringify(payload);
  for (const socket of roomMap.values()) {
    if (socket.readyState === socket.OPEN) {
      socket.send(data);
    }
  }
}
