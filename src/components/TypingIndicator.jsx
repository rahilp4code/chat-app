// export default function TypingIndicator({ typingUsers }) {
//   if (typingUsers.size === 0) return null;

//   return (
//     <div className="px-4 text-xs opacity-60">
//       {[...typingUsers].map((u) => (
//         <span key={u}>{u} is typing… </span>
//       ))}
//     </div>
//   );
// }
export default function TypingIndicator({ typingUsers }) {
  if (!typingUsers.size) return null;

  return (
    <div className="px-4 pb-2 text-sm text-white/60">
      {Array.from(typingUsers).join(", ")} typing
      <span className="ml-1 inline-flex gap-1">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </span>
    </div>
  );
}
