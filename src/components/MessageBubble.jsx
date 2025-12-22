import Avatar from "./Avator";

export default function MessageBubble({ message }) {
  if (message.type === "system") {
    return (
      <div className="text-center text-xs opacity-60">{message.message}</div>
    );
  }

  return (
    <div className={`flex ${message.self ? "justify-end" : "justify-start"}`}>
      <Avatar name={message.username} />
      <div
        className={`max-w-md rounded-2xl px-4 py-2 text-sm
          ${message.self ? "bg-[var(--accent)] text-black" : "bg-white/10"}`}
      >
        {!message.self && (
          <div className="mb-1 text-xs opacity-60">{message.username}</div>
        )}
        {message.message}
      </div>
    </div>
  );
}
