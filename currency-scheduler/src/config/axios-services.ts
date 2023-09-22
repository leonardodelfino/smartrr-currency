import axios, { AxiosRequestConfig } from 'axios';
import logger from '../modules/logger/logger';
import config from '../config/config';

const currencyConverterApi = axios.create({
  baseURL: config.rapidApiBaseUrl || '',
  headers: {
    'X-RapidAPI-Key': config.rapidApiKey || '',
    'X-RapidAPI-Host': config.rapidApiHost || '',
    'Content-Type': 'application/json',
  },
});

const currencyApi = axios.create({
  baseURL: config.currencyApiBaseUrl || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchCurrencyApiAuthToken = async () => {
  const paramsAuthenticate = { email: config.currencyApiUser, password: config.currencyApiPassword };
  return axios.post(`${config.currencyApiBaseUrl}/auth/login`, paramsAuthenticate, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.data.tokens.access.token;
  }).catch((error) => {
    logger.error('Failed to fetch CurrencyApi JWT token', error);
    return error;
  });
};

currencyApi.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await fetchCurrencyApiAuthToken();
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {
  currencyConverterApi,
  currencyApi,
};
