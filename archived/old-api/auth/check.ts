import api from '@/old-lib/axios';
import { AxiosResponse } from 'axios';

export const checkAuth = (): Promise<AxiosResponse> => {
  return api.get('/auth');
};

export const getAuthenticatedUser = (): Promise<AxiosResponse> => {
  return api.get('/auth/user');
};
