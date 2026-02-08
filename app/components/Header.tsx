import Navbar from '@/app/components/navigation/Navbar';

export default async function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Story Poker</h1>

        <Navbar />
      </div>
    </header>
  );
}
