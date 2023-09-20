import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import {  UpdateCurrencyRateBody, ICurrencyRate } from './currencyRate.interfaces';
import * as currencyRateService from './currencyRate.service';

export const createCurrencyRate = catchAsync(async (req: Request, res: Response) => {
  const currencyRate: ICurrencyRate = await currencyRateService.createCurrencyRate(req.body);
  res.status(httpStatus.CREATED).json(currencyRate);
});

export const getCurrencyRates = catchAsync(async (req: Request, res: Response) => {
  const filter = req.query; // You may want to validate and sanitize the query parameters here.
  const options = req.query; // You may want to validate and sanitize the query parameters here.
  const result = await currencyRateService.queryCurrencyRates(filter, options);
  res.json(result);
});

export const getCurrencyRateById = catchAsync(async (req: Request, res: Response) => {
  const currencyRateId: string = req.params['currencyRateId'] as string;

  if (!mongoose.Types.ObjectId.isValid(currencyRateId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid currency rate ID');
  }

  const currencyRate: ICurrencyRate | null = await currencyRateService.getCurrencyRateById(
    new mongoose.Types.ObjectId(currencyRateId)
  );

  if (!currencyRate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Currency rate not found');
  }

  res.json(currencyRate);
});

export const updateCurrencyRateById = catchAsync(async (req: Request, res: Response) => {
  const currencyRateId: string = req.params['currencyRateId'] as string;
  if (!mongoose.Types.ObjectId.isValid(currencyRateId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid currency rate ID');
  }

  const updateBody: UpdateCurrencyRateBody = req.body;
  const currencyRate: ICurrencyRate | null = await currencyRateService.updateCurrencyRateById(
    new mongoose.Types.ObjectId(currencyRateId),
    updateBody
  );

  if (!currencyRate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Currency rate not found');
  }

  res.json(currencyRate);
});

export const deleteCurrencyRateById = catchAsync(async (req: Request, res: Response) => {
  const currencyRateId: string = req.params['currencyRateId'] as string;
  if (!mongoose.Types.ObjectId.isValid(currencyRateId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid currency rate ID');
  }

  await currencyRateService.deleteCurrencyRateById(new mongoose.Types.ObjectId(currencyRateId));
  res.status(httpStatus.NO_CONTENT).send();
});
