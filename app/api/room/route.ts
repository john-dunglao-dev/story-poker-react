import { serverAxios } from '@/app/lib/axios';
import { API_BASE_URL } from '@/constants/common';

/**
 * ? Creates a new room with the given name.
 *
 * @param name will be the displayed name of the room
 * @returns
 */
export async function POST(name: string) {
  const api = await serverAxios(
    API_BASE_URL,
    true, // withCredentials: true to include cookies for authentication
    true // isServer: true to use server-side axios instance
  );

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
