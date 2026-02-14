import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/app/room/[slug]/providers/SocketProvider';
import { Participant } from '@/app/room/[slug]/components/participants/models/ParticipantsList';

export default function useParticipant() {
  const { socket, isConnected } = useContext(SocketContext)!;
  const [participants, setParticipants] = useState<Array<Participant>>([
    { name: 'John Doe', slug: 'john-doe', connected: false },
    { name: 'Mary Jane', slug: 'mary-jane', connected: false },
    {
      name: 'Alice Smith',
      slug: 'alice-smith',
      connected: false,
      vote: { value: 5 },
    },
    { name: 'Bob Johnson', slug: 'bob-johnson', connected: false },
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

    const handleRoomUpdate = (data: { participants: Participant[] }) => {
      console.log('Room updated through participants:', data);
      setParticipants([...Object.values(data.participants), ...participants]);
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
