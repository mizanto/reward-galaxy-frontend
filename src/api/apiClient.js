import axios from 'axios';

import { API_BASE_URL, API_VERSION } from '../config';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;