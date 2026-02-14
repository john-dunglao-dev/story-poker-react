import {
  createServerAxiosInstance,
  getServerAccessTokenFromCookies,
} from '@/app/lib/axios-server';
import { setCookieToResponse } from '@/app/lib/cookie-setter';
import { API_BASE_URL } from '@/constants/common';
import { AxiosError, HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

/**
 * ? Logs in a user with the provided email and password.
 * ! We are using axios directly here to avoid interceptor loops.
 *
 * @param email
 * @param password
 * @returns
 */
export async function POST(req: Request) {
  const api = createServerAxiosInstance({ baseURL: API_BASE_URL });
  const { email, password } = await req.json();
  try {
    const apiResponse = await api.post(
      '/auth',
      { email, password },
      { withCredentials: true }
    );

    const cookieTokens = apiResponse.headers['set-cookie'];
    console.log('Received token cookies:', cookieTokens);

    const response = NextResponse.json({ success: true });

    setCookieToResponse(response, cookieTokens);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error during login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.status === HttpStatusCode.Unauthorized) {
        throw new Error('Invalid email or password. Please try again.');
      } else {
        throw new Error(
          error.response?.data?.message || 'Login failed. Please try again.'
        );
      }
    } else if (error instanceof Error) {
      throw new Error('Something went wrong during login. Please try again.');
    }

    console.error('Unexpected error type:', error);
    throw error;
  }
}

/**
 * ? Gets the authenticated user's information.
 */
export async function GET() {
  const token = await getServerAccessTokenFromCookies();

  if (token.status !== 'success') {
    return NextResponse.json({
      success: false,
      message: 'No active session found',
    });
  }

  const api = createServerAxiosInstance({
    baseURL: API_BASE_URL,
    accessToken: token.accessToken,
  });
  try {
    const response = await api.get<{ isAuthenticated: boolean }>('/auth');
    return NextResponse.json({
      success: true,
      isAuthenticated: response.data.isAuthenticated,
    });
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error;
  }
}
