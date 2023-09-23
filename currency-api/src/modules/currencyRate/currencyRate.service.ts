import httpStatus from 'http-status';
import CurrencyRate from './currencyRate.model';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCurrencyRate, ICurrencyRate, ICurrencyRateDoc, UpdateCurrencyRateBody } from './currencyRate.interfaces';

export const createCurrencyRate = async (currencyRateBody: NewCurrencyRate): Promise<ICurrencyRate> => {
  return CurrencyRate.create(currencyRateBody);
};

export const queryCurrencyRates = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const currencyRates = await CurrencyRate.paginate(filter, options);
  return currencyRates;
};

export const getCurrencyRateById = async (id: mongoose.Types.ObjectId): Promise<ICurrencyRateDoc | null> =>
  CurrencyRate.findById(id);

export const updateCurrencyRateById = async (
  currencyRateId: mongoose.Types.ObjectId,
  updateBody: UpdateCurrencyRateBody
): Promise<ICurrencyRateDoc | null> => {
  const currencyRate = await getCurrencyRateById(currencyRateId);
  if (!currencyRate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Currency rate not found');
  }

  Object.assign(currencyRate, updateBody);
  await currencyRate.save();
  return currencyRate;
};

export const deleteCurrencyRateById = async (
  currencyRateId: mongoose.Types.ObjectId
): Promise<ICurrencyRateDoc | null> => {
  const currencyRate = await getCurrencyRateById(currencyRateId);
  if (!currencyRate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Currency rate not found');
  }
  await currencyRate.deleteOne();
  return currencyRate;
};
