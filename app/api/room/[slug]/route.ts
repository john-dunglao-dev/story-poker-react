import { serverAxios } from '@/app/lib/axios';
import { API_BASE_URL } from '@/constants/common';

/**
 * ? Fetches a room by its slug.
 *
 * @param slug
 * @returns
 */
export async function GET({ params }: { params: { slug: string } }) {
  const api = await serverAxios(
    API_BASE_URL,
    false, // do not include credentials for server-side requests
    false // do not use interceptors for server-side requests
  );

  try {
    const { slug } = params;
    const response = await api.get(`/rooms/${slug}`);
    return response;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}
