import { API_BASE_URL } from '@/constants/common';
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
    }
  );
};
