export interface CardValue {
  type: 'image' | 'number' | 'string';
  points: string | number;
}

export interface CardProps {
  value?: CardValue;
  reveal?: boolean;
}
