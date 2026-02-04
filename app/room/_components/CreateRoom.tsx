'use client';

import { createRoom } from '@/api/rooms/create';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateRoom() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle room creation logic here
    setIsLoading(true);
    toast.info('Creating room...');

    createRoom({ name: roomName })
      .then((res) => {
        console.log('Room created successfully:', res.data);
        // You can redirect to the room page or show a success message here

        router.push(`/room/${res.data.slug}`); // Assuming the response contains the slug of the created room
        toast.success('Room created successfully! You are being redirected.');
      })
      .catch((err) => {
        console.error('Error creating room:', err);
        // Handle error (e.g., show an error message)
        toast.error(
          'Failed to create room. Please try again or contact support.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {/* Header */}
      <div className="text-gray-900 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create a Room</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Room Creation Form */}
          <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="roomName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
