import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !room) {
      setError("Username and room are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, room }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      localStorage.setItem("velora-token", data.token);
      localStorage.setItem("velora-username", username);
      localStorage.setItem("velora-room", room);

      navigate("/chat");
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-6">
      <div
        className="
          w-full max-w-md rounded-2xl
          bg-[var(--panel)]
          border border-[var(--border)]
          p-8 shadow-xl
        "
      >
        {/* Header */}
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-2xl font-semibold">Enter Velora</h1>
          <p className="text-sm text-[var(--muted)]">
            A quiet space for real conversations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs text-[var(--muted)]">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className="
                w-full rounded-xl px-4 py-2 text-sm
                bg-transparent
                border border-[var(--border)]
                outline-none
                focus:ring-2 focus:ring-[var(--accent)]/30
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-xs text-[var(--muted)]">
              Room name
            </label>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. friends, work, chill"
              className="
                w-full rounded-xl px-4 py-2 text-sm
                bg-transparent
                border border-[var(--border)]
                outline-none
                focus:ring-2 focus:ring-[var(--accent)]/30
              "
            />
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 w-full rounded-xl px-4 py-2 text-sm font-medium
              bg-[var(--accent)] text-white
              shadow-lg shadow-[var(--accent)]/30
              hover:scale-[1.02] transition
              disabled:opacity-50
            "
          >
            {loading ? "Entering..." : "Enter Velora"}
          </button>
        </form>
      </div>
    </div>
  );
}
