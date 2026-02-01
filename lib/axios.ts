import axios, { HttpStatusCode } from 'axios';
import { rotateTokens } from '@/api/auth/rotateTokens';
import { API_BASE_URL } from '@/constants/common';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: API_BASE_URL,
});

let accessToken: string | undefined;
let refreshPromise: Promise<string> | null = null;

const getAccessToken = async (): Promise<string> => {
  if (accessToken) return accessToken;

  if (!refreshPromise) {
    refreshPromise = rotateTokens()
      .then((res) => {
        accessToken = res.data.accessToken;
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use(
  async (config) => {
    // You can add authorization headers or other custom headers here
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // refresh token if 401 Unauthorized error occurs and retry the original request once
    if (
      error.response.status === HttpStatusCode.Unauthorized &&
      !error.config._retry
    ) {
      error.config._retry = true;
      accessToken = undefined; // clear current access token

      const token = await getAccessToken();

      if (token) {
        error.config.headers.Authorization = `Bearer ${token}`;
      }

      return api(error.config);
    }

    // Handle global errors here
    return Promise.reject(error);
  }
);

export default api;
