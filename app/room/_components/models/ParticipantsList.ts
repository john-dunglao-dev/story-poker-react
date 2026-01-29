export type Participant = {
  id: number;
  name: string;
  hasVoted: boolean;
};

export interface ParticipantsListProps {
  participants: Participant[];
}
