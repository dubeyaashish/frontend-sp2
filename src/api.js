// src/api.js or src/services/api.js

import axios from 'axios';

const API = axios.create({ baseURL: 'https://senior2-test-5dw6rmhvu-bhuwadit1179s-projects.vercel.app' });

export const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
