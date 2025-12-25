export default function ChatInput({
  input,
  setInput,
  sendMessage,
  handleTyping,
}) {
  return (
    <footer className="flex items-center gap-2 border-t border-white/10 bg-[var(--panel)] p-4">
      <div className="flex items-center gap-3 w-full px-6 py-4 border-t border-[var(--border)]">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Say something soft…"
          className="
    flex-1
    px-4 py-3
    rounded-full
    bg-[var(--panel)]
    text-[var(--text-primary)]
    border border-[var(--border)]
    focus:outline-none
    focus:ring-2 focus:ring-blue-500/40
  "
        />
        <button
          onClick={sendMessage}
          // className="rounded-full bg-[var(--accent)] px-4 py-2"
          className="
      px-5 py-2
      rounded-full
      bg-blue-500
      text-white
      font-medium
      hover:bg-blue-600
      transition
    "
        >
          Send
        </button>
      </div>
    </footer>
  );
}

// export default function ChatInput({ message, setMessage, sendMessage }) {
//   return (
//     <div
//       className="
//         w-full
//         border-t border-[var(--border)]
//         bg-[var(--panel)]
//         px-6 py-4
//       "
//     >
//       <form onSubmit={sendMessage} className="flex items-center gap-3">
//         {/* Input */}
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Say something soft..."
//           className="
//             flex-1
//             rounded-full
//             px-5 py-3
//             text-sm
//             bg-[var(--input)]
//             text-[var(--text-primary)]
//             placeholder:text-gray-400
//             border border-[var(--border)]
//             outline-none
//             focus:ring-2 focus:ring-blue-500/40
//             transition
//           "
//         />

//         {/* Send button */}
//         <button
//           type="submit"
//           className="
//             rounded-full
//             bg-blue-500
//             px-5 py-3
//             text-sm font-medium
//             text-white
//             hover:bg-blue-600
//             transition
//           "
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
