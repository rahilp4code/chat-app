export default function TypingIndicator({ typingUsers }) {
  if (typingUsers.size === 0) return null;

  return (
    <div className="px-4 text-xs opacity-60">
      {[...typingUsers].map((u) => (
        <span key={u}>{u} is typing… </span>
      ))}
    </div>
  );
}
