import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your actual API base URL
  timeout: 10000, // Optional timeout for requests (in ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
