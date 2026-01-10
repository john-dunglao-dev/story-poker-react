import { Card } from '../_models/Card';

const defaultValue: Card = {
  type: 'string',
  points: '?',
};

export default function FaceUpCard({
  type,
  points,
}: Partial<Card> = defaultValue) {
  return (
    <div className="text-black relative w-32 h-44 bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 rounded-2xl shadow-2xl flex flex-col justify-center items-center border-4 border-white p-1">
      <div className="bg-white border border-transparent rounded-xl w-full h-full relative">
        {/* Inner border decoration */}
        <div className="absolute inset-2 border border-black/20 rounded-lg pointer-events-none"></div>

        {/* Top-left corner - Small number */}
        <div className="absolute top-1 left-1 text-lg font-bold drop-shadow-lg z-2 border-indigo-700 border-2 rounded-full w-8 h-8 flex justify-center items-center bg-white/95">
          {type === 'image' ? (
            <img src={points as string} alt="Card Value" className="w-5 h-5" />
          ) : (
            <span>{points}</span>
          )}
        </div>

        {/* Center - Large number */}
        <div className="text-7xl font-bold drop-shadow-2xl leading-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
          {type === 'image' ? (
            <img
              src={points as string}
              alt="Card Value"
              className="w-16 h-16"
            />
          ) : (
            <span>{points}</span>
          )}
        </div>

        {/* Bottom-right logo container */}
        <div className="absolute bottom-1 right-1 w-8 h-8 bg-white/95 border-2 border-indigo-700 rounded-full flex justify-center items-center shadow-xl p-1 z-2">
          <img
            src="/logo-v2-mini.drawio.svg"
            alt="John Florentino Dunglao Logo"
          />
        </div>
      </div>
    </div>
  );
}
