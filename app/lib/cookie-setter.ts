import { NextResponse } from 'next/server';

export const setCookieToResponse = (
  response: NextResponse,
  cookie: string | string[] | undefined
) => {
  if (Array.isArray(cookie)) {
    cookie.forEach((token) => {
      response.headers.append('Set-Cookie', token);
    });
  } else if (cookie) {
    response.headers.set('Set-Cookie', cookie);
  }
};

export const clearCookieFromResponse = (
  response: NextResponse,
  cookieName: string,
  options?: Record<string, any>
) => {
  response.cookies.delete({
    name: cookieName,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: '.storypoker.local',
    ...options,
  });
};
