export default function MessageList({ messages, messagesEndRef, addReaction }) {
  return (
    // <div className="flex-1 overflow-y-auto px-6 py-4 bg-[var(--panel-soft)]" >
    //   <div
    //     className="
    //   flex-1
    //   bg-[var(--panel-soft)]
    //   overflow-y-auto
    //   px-6 py-4
    // "
    //   >
    <div className="flex-1 bg-white dark:bg-[var(--panel)] auto px-6 py-4 space-y-4">
      {messages.map((msg, i) => {
        if (msg.type === "system") {
          return (
            <div
              key={i}
              className="flex justify-center my-2" // 👈 GAP ADDED
            >
              <div
                className="
        px-4 py-1.5
        rounded-full
        text-xs
        bg-[var(--panel-soft)]
        text-[var(--text-muted)]
        border border-[var(--border)]
      "
              >
                {msg.message}
              </div>
            </div>
          );
        }

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
                className={`rounded-2xl px-4 py-2 text-sm Shadow
    ${
      isSelf
        ? "bg-[var(--accent)] text-white"
        : "bg-[var(--panel-soft)] text-[var(--text)]"
    }
  `}
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

// export default function MessageList({ messages, messagesEndRef, addReaction }) {
//   return (
//     <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
//       {messages.map((msg, i) => {
//         const isSelf = msg.self;
//         const isSystem = msg.type === "system";

//         /* ---------------- SYSTEM MESSAGE ---------------- */
//         if (isSystem) {
//           return (
//             <div key={i} className="flex justify-center my-4">
//               <div
//                 className="
//                   px-4 py-1.5
//                   rounded-full
//                   text-xs
//                   bg-black/10 dark:bg-white/10
//                   text-gray-600 dark:text-gray-400
//                 "
//               >
//                 {msg.message}
//               </div>
//             </div>
//           );
//         }

//         /* ---------------- USER MESSAGE ---------------- */
//         return (
//           <div
//             key={i}
//             className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
//           >
//             <div className="group relative max-w-[70%]">
//               {/* Username (grouped messages hide this upstream if needed) */}
//               {!isSelf && msg.username && (
//                 <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
//                   {msg.username}
//                 </div>
//               )}

//               {/* Reaction bar (non-system only) */}
//               <div
//                 className="
//                   absolute -top-9 left-0 z-20
//                   flex gap-2
//                   rounded-full
//                   bg-black/70
//                   px-2 py-1
//                   text-sm
//                   opacity-0
//                   group-hover:opacity-100
//                   transition
//                 "
//               >
//                 {["❤️", "👍", "😂"].map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => addReaction(i, emoji)}
//                     className="hover:scale-110 transition"
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>

//               {/* Message bubble */}
//               <div
//                 className={`
//                   relative
//                   rounded-2xl
//                   px-4 py-2
//                   text-sm
//                   ${
//                     isSelf
//                       ? "rounded-br-sm bg-blue-500 text-white"
//                       : "rounded-bl-sm bg-[var(--bubble-other)] text-[var(--text-primary)] border border-[var(--border)]"
//                   }
//                 `}
//               >
//                 <div className="pr-12">{msg.message}</div>

//                 {/* Timestamp */}
//                 {msg.ts && (
//                   <div
//                     className={`
//                       absolute bottom-1 right-2
//                       text-[10px]
//                       opacity-60
//                       ${
//                         isSelf
//                           ? "text-white/70"
//                           : "text-gray-500 dark:text-gray-400"
//                       }
//                     `}
//                   >
//                     {new Date(msg.ts).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>
//                 )}

//                 {/* Reactions */}
//                 {msg.reactions && (
//                   <div className="mt-1 flex gap-1 text-xs">
//                     {Object.entries(msg.reactions).map(([emoji, count]) => (
//                       <span
//                         key={emoji}
//                         className="rounded-full bg-black/20 dark:bg-white/20 px-2 py-0.5"
//                       >
//                         {emoji} {count}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       <div ref={messagesEndRef} />
//     </div>
//   );
// }
