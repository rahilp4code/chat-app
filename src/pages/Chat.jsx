export default function Chat() {
  const { messages, sendMessage } = useChatSocket();
  const { theme, toggleTheme } = useTheme();

  return (
    <ChatLayout>
      <Sidebar />
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </ChatLayout>
  );
}
