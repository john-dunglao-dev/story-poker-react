import { BASE_URL } from '@/constants/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  HttpStatusCode,
} from 'axios';
import { cookies } from 'next/headers';

export interface CustomAxiosConfig extends AxiosRequestConfig {
  _retry?: boolean; // custom property to track if the request has been retried
}

export class CustomAxios {
  private instance: AxiosInstance | null = null;
  private accessToken: string | null = null;
  private refreshPromise: Promise<string | null> | null = null;

  getInstance(): AxiosInstance {
    if (!this.instance) {
      throw new Error(
        'Axios instance not initialized. Call setServerInstance() first.'
      );
    }

    return this.instance;
  }

  setServerInstance(baseURL: string, cookieHeader?: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: cookieHeader, // pass cookies from the request to the API calls
      },
    });
    return this;
  }

  private async fetchAccessTokenFromCookies() {
    const cookieJar = await cookies();
    this.accessToken = cookieJar.get('accessToken')?.value || null;
  }

  static async getCookieHeader(): Promise<string | null> {
    const cookieJar = await cookies();
    return cookieJar.toString();
  }

  private async getAccessToken(): Promise<string | null> {
    await this.fetchAccessTokenFromCookies();
    if (this.accessToken) return this.accessToken;

    if (!this.refreshPromise) {
      const cookieJar = await cookies();

      if (!cookieJar.get('refreshToken')) {
        return null; // no refresh token, cannot get new access token
      }

      this.refreshPromise = axios
        .post<{ accessToken: string }>(
          `${BASE_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Cookie: cookieJar.toString(), // pass cookies from the request to the API call
            },
          }
        )
        .then((res) => {
          this.accessToken = res.data.accessToken;
          return this.accessToken;
        })
        .finally(() => {
          this.refreshPromise = null;
        });
    }

    return this.refreshPromise;
  }

  clearAccessTokenMemory() {
    this.accessToken = null;
  }

  setRequestInterceptor() {
    if (!this.instance) {
      throw new Error(
        'Axios instance not initialized. Call setServerInstance() first.'
      );
    }

    this.instance.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return this;
  }

  setResponseInterceptor() {
    if (!this.instance) {
      throw new Error(
        'Axios instance not initialized. Call setServerInstance() first.'
      );
    }

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        // refresh token if 401 Unauthorized error occurs and retry the original request once
        const originalRequest = error.config as CustomAxiosConfig;

        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          this.clearAccessTokenMemory(); // clear current access token

          try {
            const newToken = await this.getAccessToken();
            if (newToken) {
              // ensure headers object exists before setting Authorization
              if (!originalRequest.headers) {
                originalRequest.headers = {};
              }

              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance!(originalRequest);
            }
          } catch (refreshError) {
            this.clearAccessTokenMemory();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return this;
  }
}

export const serverAxios = async (
  baseURL: string = BASE_URL,
  addRequestInterceptor = true,
  addResponseInterceptor = true
): Promise<AxiosInstance> => {
  const cookieHeader = await CustomAxios.getCookieHeader();
  const api = new CustomAxios().setServerInstance(
    baseURL,
    cookieHeader || undefined
  );

  if (addRequestInterceptor) {
    api.setRequestInterceptor();
  }

  if (addResponseInterceptor) {
    api.setResponseInterceptor();
  }

  return api.getInstance();
};

export const ssrAxiosNoAuth = async (
  baseURL: string = BASE_URL
): Promise<AxiosInstance> => {
  const api = new CustomAxios().setServerInstance(baseURL, undefined);
  return api.getInstance();
};
