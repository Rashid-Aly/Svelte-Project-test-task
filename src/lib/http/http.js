import axios from 'axios';
import { browser } from '$app/environment';

const http = axios.create({
  baseURL: 'https://get-micdrop.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});


http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (browser) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default http;