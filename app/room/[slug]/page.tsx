import FaceDownCard from '../_components/FaceDownCard';
import FaceUpCard from '../_components/FaceUpCard';

export default async function InsideRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <div>Inside Room Page: {slug}</div>

      <div>
        <FaceDownCard />
      </div>

      <div>
        <FaceUpCard />
      </div>
    </div>
  );
}
