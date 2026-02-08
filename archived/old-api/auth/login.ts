import { API_BASE_URL } from '@/constants/common';
import api from '@/old-lib/axios';
import axios, { AxiosResponse } from 'axios';

// does not use axios library instance to avoid interceptor loops
export const login = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post(
    '/auth',
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      baseURL: API_BASE_URL,
      // this ensures cookies (like refresh token) are set by the browser
      withCredentials: true,
    }
  );
};

// notice that this uses the api instance with interceptors
export const logout = (): Promise<AxiosResponse> => {
  return api.post('/auth/sign-out', {}, { withCredentials: true });
};
