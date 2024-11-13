// axiosConfig.js
import axios from 'axios';
// import Cookies from 'js-cookie'; 
// import Cookies from 'universal-cookie';
// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/api",  // Replace with your backend URL
  // withCredentials: true,             // Allows cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config)=>{
    
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error)
  }
)


export default axiosInstance;
