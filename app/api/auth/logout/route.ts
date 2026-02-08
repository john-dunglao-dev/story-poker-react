import {
  createServerAxiosInstance,
  getServerAccessTokenFromCookies,
} from '@/app/lib/axios-server';
import { setCookieToResponse } from '@/app/lib/cookie-setter';
import { API_BASE_URL } from '@/constants/common';
import { AxiosError, HttpStatusCode } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieJar = await cookies();
  const token = await getServerAccessTokenFromCookies();

  if (token.status !== 'success') {
    console.debug(
      'No access token found in cookies. User is likely already logged out.'
    );
    cookieJar.delete('accessToken');
    cookieJar.delete('refreshToken');
    return NextResponse.json({
      success: true,
      message: 'No active session found',
    });
  }

  const api = createServerAxiosInstance({
    baseURL: API_BASE_URL,
    accessToken: token.accessToken,
    cookieHeader: cookieJar.toString(), // pass cookies from the request to the API call
  });

  try {
    const apiResponse = await api.post('/auth/sign-out');

    const response = NextResponse.json(apiResponse.data);

    const setCookieHeader = apiResponse.headers['set-cookie'];
    if (setCookieHeader) {
      setCookieToResponse(response, setCookieHeader);
    }

    return response;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      console.debug(
        'Access token is invalid or expired during logout. Clearing tokens from cookies.'
      );
      // if access token is already invalid/expired, clear tokens from cookies
      cookieJar.delete('accessToken');
      cookieJar.delete('refreshToken');
      return NextResponse.json({
        success: true,
        message: 'Session already expired',
      });
    }

    console.error('Error logging out:', error);
    throw error;
  }
}
