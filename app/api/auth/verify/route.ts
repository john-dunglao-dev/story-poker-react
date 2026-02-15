import { createServerAxiosInstance } from '@/app/lib/axios-server';
import { API_BASE_URL } from '@/constants/common';
import { HttpStatusCode } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieJar = await cookies();
  const cookieHeader = cookieJar.toString();
  const api = createServerAxiosInstance({
    baseURL: API_BASE_URL,
    cookieHeader, // pass cookies from the request to the API call
  });

  const apiResponse = await api.post('/auth/verify-refresh');

  if (apiResponse.status === HttpStatusCode.Ok) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false },
    { status: HttpStatusCode.Unauthorized }
  );
}
