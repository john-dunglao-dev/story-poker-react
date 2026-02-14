import { CardSelectionProps } from '@/app/room/[slug]/components/cards/models/CardSelection';
import Card from '@/app/room/[slug]/components/cards/Card';

export default function CardSelection({
  cards,
  selected,
  onSelectCard,
  onRevealCards,
  onResetSelections,
}: CardSelectionProps) {
  return (
    <div>
      <h2 className="text-gray-900 text-xl font-bold mb-6 text-center">
        Select Your Card
      </h2>

      {/* Current Story */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <h3 className="text-gray-900 font-semibold mb-2">Current Story:</h3>
        <p className="text-gray-600 text-sm">
          As a user, I want to be able to select a story point value so that I
          can participate in the estimation.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 justify-items-center">
        {cards.map((card) => (
          <button
            key={card.points}
            className="transform hover:scale-110 transition-transform duration-200 hover:-translate-y-2 focus:outline-none rounded-2xl cursor-pointer data-[selected=true]:ring-4 data-[selected=true]:ring-purple-300"
            data-selected={selected?.points === card.points}
            onClick={() => onSelectCard(card)}
          >
            <Card value={card} reveal={true} />
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <button
          className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg"
          onClick={() => onRevealCards()}
        >
          Reveal All Cards
        </button>
        <button
          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-gray-300"
          onClick={() => onResetSelections()}
        >
          Reset Votes
        </button>
      </div>
    </div>
  );
}
