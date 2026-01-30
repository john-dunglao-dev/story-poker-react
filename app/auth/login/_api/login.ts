import api from '@/lib/axios';
import { AxiosResponse } from 'axios';

export const login = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post('/auth', { email, password });
};
