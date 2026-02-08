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
