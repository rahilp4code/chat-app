// import { useEffect, useRef, useState } from "react";
// import Sidebar from "./components/Sidebar";
// import ChatHeader from "./components/ChatHeader";
// import MessageList from "./components/MessageList";
// import TypingIndicator from "./components/TypingIndicator";
// import ChatInput from "./components/ChatInput";

// export default function App() {
//   const currentUser = localStorage.getItem("velora-username");
//   const [token, setToken] = useState(localStorage.getItem("velora-token"));

//   async function login(username, room) {
//     const res = await fetch("http://localhost:8080/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, room }),
//     });

//     const data = await res.json();
//     localStorage.setItem("velora-token", data.token);
//     localStorage.setItem("velora-username", username);
//     setToken(data.token);
//   }

//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const [theme, setTheme] = useState(
//     () => localStorage.getItem("velora-theme") || "rose"
//   );
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [typingUsers, setTypingUsers] = useState(new Set());
//   const [input, setInput] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const room = "general";

//   // Theme
//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("velora-theme", theme);
//   }, [theme]);

//   // WebSocket
//   useEffect(() => {
//     if (!token) return;

//     socketRef.current = new WebSocket(`ws://localhost:8080?token=${token}`);

//     socketRef.current.onopen = () => {
//       socketRef.current.send(JSON.stringify({ type: "join", room }));
//     };

//     socketRef.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "users") {
//         setOnlineUsers(data.users);
//         setTypingUsers(new Set());
//         return;
//       }

//       if (data.type === "typing") {
//         setTypingUsers((prev) => {
//           const next = new Set(prev);
//           data.isTyping ? next.add(data.username) : next.delete(data.username);
//           return next;
//         });
//         return;
//       }

//       setMessages((prev) => [
//         ...prev,
//         {
//           ...data,
//           ts: data.ts || Date.now(),
//           self: data.username === currentUser,
//         },
//       ]);
//     };

//     return () => socketRef.current?.close();
//   }, [token]);

//   // Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Send message
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     socketRef.current.send(JSON.stringify({ type: "chat", message: input }));
//     setInput("");
//   };

//   // Typing
//   const handleTyping = () => {
//     socketRef.current.send(JSON.stringify({ type: "typing", isTyping: true }));

//     clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       socketRef.current.send(
//         JSON.stringify({ type: "typing", isTyping: false })
//       );
//     }, 800);
//   };

//   const addReaction = (index, emoji) => {
//     setMessages((prev) =>
//       prev.map((msg, i) => {
//         if (i !== index) return msg;

//         return {
//           ...msg,
//           reactions: {
//             ...(msg.reactions || {}),
//             [emoji]: (msg.reactions?.[emoji] || 0) + 1,
//           },
//         };
//       })
//     );
//   };

//   if (!token) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             login(e.target.username.value, e.target.room.value);
//           }}
//           className="rounded-xl bg-[var(--panel)] p-6"
//         >
//           <h2 className="mb-4 text-lg">Login to Velora</h2>
//           <input
//             name="username"
//             placeholder="Username"
//             className="mb-3 w-full rounded bg-white/10 p-2"
//           />
//           <input
//             name="room"
//             placeholder="Room name"
//             className="mb-3 w-full rounded bg-white/10 p-2"
//           />
//           <button className="w-full rounded bg-[var(--accent)] p-2 text-black">
//             Enter
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
//       <div className="mx-auto flex h-screen max-w-7xl">
//         <Sidebar
//           onlineUsers={onlineUsers}
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//         />

//         <main className="flex flex-1 flex-col">
//           <ChatHeader
//             theme={theme}
//             setTheme={setTheme}
//             onMenu={() => setSidebarOpen(true)}
//           />

//           <MessageList
//             messages={messages}
//             messagesEndRef={messagesEndRef}
//             addReaction={addReaction}
//           />
//           <TypingIndicator typingUsers={typingUsers} />

//           <ChatInput
//             input={input}
//             setInput={setInput}
//             sendMessage={sendMessage}
//             handleTyping={handleTyping}
//           />
//         </main>
//       </div>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
