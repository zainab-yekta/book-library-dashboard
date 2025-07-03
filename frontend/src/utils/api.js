import axios from 'axios';

const api = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

// Automatically add token for protected routes
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
