import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({ baseURL: 'http://192.168.0.107:5000/' });

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
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
