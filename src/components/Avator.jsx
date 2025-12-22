export default function Avatar({ name }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full 
      bg-gradient-to-br ${avatarColor(name)} text-sm font-semibold text-white`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

function avatarColor(name) {
  const colors = [
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}
