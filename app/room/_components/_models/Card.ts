export interface Card {
  type: 'image' | 'number' | 'string';
  points: string | number;
}

export interface CardProps {
  value?: Card;
  reveal?: boolean;
}
