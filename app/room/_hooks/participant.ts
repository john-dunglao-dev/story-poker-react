import { useContext, useEffect, useState } from 'react';
import { RoomSocketContext } from '../_components/RoomSocketProvider';

export default function useParticipant() {
  const { socket, isConnected } = useContext(RoomSocketContext)!;
  const [participants, setParticipants] = useState<Array<any>>([
    { id: 1, name: 'John Doe', hasVoted: true },
    { id: 2, name: 'Jane Smith', hasVoted: true },
    { id: 3, name: 'Bob Johnson', hasVoted: false },
    { id: 4, name: 'Alice Williams', hasVoted: true },
    { id: 5, name: 'Charlie Brown', hasVoted: false },
  ]);

  const join = (slug: string, name: string) => {
    if (!isConnected || !socket) {
      console.error('Socket is not connected.');
      return;
    }

    socket.emit('join_room', { slug, name });
  };

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleUserJoined = (data: any) => {
      console.log('User joined:', data);
    };

    const handleUserLeft = (data: any) => {
      console.log('User left:', data);
    };

    const handleRoomUpdate = (data: any) => {
      console.log('Room updated through participants:', data);
      // setParticipants(data.participants);
    };

    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);
    socket.on('room_update', handleRoomUpdate);

    return () => {
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
      socket.off('room_update', handleRoomUpdate);
    };
  }, [socket, isConnected]);

  return {
    participants,
    join,
  };
}
