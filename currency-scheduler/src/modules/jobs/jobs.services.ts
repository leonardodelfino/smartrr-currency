// externalApiService.ts
import { AxiosResponse } from 'axios';
import { CurrencyConverterApiResponse, CurrencyRateApiParams } from './jobs.interfaces';
import { currencyApi, currencyConverterApi } from '../../config/axios-services'

export const fetchRatesFromApi = async (baseCurrencyCode: string, targetCurrencyCode: string): Promise<CurrencyConverterApiResponse> => {
  try {

    const params = {
      format: 'json',
      from: baseCurrencyCode,
      to: targetCurrencyCode,
      amount: '1'
    }

    const response: AxiosResponse<CurrencyConverterApiResponse> = await currencyConverterApi.get("/currency/convert", { params })

    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching data from the external API: ${error.message}`);
  }
}

export const insertRateCurrencyApi = async (params: CurrencyRateApiParams): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await currencyApi.post('/currency-rates', params);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error posting data to the external API: ${error.message}`);
  }
};







