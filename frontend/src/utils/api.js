import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Optional: Automatically add token for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
