export type RoomState = 'joining' | 'in-session' | 'result';

export interface IRoom {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}
