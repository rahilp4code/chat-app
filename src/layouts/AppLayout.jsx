import ThemeToggle from "../components/ThemeToggle";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ThemeToggle />
      {children}
    </div>
  );
}
