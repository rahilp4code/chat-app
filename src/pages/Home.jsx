// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
//       {/* Hero */}
//       <main className="flex flex-1 items-center justify-center px-6">
//         <div className="max-w-2xl text-center space-y-6">
//           <h1 className="text-5xl font-semibold tracking-tight">Velora</h1>

//           <p className="text-xl text-[var(--muted)]">
//             A quiet space for real conversations.
//           </p>

//           <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
//             Create a room. Share a link. Talk in real-time — without noise,
//             feeds, or distractions.
//           </p>

//           <div className="pt-4">
//             <Link
//               to="/login"
//               className="
//                 inline-flex items-center justify-center
//                 rounded-xl px-6 py-3 text-sm font-medium
//                 bg-[var(--accent)] text-white
//                 shadow-lg shadow-[var(--accent)]/30
//                 hover:scale-[1.02] transition
//               "
//             >
//               Enter Velora
//             </Link>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="py-6 text-center text-xs text-[var(--muted)]">
//         © {new Date().getFullYear()} Velora
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      {/* Hero */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
            Velora
          </h1>

          <p className="text-xl text-[var(--muted)]">
            A quiet space for real conversations.
          </p>

          <p className="text-sm text-[var(--muted)] max-w-xl mx-auto">
            Create a room, share the name, and start talking instantly — no
            accounts, no feeds, no distractions.
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

      {/* How it works */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Choose a name",
              desc: "Pick a username — no signups or profiles required.",
            },
            {
              title: "Create a room",
              desc: "Start a new room or join an existing one instantly.",
            },
            {
              title: "Talk freely",
              desc: "Real-time chat with no noise, feeds, or pressure.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl border border-[var(--border)]
                bg-[var(--panel)]
                p-6 text-center
              "
            >
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-6 flex justify-center gap-6 text-[var(--muted)]">
        <a
          href="https://github.com/"
          target="_blank"
          className="hover:text-[var(--accent)] transition"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          className="hover:text-[var(--accent)] transition"
        >
          Twitter
        </a>
      </footer>
    </div>
  );
}
