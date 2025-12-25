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

export default function Sidebar({ onlineUsers }) {
  return (
    <aside
      className="
  hidden md:flex
  w-64
  bg-[var(--panel)]
  border-r border-[var(--border)]
  p-2
"
    >
      <div className="px-4 py-4">
        <h2 className="mb-4 text-sm font-semibold uppercase opacity-60">
          Online
        </h2>

        <div className="space-y-2">
          {onlineUsers.map((user) => (
            <div
              key={user}
              className="flex items-center gap-3 rounded-lg px-3 py-2
                hover:bg-black/5 transition"
            >
              <div
                className="h-8 w-8 rounded-full bg-blue-500/80 text-white
                              flex items-center justify-center text-xs font-medium"
              >
                {user[0]?.toUpperCase()}
              </div>
              <span className="text-sm">{user}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
