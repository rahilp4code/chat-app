import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 z-50
        rounded-full border border-[var(--border)]
        bg-[var(--panel)]
        px-3 py-1 text-xs
        hover:shadow transition
      "
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
