export default function NavigationLinks() {
  return (
    <nav>
      <ul className="lg:flex lg:space-x-6 mt-16 lg:mt-0 space-y-4 lg:space-y-0">
        <li className="py-3 lg:py-0 border-b border-white/20 lg:border-0">
          <a
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Home
          </a>
        </li>
        <li className="py-3 lg:py-0 border-b border-white/20 lg:border-0">
          <a
            href="/about"
            className="text-white hover:text-gray-200 transition-colors"
          >
            About
          </a>
        </li>
        <li className="py-3 lg:py-0 border-b border-white/20 lg:border-0">
          <a
            href="/room/join"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Join Room
          </a>
        </li>
        <li className="py-3 lg:py-0 border-b border-white/20 lg:border-0">
          <a
            href="/room/create"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Create Room
          </a>
        </li>
      </ul>
    </nav>
  );
}
