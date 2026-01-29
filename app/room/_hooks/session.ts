import { useContext, useEffect, useState } from 'react';
import { RoomState } from '../_components/models/Room';
import { RoomSocketContext } from '../_components/RoomSocketProvider';

export default function useSession() {
  const { socket, isConnected } = useContext(RoomSocketContext)!;
  const [roomState, setRoomState] = useState<RoomState>('joining');

  const showVotes = () => {
    if (!isConnected || !socket) {
      console.error('Socket is not connected.');
      return;
    }

    socket.emit('reveal_votes');
  };

  const resetVotes = () => {
    if (!isConnected || !socket) {
      console.error('Socket is not connected.');
      return;
    }

    socket.emit('start_voting');
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleChangeRoomStateReveal = () => {
      setRoomState('result');
    };

    const handleChangeRoomStateReset = () => {
      setRoomState('in-session');
    };

    const handleRoomUpdate = (data: any) => {
      console.log('Room updated:', data);
      setRoomState(data.state);
    };

    socket.on('votes_reset', handleChangeRoomStateReset);
    socket.on('votes_reveal', handleChangeRoomStateReveal);
    socket.on('room_update', handleRoomUpdate);

    return () => {
      socket.off('votes_reset', handleChangeRoomStateReset);
      socket.off('votes_reveal', handleChangeRoomStateReveal);
      socket.off('room_update', handleRoomUpdate);
    };
  }, [socket, isConnected]);

  return {
    roomState,
    setRoomState,
    showVotes,
    resetVotes,
  };
}
