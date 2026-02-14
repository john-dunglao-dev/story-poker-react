export type Participant = {
  name: string;
  slug: string;
  connected: boolean;
  vote?: {
    value: string | number;
  };
};

export interface ParticipantsListProps {
  participants: Participant[];
}
