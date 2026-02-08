import {
  createServerAxiosInstance,
  getServerAccessTokenFromCookies,
} from '@/app/lib/axios-server';
import { API_BASE_URL } from '@/constants/common';
import { unauthorized } from 'next/navigation';

/**
 * ? Creates a new room with the given name.
 *
 * @param name will be the displayed name of the room
 * @returns
 */
export async function POST(name: string) {
  const token = await getServerAccessTokenFromCookies();

  if (token.status !== 'success') {
    return unauthorized();
  }

  const api = createServerAxiosInstance({
    baseURL: API_BASE_URL,
    accessToken: token.accessToken,
  });

  try {
    const response = await api.post(
      '/rooms',
      { name },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
}
