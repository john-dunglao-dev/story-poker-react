import { Card } from './Card';

export interface CardSelectionProps {
  cards: Card[];
  selected: Card | null;
  onSelectCard: (card: Card) => void;
  onRevealCards: () => void;
  onResetSelections: () => void;
}
