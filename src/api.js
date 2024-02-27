// src/api.js or src/services/api.js

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
