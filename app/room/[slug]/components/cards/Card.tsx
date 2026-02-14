'use client';

import FaceDownCard from '@/app/room/[slug]/components/cards/FaceDownCard';
import { useMemo } from 'react';
import FaceUpCard from '@/app/room/[slug]/components/cards/FaceUpCard';
import { CardProps } from '@/app/room/[slug]/components/cards/models/Card';

export default function Card({ value, reveal }: Readonly<CardProps>) {
  const isRevealed = useMemo(() => reveal, [reveal]);

  return (
    <div>
      <div className="relative w-32 h-44 perspective-distant">
        <div
          className="relative w-full h-full transition-transform duration-700 transform-3d"
          style={{
            transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Face Down (Back of card) */}
          <div className="absolute inset-0 backface-hidden">
            <FaceDownCard />
          </div>

          {/* Face Up (Front of card) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <FaceUpCard card={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
