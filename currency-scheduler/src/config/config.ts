import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    RAPID_API_KEY: Joi.string().required(),
    RAPID_API_HOST: Joi.string().required(),
    RAPID_API_BASE_URL: Joi.string().required(),
    CURRENCY_API_USER: Joi.string().required(),
    CURRENCY_API_PASSWORD: Joi.string().required(),
    CURRENCY_API_BASE_URL: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  rapidApiKey: envVars.RAPID_API_KEY,
  rapidApiHost: envVars.RAPID_API_HOST,
  rapidApiBaseUrl: envVars.RAPID_API_BASE_URL,
  currencyApiUser: envVars.CURRENCY_API_USER,
  currencyApiPassword: envVars.CURRENCY_API_PASSWORD,
  currencyApiBaseUrl: envVars.CURRENCY_API_BASE_URL,
};

export default config;
