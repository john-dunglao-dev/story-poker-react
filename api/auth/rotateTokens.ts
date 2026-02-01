import { API_BASE_URL } from '@/constants/common';
import axios, { AxiosResponse } from 'axios';

// Rotates the access and refresh tokens by calling the refresh token endpoint.
// does not use axios library instance to avoid interceptor loops
export const rotateTokens = (): Promise<
  AxiosResponse<{ accessToken: string }>
> => {
  // access token is added through interceptor
  return axios.post(
    '/auth/refresh',
    {},
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      baseURL: API_BASE_URL,
    }
  );
};
