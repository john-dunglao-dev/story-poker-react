export interface RoomJoinProps {
  slug: string;
  roomName: string;
  onJoinRoom: (slug: string, name: string) => void;
}
