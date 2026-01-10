'use client';

import CardSelection from './states/CardSelection';
import { Card } from './_models/Card';
import { useState } from 'react';
import { RoomState } from './_models/Room';
import RoomJoin from './states/RoomJoin';
import CardReveal from './states/CardReveal';
import ParticipantsList from './participants/ParticipantsList';

export default function Room({ slug }: { slug: string }) {
  // Story poker card values
  const cardValues: Card[] = [
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

  const [roomState, setRoomState] = useState<RoomState>('joining');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleRevealCards = () => {
    console.log('Revealing cards..');
    setRoomState('result');
  };

  const handleResetSelections = () => {
    console.log('Resetting selections..');
    setSelectedCard(null);
    setRoomState('in-session');
  };

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
  };

  const handleJoinRoom = (slug: string, name: string) => {
    console.log(`Joining room ${slug} as ${name}`);
    setRoomState('in-session');
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
        {roomState !== 'joining' && (
          <ParticipantsList participants={participants} />
        )}

        <div className="flex-1">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
            {roomState === 'joining' ? (
              <RoomJoin slug={slug} onJoinRoom={handleJoinRoom} />
            ) : roomState === 'in-session' ? (
              <CardSelection
                cards={cardValues}
                selected={selectedCard}
                onResetSelections={handleResetSelections}
                onRevealCards={handleRevealCards}
                onSelectCard={handleSelectCard}
              />
            ) : (
              <CardReveal onReset={handleResetSelections} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
