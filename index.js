import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

/**
 * rooms = Map<
 *   roomName,
 *   Map<
 *     clientId,
 *     { socket, username }
 *   >
 * >
 */
const rooms = new Map();

console.log("✅ WebSocket server running on ws://localhost:8080");

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    let msg;

    try {
      msg = JSON.parse(data.toString());
    } catch {
      return;
    }

    const { type } = msg;

    // =====================
    // JOIN (with reconnect)
    // =====================
    if (type === "join") {
      const { clientId, username, room } = msg;

      socket.clientId = clientId;
      socket.username = username;
      socket.room = room;

      if (!rooms.has(room)) {
        rooms.set(room, new Map());
      }

      const roomMap = rooms.get(room);
      const existing = roomMap.get(clientId);

      // 🔁 Reconnect
      if (existing) {
        existing.socket = socket;
        broadcastUserList(room);
        return;
      }

      // 🆕 New user
      roomMap.set(clientId, { socket, username });
      broadcastUserList(room);

      broadcastToRoom(room, {
        type: "system",
        message: `${username} joined the room`,
      });

      return;
    }

    // ============
    // CHAT
    // ============
    if (type === "chat") {
      const { room, clientId } = socket;
      if (!room || !rooms.has(room)) return;

      for (const [id, entry] of rooms.get(room)) {
        if (id !== clientId && entry.socket.readyState === entry.socket.OPEN) {
          entry.socket.send(JSON.stringify(msg));
        }
      }
      return;
    }

    // =================
    // TYPING
    // =================
    if (type === "typing") {
      const { room, clientId, username } = socket;
      if (!room || !rooms.has(room)) return;

      for (const [id, entry] of rooms.get(room)) {
        if (id !== clientId && entry.socket.readyState === entry.socket.OPEN) {
          entry.socket.send(
            JSON.stringify({
              type: "typing",
              username,
              isTyping: msg.isTyping,
            })
          );
        }
      }
    }
  });

  // =====================
  // DISCONNECT (graceful)
  // =====================
  socket.on("close", () => {
    const { room, clientId, username } = socket;
    if (!room || !rooms.has(room)) return;

    const roomMap = rooms.get(room);

    // Grace period (refresh-safe)
    setTimeout(() => {
      const entry = roomMap.get(clientId);

      if (entry && entry.socket === socket) {
        roomMap.delete(clientId);
        broadcastUserList(room);

        broadcastToRoom(room, {
          type: "system",
          message: `${username} left the room`,
        });
      }
    }, 2000);
  });
});

// =====================
// HELPERS
// =====================

function broadcastUserList(room) {
  const roomMap = rooms.get(room);
  if (!roomMap) return;

  const users = [...roomMap.values()].map((u) => u.username);

  broadcastToRoom(room, {
    type: "users",
    users,
  });
}

function broadcastToRoom(room, payload) {
  const roomMap = rooms.get(room);
  if (!roomMap) return;

  const data = JSON.stringify(payload);

  for (const { socket } of roomMap.values()) {
    if (socket.readyState === socket.OPEN) {
      socket.send(data);
    }
  }
}
