export default async function FaceUpCard() {
  return (
    <div className="relative w-75 h-105 bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 rounded-3xl shadow-2xl flex flex-col justify-center items-center border-4 border-white p-2">
      <div className="bg-white border border-transparent rounded-xl w-full h-full relative">
        {/* Inner border decoration */}
        <div className="absolute inset-5 border border-black/20 rounded-2xl pointer-events-none"></div>

        {/* Top-left corner - Small number */}
        <div className="absolute top-2 left-2 text-3xl font-bold drop-shadow-lg z-2 border-indigo-700 border-4 rounded-full w-14 h-14 flex justify-center items-center bg-white/95">
          <span>5</span>
        </div>

        {/* Center - Large number */}
        <div className="text-[180px] font-bold drop-shadow-2xl leading-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
          5
        </div>

        {/* Bottom-right logo container */}
        <div className="absolute bottom-2 right-2 w-14 h-14 bg-white/95 border-4 border-indigo-700 rounded-full flex justify-center items-center shadow-xl p-2 z-2">
          <img
            src="/logo-v2-mini.drawio.svg"
            alt="John Florentino Dunglao Logo"
          />
        </div>
      </div>
    </div>
  );
}
