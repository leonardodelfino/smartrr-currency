import axios, { AxiosRequestHeaders } from 'axios'; 
import config from '../config/env'


const currencyApi = axios.create({
  baseURL: config.currencyApiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchCurrencyApiAuthToken = async () => {
  const paramsAuthenticate = { email: config.currencyApiUser, password: config.currencyApiPassword };
  console.log(`-->${config.currencyApiBaseUrl}/auth/login`)
  return axios.post(`${config.currencyApiBaseUrl}/auth/login`, paramsAuthenticate, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    return response.data.tokens.access.token;
  }).catch((error) => {
    console.error('Failed to fetch CurrencyApi JWT token', error);
    return error;
  });
};

currencyApi.interceptors.request.use(async (config) => { 
    const token = await fetchCurrencyApiAuthToken();
    config.headers.set('Authorization', `Bearer ${token}`)
    config.headers.set('Accept', 'application/json')
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {
  currencyApi,
};
