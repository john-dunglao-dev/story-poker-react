import { BASE_URL } from '@/constants/common';
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { setCookieFromHeaders } from './cookie-setter';

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

    console.debug('Cookies in request:', cookieJar.toString());

    const accessToken = cookieJar.get('accessToken')?.value || null;
    if (accessToken) return { status: 'success', accessToken };

    const refreshToken = cookieJar.get('refreshToken')?.value;
    if (!refreshToken) return { status: 'unauthenticated' }; // no refresh token, cannot get new access token

    const response = await axios.post<{ accessToken: string }>(
      '/api/auth/refresh',
      {},
      {
        baseURL: BASE_URL,
        headers: {
          Cookie: cookieJar.toString(), // pass cookies from the request to the API call
        },
      }
    );

    const newTokens = response.headers?.['set-cookie'];

    if (newTokens) {
      console.debug('Received new tokens from refresh endpoint:', newTokens);
      setCookieFromHeaders(newTokens);
    }

    console.debug('Response data from refresh endpoint:', response.data);

    if (response.data.accessToken) {
      return { status: 'success', accessToken: response.data.accessToken };
    }

    return { status: 'refresh_failed' };
  };

export const retryRequestWithNewAccessToken = async (
  originalConfig: AxiosRequestConfig
) => {
  const tokenResult = await getServerAccessTokenFromCookies();

  if (tokenResult.status === 'success') {
    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${tokenResult.accessToken}`,
    };

    return axios(originalConfig); // retry original request with new access token
  }
};
