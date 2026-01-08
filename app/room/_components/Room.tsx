'use client';

import { useState } from 'react';
import Card from './cards/Card';

export default function Room({ slug }: { slug: string }) {
  // Story poker card values
  const cardValues = [
    { type: 'number', points: 0 },
    { type: 'number', points: 1 },
    { type: 'number', points: 2 },
    { type: 'number', points: 3 },
    { type: 'number', points: 5 },
    { type: 'number', points: 8 },
    { type: 'number', points: 13 },
    { type: 'number', points: 21 },
    { type: 'string', points: '?' },
    { type: 'string', points: '☕' },
  ];

  // Mock participants data
  const participants = [
    { id: 1, name: 'John Doe', hasVoted: true },
    { id: 2, name: 'Jane Smith', hasVoted: true },
    { id: 3, name: 'Bob Johnson', hasVoted: false },
    { id: 4, name: 'Alice Williams', hasVoted: true },
    { id: 5, name: 'Charlie Brown', hasVoted: false },
  ];

  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealCards = (reveal: boolean) => {
    setIsRevealed(reveal);
  };

  return (
    <div>
      {/* Header */}
      <div className="text-gray-900 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Story Poker</h1>
        <p className="text-sm md:text-base text-gray-600">Room: {slug}</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Participants List */}
        <div className="lg:w-64 w-full">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-gray-900 text-xl font-bold mb-4 flex items-center justify-between">
              <span>Participants</span>
              <span className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full">
                {participants.length}
              </span>
            </h2>
            <ul className="space-y-3">
              {participants.map((participant) => (
                <li
                  key={participant.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {participant.name.charAt(0)}
                    </div>
                    <span className="text-gray-900 text-sm font-medium">
                      {participant.name}
                    </span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      participant.hasVoted ? 'bg-green-400' : 'bg-gray-400'
                    }`}
                    title={participant.hasVoted ? 'Voted' : 'Not voted'}
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center - Cards Selection */}
        <div className="flex-1">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-gray-900 text-xl font-bold mb-6 text-center">
              Select Your Card
            </h2>

            {/* Current Story */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-2">
                Current Story:
              </h3>
              <p className="text-gray-600 text-sm">
                As a user, I want to be able to select a story point value so
                that I can participate in the estimation.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 justify-items-center">
              {cardValues.map((value) => (
                <button
                  key={value.points}
                  className="transform hover:scale-110 transition-transform duration-200 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-purple-500 rounded-2xl cursor-pointer"
                  onClick={() => console.log(`Selected: ${value}`)}
                >
                  <Card value={value} reveal={isRevealed} />
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <button
                className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg"
                onClick={() => handleRevealCards(!isRevealed)}
              >
                Reveal All Cards
              </button>
              <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-gray-300">
                Reset Votes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
