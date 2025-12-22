// export default function Sidebar({ onlineUsers, isOpen, onClose }) {
//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 z-40 bg-black/40 md:hidden"
//         />
//       )}

//       <aside
//         className={`fixed z-50 h-full w-72 transform border-r border-white/10 bg-[var(--panel)] p-4 transition-transform md:static md:translate-x-0
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <h1 className="mb-6 text-xl font-semibold">Velora</h1>

//         <div className="mb-2 text-xs opacity-60">Online</div>
//         <div className="space-y-1 text-sm">
//           {onlineUsers.map((u) => ({
//            <div key={u}>{u}</div>
//            }))}
//         </div>
//       </aside>
//     </>
//   );
// }

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

// lets do this:
// Message timestamps (on hover)
// Reactions ❤️ 👍
// Sounds
