'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const RoomSocketContext = createContext<{
  socket: Socket | null;
  isConnected: boolean;
} | null>(null);

export default function RoomSocketProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Here you would typically initialize your socket connection
  // and provide it via context. For simplicity, we'll set it to null.
  const [socket, setSocket] = useState<Socket<any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection here and set it to state
    const newSocket = io('http://api.storypoker.local', {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <RoomSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </RoomSocketContext.Provider>
  );
}
