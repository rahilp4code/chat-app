// src/components/Sidebar.jsx
import React from "react";

// 🔹 Avatar color generator
function avatarColor(name) {
  const colors = [
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

// 🔹 Avatar component
function Avatar({ name }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full
      bg-gradient-to-br ${avatarColor(name)} text-sm font-semibold text-white`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

export default function Sidebar({ onlineUsers, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-30 flex h-full w-64 flex-col
        border-r border-white/10
        bg-white/5 backdrop-blur-xl
        p-4 transition-transform md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <h2 className="mb-4 text-lg font-semibold tracking-wide">Online</h2>

        {/* Users */}
        <ul className="space-y-3">
          {onlineUsers.map((user) => (
            <li
              key={user}
              className="flex items-center gap-3 rounded-xl
              bg-white/5 p-2 hover:bg-white/10 transition"
            >
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <Avatar name={user} />
              <span className="text-sm">{user}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
