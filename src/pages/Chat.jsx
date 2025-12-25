import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const currentUser = localStorage.getItem("velora-username");
  const token = localStorage.getItem("velora-token");

  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [input, setInput] = useState("");

  const room = localStorage.getItem("velora-room");

  // ============================
  // WebSocket
  // ============================
  useEffect(() => {
    if (!token) return;

    socketRef.current = new WebSocket(`ws://localhost:8080?token=${token}`);

    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ type: "join", room }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        setOnlineUsers(data.users);
        setTypingUsers(new Set());
        return;
      }

      if (data.type === "typing") {
        setTypingUsers((prev) => {
          const next = new Set(prev);
          data.isTyping ? next.add(data.username) : next.delete(data.username);
          return next;
        });
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          ...data,
          ts: data.ts || Date.now(),
          self: data.username === currentUser,
        },
      ]);
    };

    return () => socketRef.current?.close();
  }, [token, room, currentUser]);

  // ============================
  // Auto-scroll
  // ============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ============================
  // Send message
  // ============================
  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current.send(JSON.stringify({ type: "chat", message: input }));
    setInput("");
  };

  // ============================
  // Typing
  // ============================
  const handleTyping = () => {
    socketRef.current.send(JSON.stringify({ type: "typing", isTyping: true }));

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.send(
        JSON.stringify({ type: "typing", isTyping: false })
      );
    }, 800);
  };

  // ============================
  // Reactions
  // ============================
  const addReaction = (index, emoji) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? {
              ...msg,
              reactions: {
                ...(msg.reactions || {}),
                [emoji]: (msg.reactions?.[emoji] || 0) + 1,
              },
            }
          : msg
      )
    );
  };

  return (
    // <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
    //   <div className="mx-auto flex h-screen max-w-7xl">
    //     <Sidebar
    //       onlineUsers={onlineUsers}
    //       isOpen={sidebarOpen}
    //       onClose={() => setSidebarOpen(false)}
    //     />

    //     <main className="flex flex-1 flex-col">
    //       <ChatHeader onMenu={() => setSidebarOpen(true)} />

    //       <MessageList
    //         messages={messages}
    //         messagesEndRef={messagesEndRef}
    //         addReaction={addReaction}
    //       />

    //       <TypingIndicator typingUsers={typingUsers} />

    //       <ChatInput
    //         input={input}
    //         setInput={setInput}
    //         sendMessage={sendMessage}
    //         handleTyping={handleTyping}
    //       />
    //     </main>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-[var(--app-bg)]">
      {/* APP CONTAINER */}
      <div
        className="w-full max-w-6xl h-[85vh] rounded-2xl
               bg-[var(--panel)]
               border border-[var(--border)]
               shadow-xl
               flex overflow-hidden"
      >
        {/* <div
        className="   mx-auto w-full max-w-[1200px] h-[92vh]
          bg-[var(--panel)]
          border border-[var(--border)]
          rounded-2xl
          shadow-lg
          overflow-hidden
          flex"
      > */}
        {/* SIDEBAR */}
        <Sidebar onlineUsers={onlineUsers} />

        {/* CHAT AREA */}
        <div className="flex flex-1 flex-col">
          <ChatHeader />

          <div className="flex-1 overflow-hidden">
            <MessageList
              messages={messages}
              messagesEndRef={messagesEndRef}
              addReaction={addReaction}
            />
          </div>

          <TypingIndicator typingUsers={typingUsers} />
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            handleTyping={handleTyping}
          />
        </div>
      </div>
    </div>
  );
}
