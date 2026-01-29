export interface RoomJoinProps {
  slug: string;
  onJoinRoom: (slug: string, name: string) => void;
}
