import Room from '../_components/Room';

export default async function InsideRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto">
        <Room slug={slug} />
      </div>
    </div>
  );
}
