export default function FaceDownCard() {
  return (
    <div className="relative w-32 h-44 bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 rounded-2xl shadow-2xl flex flex-col justify-center items-center border-4 border-white">
      {/* Inner border decoration  */}
      <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none"></div>

      {/* Top-left corner  */}
      <div className="absolute top-3 left-3 text-2xl font-bold text-white drop-shadow-lg">
        ?
      </div>

      {/* Bottom-right corner (rotated)  */}
      <div className="absolute bottom-3 right-3 text-2xl font-bold text-white drop-shadow-lg rotate-180">
        ?
      </div>

      {/* Logo container  */}
      <div className="w-16 h-16 bg-white/95 rounded-xl flex justify-center items-center shadow-xl p-3">
        <img
          src="/logo-v2-mini.drawio.svg"
          alt="John Florentino Dunglao Logo"
        />
      </div>
    </div>
  );
}
