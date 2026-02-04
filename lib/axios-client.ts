import { API_BASE_URL } from '@/constants/common';
import axios from 'axios';

export const clientApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: API_BASE_URL,
});

export default clientApi;
