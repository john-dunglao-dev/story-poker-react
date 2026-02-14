import AuthenticatedLinks from '@/app/components/navigation/AuthenticatedLinks';
import UnauthenticatedLinks from '@/app/components/navigation/UnauthenticatedLinks';
import NavLinkItem from '@/app/components/common/NavLinkItem';
import {
  createServerAxiosInstance,
  getServerAccessTokenFromCookies,
} from '@/app/lib/axios-server';
import { BASE_URL } from '@/constants/common';

export default async function Navbar() {
  const checkAuth = async () => {
    try {
      const token = await getServerAccessTokenFromCookies();

      if (token?.status !== 'success' || !token.accessToken) {
        return false;
      }

      const api = createServerAxiosInstance({
        baseURL: BASE_URL,
        accessToken: token.accessToken,
      });

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
