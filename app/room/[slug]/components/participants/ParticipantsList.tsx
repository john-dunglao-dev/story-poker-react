import { ParticipantsListProps } from '@/app/room/[slug]/components/participants/models/ParticipantsList';

export default function ParticipantsList({
  participants = [],
}: ParticipantsListProps) {
  return (
    <div className="lg:w-64 w-full">
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-gray-900 text-xl font-bold mb-4 flex items-center justify-between">
          <span>Participants</span>
          <span className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full">
            {participants.length}
          </span>
        </h2>
        <ul className="space-y-3">
          {participants.map((participant) => (
            <li
              key={participant.slug}
              className="bg-white rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {participant.name.charAt(0)}
                </div>
                <span className="text-gray-900 text-sm font-medium">
                  {participant.name}
                </span>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  participant.vote ? 'bg-green-400' : 'bg-gray-400'
                }`}
                title={participant.vote ? 'Voted' : 'Not voted'}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
