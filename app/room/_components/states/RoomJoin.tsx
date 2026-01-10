import { useState } from 'react';
import { RoomJoinProps } from '../_models/RoomJoin';

export default function RoomJoin({ slug, onJoinRoom }: RoomJoinProps) {
  const [name, setName] = useState('');

  return (
    <div className="text-center text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Join Room: {slug}</h2>
      <p className="text-gray-600">This is where users can join the room.</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => onJoinRoom(slug, name)}
      >
        Join Room
      </button>
    </div>
  );
}
