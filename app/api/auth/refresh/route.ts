import { serverAxios } from '@/app/lib/axios';
import { setCookieToResponse } from '@/app/lib/cookie-setter';
import { API_BASE_URL } from '@/constants/common';
import { NextResponse } from 'next/server';

/**
 * ! This is a route handler for the token refresh logic. It is called by the client-side axios interceptor when a 401 Unauthorized error occurs.
 * ! We are using axios directly here to avoid interceptor loops.
 */
export async function POST() {
  const api = await serverAxios(
    API_BASE_URL,
    false, // do not include access token in this request
    false // do not add response interceptor to this request
  );
  const apiResponse = await api.post('/auth/refresh');

  const response = NextResponse.json({ success: true });

  setCookieToResponse(response, apiResponse.headers['set-cookie']);

  return response;
}
