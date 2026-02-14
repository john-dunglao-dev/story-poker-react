import { BASE_URL, WS_BASE_URL } from '@/constants/common';
import { AxiosError } from 'axios';
import { notFound } from 'next/navigation';
import SocketProvider from '@/app/room/[slug]/providers/SocketProvider';
import Room from '@/app/room/[slug]/components/room/Room';
import { createServerAxiosInstance } from '@/app/lib/axios-server';

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const api = createServerAxiosInstance({ baseURL: BASE_URL });
  let room = null;

  try {
    room = await api.get('/api/room/' + slug).then((res) => res.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      notFound();
    }

    console.error('Error fetching room:', error);
    // You can choose to throw an error or return a fallback UI here
    throw error;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto">
        {/* You can add more room details or components here */}
        <SocketProvider websocketUrl={WS_BASE_URL}>
          {/* Your components that need access to the WebSocket connection can go here */}
          <Room slug={room.slug} name={room.name} />
        </SocketProvider>
      </div>
    </div>
  );
}
