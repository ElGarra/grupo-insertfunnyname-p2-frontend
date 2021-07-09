import axios from 'axios';

const backendAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default backendAPI;
