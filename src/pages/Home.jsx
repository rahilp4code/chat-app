import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      {/* Hero */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-semibold tracking-tight">Velora</h1>

          <p className="text-xl text-[var(--muted)]">
            A quiet space for real conversations.
          </p>

          <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
            Create a room. Share a link. Talk in real-time — without noise,
            feeds, or distractions.
          </p>

          <div className="pt-4">
            <Link
              to="/login"
              className="
                inline-flex items-center justify-center
                rounded-xl px-6 py-3 text-sm font-medium
                bg-[var(--accent)] text-white
                shadow-lg shadow-[var(--accent)]/30
                hover:scale-[1.02] transition
              "
            >
              Enter Velora
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Velora
      </footer>
    </div>
  );
}
