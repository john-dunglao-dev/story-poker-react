import { CardRevealProps } from '../_models/CardReveal';

export default function CardReveal({ onReset }: CardRevealProps) {
  return (
    <div>
      <div>Card Reveal Component</div>

      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Selections
      </button>
    </div>
  );
}
