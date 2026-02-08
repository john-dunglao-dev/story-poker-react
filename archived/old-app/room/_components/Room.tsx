'use client';

import CardSelection from './states/CardSelection';
import { Card } from './models/Card';
import RoomJoin from './states/RoomJoin';
import CardReveal from './states/CardReveal';
import ParticipantsList from './participants/ParticipantsList';
import useParticipant from '../_hooks/participant';
import useSession from '../_hooks/session';
import useVote from '../_hooks/vote';
import { useContext } from 'react';
import { RoomContext } from './RoomProvider';
import { IRoom } from './models/Room';

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

  const roomData = useContext<IRoom | null>(RoomContext);
  const { participants, join } = useParticipant();
  const { roomState, resetVotes } = useSession();
  const { submitVote, cardSelected } = useVote();

  const handleRevealCards = () => {
    console.log('Revealing cards..');
  };

  const handleResetSelections = () => {
    console.log('Resetting selections..');
    resetVotes();
  };

  const handleJoinRoom = (slug: string, name: string) => {
    console.log(`Joining room ${slug} as ${name}`);
    join(slug, name);
  };

  return (
    <div>
      {/* Header */}
      <div className="text-gray-900 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Story Poker</h1>
        <p className="text-sm md:text-base text-gray-600">
          Room: {roomData?.name || slug}
        </p>
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
              <RoomJoin
                slug={slug}
                roomName={roomData?.name || slug}
                onJoinRoom={handleJoinRoom}
              />
            ) : roomState === 'in-session' ? (
              <CardSelection
                cards={cardValues}
                selected={cardSelected}
                onResetSelections={handleResetSelections}
                onRevealCards={handleRevealCards}
                onSelectCard={submitVote}
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
