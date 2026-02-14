'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<{
  socket: Socket | null;
  isConnected: boolean;
} | null>(null);

export default function SocketProvider({
  children,
  websocketUrl,
}: {
  children: ReactNode;
  websocketUrl: string;
}) {
  // Here you would typically initialize your socket connection
  // and provide it via context. For simplicity, we'll set it to null.
  const [socket, setSocket] = useState<Socket<any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection here and set it to state
    const newSocket = io(websocketUrl, {
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
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
