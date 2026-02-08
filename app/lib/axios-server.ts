import axios from 'axios';
import { cookies } from 'next/headers';

export type AccessTokenResult =
  | { status: 'success'; accessToken: string }
  | { status: 'unauthenticated' }
  | { status: 'refresh_failed' };

export const createServerAxiosInstance = ({
  baseURL,
  cookieHeader,
  accessToken,
}: {
  baseURL: string;
  cookieHeader?: string | null;
  accessToken?: string | null;
}) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }), // pass cookies from the request to the API calls
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // add access token if available
    },
  });
};

export const getServerAccessTokenFromCookies =
  async (): Promise<AccessTokenResult> => {
    const cookieJar = await cookies();

    const accessToken = cookieJar.get('accessToken')?.value || null;
    if (accessToken) return { status: 'success', accessToken };

    const refreshToken = cookieJar.get('refreshToken')?.value;
    if (!refreshToken) return { status: 'unauthenticated' }; // no refresh token, cannot get new access token

    const response = await axios.post<{ accessToken: string }>(
      `${process.env.API_BASE_URL}/api/auth/refresh`,
      {},
      {
        headers: {
          Cookie: cookieJar.toString(), // pass cookies from the request to the API call
        },
      }
    );

    if (response.data.accessToken) {
      return { status: 'success', accessToken: response.data.accessToken };
    }

    return { status: 'refresh_failed' };
  };
