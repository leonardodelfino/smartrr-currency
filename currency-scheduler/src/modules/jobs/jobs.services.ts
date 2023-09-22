// externalApiService.ts
import { AxiosResponse } from 'axios';
import { CurrencyConverterApiResponse, CurrencyRateApiParams } from './jobs.interfaces';
import { currencyApi, currencyConverterApi } from '../../config/axios-services';
import logger from '../logger/logger';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchRatesFromApi = async (baseCurrencyCode: string, targetCurrencyCode: string, retries: number = MAX_RETRIES): Promise<CurrencyConverterApiResponse> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const params = {
        format: 'json',
        from: baseCurrencyCode,
        to: targetCurrencyCode,
        amount: '1',
      };

      logger.info("Fetching currency rates");
      const response: AxiosResponse<CurrencyConverterApiResponse> = await currencyConverterApi.get("/currency/convert", {
        params,
        timeout: TIMEOUT_MS,
      });

      return response.data;
    } catch (error: any) {
      if (attempt < retries - 1) {
        logger.error(`Error fetching data from the external API. Retrying...`);
        await delay(1000);
      } else {
        throw new Error(`Error fetching data from the external API: ${error.message}`);
      }
    }
  }

  throw new Error('Max retries reached without success.');
};

export const insertRateCurrencyApi = async (params: CurrencyRateApiParams): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await currencyApi.post('/currency-rates', params);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error posting data to the external API: ${error.message}`);
  }
};
