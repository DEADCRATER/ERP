import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://erp-wdlf-git-main-deadcraters-projects.vercel.app/api';
console.log(BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

