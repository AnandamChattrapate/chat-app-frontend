// import axios from 'axios'
// const API=axios.create({
//     baseURL:"http://localhost:3000/api",
//     withCredentials:true,
//  })
// export default API;
// import axios from 'axios';

// // Get the base URL from environment variable
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/';

// console.log('API URL:', API_URL); // This will help debugging

// const API = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Add request interceptor for debugging
// API.interceptors.request.use(
//   (config) => {
//     console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/';

console.log('API URL:', API_URL);

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This sends cookies, but let's also add Authorization header
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to every request
API.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('token='));
    
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      // Add token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
    if (config.headers.Authorization) {
      console.log('🔑 Token sent in headers');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔒 Authentication failed - redirecting to login');
      // Optional: redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
