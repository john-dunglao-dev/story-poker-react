import type { ReactNode } from 'react';

export default function NavLinkItemButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="px-4 py-2 text-white rounded hover:bg-blue-600 transition cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
