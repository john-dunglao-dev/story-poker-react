import AuthenticatedLinks from '@/app/components/navigation/AuthenticatedLinks';
import UnauthenticatedLinks from '@/app/components/navigation/UnauthenticatedLinks';
import NavLinkItem from '@/app/components/common/NavLinkItem';
import { serverAxios } from '@/app/lib/axios';
import { BASE_URL } from '@/constants/common';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const checkAuth = async () => {
    try {
      const cookieJar = await cookies();

      if (!cookieJar.get('refreshToken')) {
        return false;
      }

      const api = await serverAxios(
        BASE_URL,
        true, // withCredentials
        true // includeAuthTokens
      );

      const isAuthenticated = await api
        .get<{ success: Boolean; isAuthenticated: boolean }>('/api/auth')
        .then((res) => res.data.isAuthenticated)
        .catch(() => null);

      if (isAuthenticated) {
        console.log('Authenticated:', isAuthenticated);
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  };

  const isAuthenticated = await checkAuth();

  return (
    <nav>
      <ul className="flex space-x-4">
        <NavLinkItem href="/">Home</NavLinkItem>
        <NavLinkItem href="/about">About</NavLinkItem>
        <NavLinkItem href="/contact">Contact</NavLinkItem>
        <NavLinkItem href="/room/join">Join Room</NavLinkItem>

        {isAuthenticated ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
      </ul>
    </nav>
  );
}
