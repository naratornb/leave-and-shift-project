import axios from 'axios';

const baseUrl = process.env.ENV_NAME === 'production'? 'http://54.66.213.198:5001' : 'http://localhost:5001';
console.log("axiosconfigIP:" + baseUrl);
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
