import 'dotenv/config';

const config = {
  env: process.env['NODE_ENV'],
  port: process.env['SCHEDULER_PORT'],
  rapidApiKey: process.env['RAPID_API_KEY'],
  rapidApiHost: process.env['RAPID_API_HOST'],
  rapidApiBaseUrl: process.env['RAPID_API_BASE_URL'],
  currencyApiUser: process.env['REACT_APP_CURRENCY_API_USER'],
  currencyApiPassword: process.env['REACT_APP_CURRENCY_API_PASSWORD'],
  currencyApiBaseUrl: process.env['CURRENCY_API_BASE_URL'],
};

export default config;
