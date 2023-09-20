import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCurrencyRate, UpdateCurrencyRateBody } from './currencyRate.interfaces';

export const createCurrencyRateSchema = {
  body: Joi.object<NewCurrencyRate>({
    baseCurrency: Joi.string().required().length(3),
    targetCurrency: Joi.string().required().length(3),
    exchangeRate: Joi.number().required(),
    currencyTime: Joi.date().required(),
  }),
};

export const getCurrencyRatesSchema = {
  query: Joi.object().keys({
    baseCurrency: Joi.string(),
    targetCurrency: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCurrencyRateByIdSchema = {
  params: Joi.object({
    currencyRateId: Joi.string().custom(objectId),
  }),
};

export const updateCurrencyRateByIdSchema = {
  params: Joi.object({
    currencyRateId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object<UpdateCurrencyRateBody>({
    baseCurrency: Joi.string().length(3),
    targetCurrency: Joi.string().length(3),
    exchangeRate: Joi.number(),
    currencyTime: Joi.date(),
  }).min(1),
};

export const deleteCurrencyRateByIdSchema = {
  params: Joi.object({
    currencyRateId: Joi.string().custom(objectId),
  }),
};
