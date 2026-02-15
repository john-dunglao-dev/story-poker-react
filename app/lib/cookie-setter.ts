import {
  parseSetCookie,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
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

export const setCookie = async (
  cookieName: string,
  cookieValue: string,
  options?: Record<string, any>
) => {
  const cookieJar = await cookies();

  const cookieOptions: Partial<ResponseCookie> = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: '.storypoker.local',
    ...options,
  };

  cookieJar.set(cookieName, cookieValue, cookieOptions);
};

export const setCookieFromHeaders = async (
  setCookieHeader: string | string[] | undefined
) => {
  if (!setCookieHeader) return;

  const cookieJar = await cookies();

  if (Array.isArray(setCookieHeader)) {
    for (const cookieString of setCookieHeader) {
      const parsedCookie = parseSetCookie(cookieString);
      if (parsedCookie) {
        const { name, value, ...options } = parsedCookie;
        console.debug('Setting cookie from header:', { name, value, options });
        cookieJar.set(name, value, options);
      }
    }
  } else {
    const parsedCookie = parseSetCookie(setCookieHeader);
    if (parsedCookie) {
      const { name, value, ...options } = parsedCookie;
      console.debug('Setting cookie from header:', { name, value, options });
      cookieJar.set(name, value, options);
    }
  }
};
