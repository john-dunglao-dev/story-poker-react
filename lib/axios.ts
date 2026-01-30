import axios from 'axios';

const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  baseURL: 'http://api.storypoker.local',
});

axios.interceptors.request.use(
  (config) => {
    // You can add authorization headers or other custom headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);

export default api;
