import { NextRequest, NextResponse } from 'next/server';
import { createServerAxiosInstance } from '@/app/lib/axios-server';
import { API_BASE_URL, BASE_URL } from '@/constants/common';
import { setCookieToResponse } from '@/app/lib/cookie-setter';
import { AxiosError, HttpStatusCode } from 'axios';

/**
 * ? Middleware to check if the user is already authenticated
 * ? before going into the registration page or login page.
 *
 * @param request
 * @returns
 */
export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    console.debug(
      'No refresh token found in cookies, user is not authenticated'
    );
    return NextResponse.next();
  }

  try {
    const cookieHeader = request.cookies.toString();
    const api = createServerAxiosInstance({
      baseURL: API_BASE_URL,
      cookieHeader, // pass cookies from the request to the API call
    });

    const apiResponse = await api.post(
      '/auth/verify-refresh',
      {},
      {
        headers: {
          Cookie: cookieHeader, // ensure cookies are sent with this request
        },
      }
    );

    if (apiResponse.status === HttpStatusCode.Ok) {
      console.debug('Refresh token is valid, user is authenticated');
      return NextResponse.redirect(new URL('/', request.url));
    }

    console.debug(
      'API call to verify refresh token succeeded but returned non-200 status, treating as not authenticated'
    );
    return NextResponse.next();
  } catch (err) {
    if (
      err instanceof AxiosError &&
      err.response?.status === HttpStatusCode.Unauthorized
    ) {
      console.debug(
        'Refresh token is invalid or expired, clearing cookies and redirecting to home page'
      );

      const response = NextResponse.next();
      const setCookies = err.response.headers?.['set-cookie'];

      console.debug('Set-Cookie headers from API response:', setCookies);

      if (setCookies) {
        setCookieToResponse(response, setCookies);
      }

      return response;
    }

    console.error('Error verifying refresh token:', err);
    return NextResponse.next();
  }
}
