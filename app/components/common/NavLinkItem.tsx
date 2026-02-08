import Link from 'next/link';
import type { ReactNode } from 'react';

export default function LinkAnchor({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-white rounded hover:bg-blue-600 transition"
    >
      {children}
    </Link>
  );
}
