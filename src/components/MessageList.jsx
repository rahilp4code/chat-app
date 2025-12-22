import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, messagesEndRef }) {
  return (
    <section className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((m, i) => (
        <MessageBubble key={i} message={m} />
      ))}
      <div ref={messagesEndRef} />
    </section>
  );
}
