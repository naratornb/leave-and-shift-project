import axios from 'axios';

const axiosInstance = axios.create({
  // change
  baseURL: 'http://localhost:5002', // local
  // baseURL: 'http://54.66.213.198:5002', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
