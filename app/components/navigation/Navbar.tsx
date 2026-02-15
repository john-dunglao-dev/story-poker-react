import AuthenticatedLinks from '@/app/components/navigation/AuthenticatedLinks';
import UnauthenticatedLinks from '@/app/components/navigation/UnauthenticatedLinks';
import NavLinkItem from '@/app/components/common/NavLinkItem';
import { createServerAxiosInstance } from '@/app/lib/axios-server';
import { BASE_URL } from '@/constants/common';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const getAuthenticatedUser = async () => {
    const cookieJar = await cookies();
    const cookieHeader = cookieJar.toString();

    const api = createServerAxiosInstance({
      baseURL: BASE_URL,
      cookieHeader,
    });

    try {
      const response = await api.get('/api/auth');
      return response.data;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return null;
    }
  };

  // const user = await getAuthenticatedUser();
  // console.log('Navbar - Authenticated user:', user);

  return (
    <nav>
      <ul className="flex space-x-4">
        {/* {user && <li className="text-green-500 font-bold">Welcome </li>} */}

        <NavLinkItem href="/">Home</NavLinkItem>
        <NavLinkItem href="/about">About</NavLinkItem>
        <NavLinkItem href="/contact">Contact</NavLinkItem>
        <NavLinkItem href="/room/join">Join Room</NavLinkItem>

        {/* {user?.success ? <AuthenticatedLinks /> : <UnauthenticatedLinks />} */}
      </ul>
    </nav>
  );
}
