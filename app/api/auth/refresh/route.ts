import { createServerAxiosInstance } from '@/app/lib/axios-server';
import { setCookieToResponse } from '@/app/lib/cookie-setter';
import { API_BASE_URL } from '@/constants/common';
import { AxiosError, HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

/**
 * ! This is a route handler for the token refresh logic. It is called by the client-side axios interceptor when a 401 Unauthorized error occurs.
 * ! We are using axios directly here to avoid interceptor loops.
 */
export async function POST() {
  const api = createServerAxiosInstance({ baseURL: API_BASE_URL });

  try {
    const apiResponse = await api.post('/auth/refresh');

    const response = NextResponse.json({ success: true });

    setCookieToResponse(response, apiResponse.headers['set-cookie']);

    return response;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      console.debug(
        'Refresh token is invalid or expired. Clearing tokens from memory and cookies.'
      );
      // if refresh token is also invalid/expired, clear tokens from cookies
      const response = NextResponse.json(
        { success: false },
        { status: HttpStatusCode.Unauthorized }
      );
      // clear cookies by setting them with an expired date
      setCookieToResponse(response, error.response?.headers?.['set-cookie']);

      return response;
    }

    console.error('Unexpected error refreshing token:', error);
    return NextResponse.json(
      { success: false, message: 'Unexpected error refreshing token' },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
