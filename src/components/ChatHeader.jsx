export default function ChatHeader({ theme, setTheme, onMenu }) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[var(--panel)] px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenu}
          className="md:hidden rounded bg-white/10 px-2 py-1"
        >
          ☰
        </button>
        <div className="font-medium">General</div>
      </div>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded bg-white/10 px-2 py-1 text-sm outline-none"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="rose">Rose</option>
      </select>
    </header>
  );
}
