import { createServerAxiosInstance } from '@/app/lib/axios-server';
import { API_BASE_URL } from '@/constants/common';
import { NextResponse } from 'next/server';

/**
 * ? Fetches a room by its slug.
 *
 * @param slug
 * @returns
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const api = createServerAxiosInstance({ baseURL: API_BASE_URL });

  console.log('Fetching room with slug:', slug);

  try {
    const response = await api.get(`/rooms/${slug}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}
