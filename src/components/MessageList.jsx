export default function MessageList({ messages, messagesEndRef, addReaction }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg, i) => {
        const isSelf = msg.self;

        const prev = messages[i - 1];
        const isSameSender =
          prev &&
          prev.username === msg.username &&
          prev.self === msg.self &&
          prev.type !== "system";

        return (
          <div
            key={i}
            className={`flex ${isSelf ? "justify-end" : "justify-start"} ${
              isSameSender ? "mt-1" : "mt-4"
            }`}
          >
            <div className="group relative max-w-[70%]">
              {/* ✅ Username only if first message from sender */}
              {!isSelf && !isSameSender && msg.username && (
                <div className="mb-1 text-xs text-white/50">{msg.username}</div>
              )}

              {/* Reaction bar (unchanged) */}
              <div
                className="absolute -top-9 left-0 z-20 flex gap-2
          rounded-full bg-black/70 px-2 py-1 text-sm
          backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
              >
                {["❤️", "👍", "😂"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addReaction(i, emoji)}
                    className="transition hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Message bubble */}
              <div
                className={`animate-popIn rounded-2xl px-4 py-2 text-sm shadow
          ${
            isSelf
              ? "rounded-br-sm bg-[var(--accent)] text-black"
              : "rounded-bl-sm bg-white/10 text-white"
          }`}
              >
                <div className="flex items-end gap-2">
                  <span className="break-words">{msg.message}</span>

                  {msg.ts && (
                    <span
                      className={`shrink-0 text-[10px] opacity-60 ${
                        isSelf ? "text-black/70" : "text-white/50"
                      }`}
                    >
                      {new Date(msg.ts).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                {msg.reactions && (
                  <div className="mt-1 flex gap-1 text-xs">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <span
                        key={emoji}
                        className="rounded-full bg-black/30 px-2 py-0.5"
                      >
                        {emoji} {count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
