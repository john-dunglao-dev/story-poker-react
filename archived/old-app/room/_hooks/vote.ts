import { useContext, useEffect, useState } from 'react';
import { RoomSocketContext } from '../_components/RoomSocketProvider';
import { Card } from '../_components/models/Card';

export default function useVote() {
  const { socket, isConnected } = useContext(RoomSocketContext)!;
  const [cardSelected, setCardSelected] = useState<Card | null>(null);

  const submitVote = (card: Card) => {
    if (!isConnected || !socket) {
      console.error('Socket is not connected.');
      return;
    }

    setCardSelected(card);
    socket.emit('submit_vote', { vote: card.points });
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleVoteSubmitted = (data: any) => {
      console.log('Vote submitted:', data);
    };

    const handleRoomUpdate = (data: any) => {
      console.log('Room updated:', data);
    };

    const handleResetVotes = (data: any) => {
      setCardSelected(null);
    };

    socket.on('user_voted', handleVoteSubmitted);
    socket.on('room_update', handleRoomUpdate);
    socket.on('votes_reset', handleResetVotes);

    return () => {
      socket.off('user_voted', handleVoteSubmitted);
      socket.off('room_update', handleRoomUpdate);
      socket.off('votes_reset', handleResetVotes);
    };
  }, [socket, isConnected]);

  return {
    cardSelected,
    submitVote,
  };
}
