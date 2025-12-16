import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();
const rooms = new Map();

console.log("✅ WebSocket server running on ws://localhost:8080");

wss.on("connection", (socket) => {
  clients.add(socket);
  console.log("🟢 Client connected | Total:", clients.size);

  socket.on("message", (data) => {
    let parsedMessage;

    try {
      parsedMessage = JSON.parse(data.toString());
    } catch (err) {
      console.log("❌ Invalid JSON");
      console.log(err);
      return;
    }

    console.log("📩 Message object:", parsedMessage);

    if (parsedMessage.type === "join") {
      const { username, room } = parsedMessage;
      //   localStorage.setItem("user", JSON.stringify({ username, room })); no locale storage in backend
      socket.username = username;
      socket.room = room;

      if (!rooms.has(room)) {
        rooms.set(room, new Map());
      }

      rooms.get(room).set(socket, username);
      //   rooms.get(room).add(socket);

      broadcastUserList(room);
      console.log(`🟢 ${username} joined ${room}`);
      const systemMessage = {
        type: "system",
        message: `${username} joined the room`,
      };

      for (const client of rooms.get(room).keys()) {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(systemMessage));
        }
      }

      return;
    }
    if (parsedMessage.type === "chat") {
      const room = socket.room;

      if (!room || !rooms.has(room)) return;

      for (const client of rooms.get(room).keys()) {
        if (client !== socket && client.readyState === client.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      }
    }
    if (parsedMessage.type === "typing") {
      const room = socket.room;

      for (const client of rooms.get(room).keys()) {
        if (client !== socket && client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              type: "typing",
              username: socket.username,
              isTyping: parsedMessage.isTyping,
            })
          );
        }
      }
    }
  });

  socket.on("close", () => {
    const room = socket.room;
    const username = socket.username;

    if (!room || !rooms.has(room)) return;

    const roomMap = rooms.get(room);

    roomMap.delete(socket);
    broadcastUserList(room);

    // Grace period to avoid refresh spam
    setTimeout(() => {
      // Only send leave if user didn't rejoin
      const stillInRoom = [...roomMap.values()].includes(username);

      if (!stillInRoom) {
        const leaveMessage = {
          type: "system",
          message: `${username} left the room`,
        };

        for (const client of roomMap.keys()) {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(leaveMessage));
          }
        }
      }
    }, 2000);
  });
});

function broadcastUserList(room) {
  const users = Array.from(rooms.get(room).values());

  const payload = JSON.stringify({
    type: "users",
    users,
  });

  for (const client of rooms.get(room).keys()) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
}
