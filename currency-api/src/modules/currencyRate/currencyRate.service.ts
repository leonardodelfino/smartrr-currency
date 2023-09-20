import httpStatus from 'http-status';
import CurrencyRate from './currencyRate.model';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCurrencyRate, ICurrencyRate, ICurrencyRateDoc, UpdateCurrencyRateBody } from './currencyRate.interfaces';

/**
 * Create a currency rate
 * @param {NewCreatedCurrencyRate} currencyRateBody
 * @returns {Promise<ICurrencyRate>}
 */
export const createCurrencyRate = async (currencyRateBody: NewCurrencyRate): Promise<ICurrencyRate> => {
  // Check for any additional validation or business logic here
  return CurrencyRate.create(currencyRateBody);
};

/**
 * Query for currency rates
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryCurrencyRates = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const currencyRates = await CurrencyRate.paginate(filter, options);
  return currencyRates;
};

/**
 * Get currency rate by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICurrencyRate | null>}
 */
export const getCurrencyRateById = async (id: mongoose.Types.ObjectId): Promise<ICurrencyRateDoc | null> =>
  CurrencyRate.findById(id);

/**
 * Update currency rate by id
 * @param {mongoose.Types.ObjectId} currencyRateId
 * @param {UpdateCurrencyRateBody} updateBody
 * @returns {Promise<ICurrencyRate | null>}
 */
export const updateCurrencyRateById = async (
  currencyRateId: mongoose.Types.ObjectId,
  updateBody: UpdateCurrencyRateBody
): Promise<ICurrencyRateDoc | null> => {
  const currencyRate = await getCurrencyRateById(currencyRateId);
  if (!currencyRate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Currency rate not found');
  }
  // Check for any additional validation or business logic here
  Object.assign(currencyRate, updateBody);
  await currencyRate.save();
  return currencyRate;
};

/**
 * Delete currency rate by id
 * @param {mongoose.Types.ObjectId} currencyRateId
 * @returns {Promise<ICurrencyRateDoc | null>}
 */
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
