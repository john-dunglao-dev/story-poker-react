'use client';

import CardSelection from '@/app/room/[slug]/components/room/states/CardSelection';
import { Card } from '@/app/room/[slug]/components/cards/models/Card';
import RoomJoin from '@/app/room/[slug]/components/room/states/RoomJoin';
import CardReveal from '@/app/room/[slug]/components/room/states/CardReveal';
import ParticipantsList from '@/app/room/[slug]/components/participants/ParticipantsList';
import useParticipant from '@/app/room/[slug]/hooks/participant';
import useSession from '@/app/room/[slug]/hooks/session';
import useVote from '@/app/room/[slug]/hooks/vote';

export default function Room({ slug, name }: { slug: string; name: string }) {
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
        <p className="text-sm md:text-base text-gray-600">Room: {name}</p>
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
                roomName={name}
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
