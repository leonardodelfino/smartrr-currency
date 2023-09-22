import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import {  UpdateCurrencyRateBody, ICurrencyRate } from './currencyRate.interfaces';
import * as currencyRateService from './currencyRate.service';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';

export const createCurrencyRate = catchAsync(async (req: Request, res: Response) => {
  const currencyRate: ICurrencyRate = await currencyRateService.createCurrencyRate(req.body);
  res.status(httpStatus.CREATED).json(currencyRate);
});

export const getCurrencyRates = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['baseCurrency', 'targetCurrency']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await currencyRateService.queryCurrencyRates(filter, options);
  res.json(result);
});

export const getCurrencyRateById = catchAsync(async (req: Request, res: Response) => {
  const currencyRateId: string = req.params['currencyRateId'] as string;
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
  const updateBody: UpdateCurrencyRateBody = req.body;
  const currencyRate: ICurrencyRate | null = await currencyRateService.updateCurrencyRateById(
    new mongoose.Types.ObjectId(currencyRateId),
    updateBody
  );
  res.json(currencyRate);
});

export const deleteCurrencyRateById = catchAsync(async (req: Request, res: Response) => {
  const currencyRateId: string = req.params['currencyRateId'] as string;
  await currencyRateService.deleteCurrencyRateById(new mongoose.Types.ObjectId(currencyRateId));
  res.status(httpStatus.NO_CONTENT).send();
});
