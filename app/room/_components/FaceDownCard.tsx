export default async function FaceDownCard() {
  return (
    <div className="relative w-75 h-105 bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 rounded-3xl shadow-2xl flex flex-col justify-center items-center border-4 border-white">
      {/* Inner border decoration  */}
      <div className="absolute inset-2 border border-white/20 rounded-2xl pointer-events-none"></div>

      {/* Top-left corner  */}
      <div className="absolute top-5 left-5 text-4xl font-bold text-white drop-shadow-lg">
        ?
      </div>

      {/* Bottom-right corner (rotated)  */}
      <div className="absolute bottom-5 right-5 text-4xl font-bold text-white drop-shadow-lg rotate-180">
        ?
      </div>

      {/* Logo container  */}
      <div className="w-50 h-50 bg-white/95 rounded-2xl flex justify-center items-center shadow-xl p-5">
        <img
          src="/logo-v2-mini.drawio.svg"
          alt="John Florentino Dunglao Logo"
        />
      </div>

      {/* Card title  */}
      <div className="absolute bottom-7 text-white text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-lg">
        Story Points
      </div>
    </div>
  );
}
