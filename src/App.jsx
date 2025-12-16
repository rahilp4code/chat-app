import { useEffect, useRef, useState } from "react";

export default function App() {
  const socketRef = useRef(null);
  // const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState(() => {
  //   const cached = localStorage.getItem("messages");
  //   return cached ? JSON.parse(cached) : [];
  // });
  const [messages, setMessages] = useState(() => {
    const cached = localStorage.getItem("messages");
    if (!cached) return [];

    return JSON.parse(cached).filter((m) => m.type !== "system");
  });

  const [input, setInput] = useState("");
  const [onlineUSer, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  // const [username, setUsername] = useState("Ehsaan");
  // const [room, setRoom] = useState("general");

  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    socketRef.current.send(
      JSON.stringify({
        type: "typing",
        isTyping: true,
      })
    );

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.send(
        JSON.stringify({
          type: "typing",
          isTyping: false,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({
          type: "join",
          username: "ehsaan",
          room: "general",
        })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        setOnlineUsers(data.users);
      } else if (data.type === "typing") {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          data.isTyping
            ? updated.add(data.username)
            : updated.delete(data.username);
          return updated;
        });
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => socketRef.current.close();
  }, []);

  const sendMessage = () => {
    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        message: input,
      })
    );
    setInput("");
  };

  // useEffect(() => {
  //   const cachedMessages = localStorage.getItem("messages");
  //   const cachedUser = localStorage.getItem("user");

  //   if (cachedMessages) {
  //     setMessages(JSON.parse(cachedMessages));
  //   }

  //   if (cachedUser) {
  //     const { username, room } = JSON.parse(cachedUser);
  //     setUsername(username);
  //     setRoom(room);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const trimmed = messages.slice(-50); // limit
  //     localStorage.setItem("messages", JSON.stringify(trimmed));
  //   }
  // }, [messages]);

  return (
    <div>
      <h2>Chat</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            {m.type === "system" ? "🟡 " : "💬 "}
            {m.message}
          </p>
        ))}
        <div>
          {[...typingUsers].map((user) => (
            <p key={user}>{user} is typing...</p>
          ))}
        </div>
      </div>

      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleTyping();
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
