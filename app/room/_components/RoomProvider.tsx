'use client';

import { getRoomDetails } from '@/api/rooms/getRoomDetails';
import { createContext, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IRoom } from './models/Room';

export const RoomContext = createContext<IRoom | null>(null);

export function RoomProvider({
  children,
  roomSlug,
}: {
  children: React.ReactNode;
  roomSlug: string;
}) {
  const [roomDetails, setRoomDetails] = useState<IRoom | null>(null);

  useLayoutEffect(() => {
    // Fetch room details here and set it to state
    getRoomDetails(roomSlug)
      .then((res) => {
        setRoomDetails(res.data);
      })
      .catch((err) => {
        console.error('Error fetching room details:', err);
        // Handle error (e.g., show an error message)
        toast.error(
          'Failed to load room details. Please try again or contact support.'
        );
      });
  }, []);

  return (
    <RoomContext.Provider value={roomDetails}>{children}</RoomContext.Provider>
  );
}
