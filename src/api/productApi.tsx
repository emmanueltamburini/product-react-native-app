import axios from 'axios';

const BASE_URL = 'https://restserver-nodejs-app-production.up.railway.app/api';

const productApi = axios.create({baseURL: BASE_URL});

export default productApi;
