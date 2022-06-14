import axios from 'axios';

const apiClient = axios.create({ baseURL: 'http://localhost:5000/' });

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (config?.headers && token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
