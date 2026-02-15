import { NextRequest, NextResponse } from 'next/server';
import { createServerAxiosInstance } from '@/app/lib/axios-server';
import axios from 'axios';
import { BASE_URL } from '@/constants/common';
import { cookies } from 'next/headers';
import { setCookieToResponse } from '@/app/lib/cookie-setter';

/**
 * Single-flight in-memory map to track ongoing refreshes per refresh token
 */
const inProgressRefresh = new Map<string, Promise<string[] | null>>();

/**
 * ? Proxy for token rotation
 *
 * Ensures:
 * - Only one refresh per refresh token is executed at a time
 * - Cookies are set on the provided NextResponse
 *
 * @param request
 * @param response
 */
export async function proxy(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (accessToken) {
    console.debug('Access token exists in cookies, skipping token rotation.');
    return;
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;
  if (!refreshToken) {
    console.debug(
      'No refresh token found in cookies, skipping token rotation.'
    );
    return;
  }

  // Check if a refresh is already in progress for this refresh token
  let newTokens: string[] | null;
  if (inProgressRefresh.has(refreshToken)) {
    console.debug('Waiting for in-progress refresh for this refresh token...');
    newTokens = await inProgressRefresh.get(refreshToken)!;
  } else {
    // Start a new refresh request
    const cookieJar = await cookies();
    const api = createServerAxiosInstance({
      baseURL: BASE_URL,
      cookieHeader: cookieJar.toString(),
    });

    const refreshPromise = (async () => {
      try {
        const apiResponse = await api.post('/api/auth/refresh');
        const tokens = apiResponse.headers?.['set-cookie'] || null;
        return tokens;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.debug(
            'Refresh token is invalid or expired. Clearing tokens from memory and cookies.'
          );
          return error.response?.headers?.['set-cookie'] || null;
        }
        console.error('Unexpected error refreshing token:', error);
        return null;
      }
    })();

    inProgressRefresh.set(refreshToken, refreshPromise);
    try {
      newTokens = await refreshPromise;
    } finally {
      inProgressRefresh.delete(refreshToken);
    }
  }

  // Set cookies in the response for the browser
  if (newTokens) {
    console.debug('Proxy: Setting new tokens on response:', newTokens);
    setCookieToResponse(response, newTokens);
  }
}
