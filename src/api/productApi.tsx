import axios from 'axios';
import {getData} from '../helpers/utils';

const BASE_URL = 'https://restserver-nodejs-app-production.up.railway.app/api';

const productApi = axios.create({baseURL: BASE_URL});

productApi.interceptors.request.use(async config => {
  const token = await getData('token');

  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default productApi;
