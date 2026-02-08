import { ssrAxiosNoAuth } from '@/app/lib/axios';
import { BASE_URL } from '@/constants/common';
import { AxiosError } from 'axios';
import { notFound } from 'next/navigation';

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const api = await ssrAxiosNoAuth(BASE_URL);
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
        <h1 className="text-2xl font-bold mb-4">Room: {room.name}</h1>
        <p className="text-gray-700">Slug: {room.slug}</p>
        <p className="text-gray-700">ID: {room.id}</p>
      </div>
    </div>
  );
}
