export type Card =
  | { type: 'image'; points: string }
  | { type: 'number'; points: number }
  | { type: 'string'; points: string };

export interface CardProps {
  value: Card;
  reveal?: boolean;
}
