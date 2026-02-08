import { NextRequest, NextResponse } from 'next/server';
import { serverAxios } from '@/app/lib/axios';
import { BASE_URL } from '@/constants/common';

/**
 * ? Middleware to check if the user is already authenticated
 * ? before going into the registration page or login page.
 *
 * @param request
 * @returns
 */
export async function proxy(request: NextRequest) {
  console.log('Checking if user is authenticated');
  try {
    const api = await serverAxios(
      BASE_URL, // use BASE_URL to ensure cookies are included in requests
      true, // include credentials for server-side requests
      true // use interceptors for server-side requests
    );
    const user = await api.get('/api/auth').then((res) => res.data);
    // .catch(() => null);

    console.log('Authenticated user:', user);

    if (user) {
      console.log('User is authenticated, redirecting to home page');
      return NextResponse.redirect(new URL('/', request.url));
    }

    console.log('No authenticated user found, allowing access to auth pages');
    return NextResponse.next();
  } catch (err) {
    console.error('Error checking authentication:', err);
    return NextResponse.next();
  }
}
