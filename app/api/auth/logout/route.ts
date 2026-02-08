import { serverAxios } from '@/app/lib/axios';
import { API_BASE_URL } from '@/constants/common';
import { NextResponse } from 'next/server';

export async function POST() {
  const api = await serverAxios(
    API_BASE_URL,
    true, // add request interceptor to include access token
    false // do not include auth tokens in the request to avoid interceptor loops
  );
  try {
    const apiResponse = await api.post('/auth/sign-out');

    const response = NextResponse.json(apiResponse.data);

    response.cookies.delete({
      name: 'refreshToken',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      domain: '.storypoker.local',
    });
    response.cookies.delete({
      name: 'accessToken',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      domain: '.storypoker.local',
    });

    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}
