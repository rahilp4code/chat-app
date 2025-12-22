export default function ChatInput({
  input,
  setInput,
  sendMessage,
  handleTyping,
}) {
  return (
    <footer className="flex items-center gap-2 border-t border-white/10 bg-[var(--panel)] p-4">
      <div className="flex items-center gap-2 rounded-full bg-white/5 p-2">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Say something soft…"
          className="flex-1 bg-transparent px-4 py-2 outline-none"
          // className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm outline-none"
          //  text-sm text-black
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-[var(--accent)] px-4 py-2"
        >
          Send
        </button>
      </div>
    </footer>
  );
}
