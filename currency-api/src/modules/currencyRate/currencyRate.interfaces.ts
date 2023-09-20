import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ICurrencyRate {
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
  currencyTime: Date;
}

export interface ICurrencyRateDoc extends ICurrencyRate, Document {}

export interface ICurrencyRateModel extends Model<ICurrencyRateDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateCurrencyRateBody = Partial<ICurrencyRate>;

export type NewCurrencyRate = ICurrencyRate
