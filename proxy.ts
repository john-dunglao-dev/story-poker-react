import { NextRequest } from 'next/server';
import { proxy as authProxy } from '@/proxies/auth';

/**
 * ? Middleware to check if the user is already authenticated
 * ? before going into the registration page or login page.
 *
 * @param request
 * @returns
 */
export async function proxy(request: NextRequest) {
  console.log('running global proxy...');

  if (
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/register')
  ) {
    console.log('Proxy: Checking authentication for login or register page');
    return await authProxy(request);
  }
}

export const config = {
  matcher: [
    // These paths will be protected by the auth proxy middleware
    '/auth/login',
    '/auth/register',
  ],
};
