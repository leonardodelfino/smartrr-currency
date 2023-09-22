import { fetchRatesFromApi, insertRateCurrencyApi } from './jobs.services';
import { CurrencyConverterApiResponse, CurrencyRateApiParams } from './jobs.interfaces';
import { currencyApi, currencyConverterApi } from '../../config/axios-services';
import * as jobsController from './jobs.controller';
import * as jobsService from './jobs.services';
import logger from '../logger/logger';


jest.mock('../../config/axios-services');
jest.mock('../logger/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('Jobs Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch rates from the external API', async () => {
    const response: CurrencyConverterApiResponse = {
      base_currency_code: 'USD',
      base_currency_name: 'US Dollar',
      amount: '1',
      updated_date: '2023-09-22',
      rates: {
        EUR: {
          currency_name: 'Euro',
          rate: '0.85',
          rate_for_amount: '0.85',
        },
      },
      status: 'success',
    };

    (currencyConverterApi.get as jest.Mock).mockResolvedValue({ data: response });

    const result = await fetchRatesFromApi('USD', 'BRL');

    expect(result).toEqual(response);
    expect(currencyConverterApi.get).toHaveBeenCalledWith('/currency/convert', {
      params: {
        format: 'json',
        from: 'USD',
        to: 'BRL',
        amount: '1',
      },
      timeout: 10000,
    });
  });

  it('should handle error while fetching rates from the external API', async () => {
    (currencyConverterApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(fetchRatesFromApi('USD', 'BRL')).rejects.toThrow(
      'Error fetching data from the external API: API Error'
    );

    expect(currencyConverterApi.get).toHaveBeenCalledWith('/currency/convert', {
      params: {
        format: 'json',
        from: 'USD',
        to: 'BRL',
        amount: '1',
      },
      timeout: 10000,
    });
  });

  it('should insert currency rate to external API', async () => {
    const params: CurrencyRateApiParams = {
      baseCurrency: 'USD',
      targetCurrency: 'BRL',
      exchangeRate: 5.0,
      currencyTime: new Date(),
    };

    (currencyApi.post as jest.Mock).mockResolvedValue({ data: params });

    const result = await insertRateCurrencyApi(params);

    expect(result).toEqual(params);
    expect(currencyApi.post).toHaveBeenCalledWith('/currency-rates', params);
  });

  it('should handle error while inserting currency rate to external API', async () => {
    const params: CurrencyRateApiParams = {
      baseCurrency: 'USD',
      targetCurrency: 'BRL',
      exchangeRate: 5.0,
      currencyTime: new Date(),
    };

    (currencyApi.post as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(insertRateCurrencyApi(params)).rejects.toThrow(
      'Error posting data to the external API: API Error'
    );

    expect(currencyApi.post).toHaveBeenCalledWith('/currency-rates', params);
  });
});

describe('Jobs Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle an unsuccessful response from the currency API', async () => {
    const response: CurrencyConverterApiResponse = {
      base_currency_code: 'USD',
      base_currency_name: 'US Dollar',
      amount: '1',
      updated_date: '2023-09-22',
      rates: {},
      status: 'error',
    };

    const fetchRatesFromApiMock = jest.spyOn(jobsService, 'fetchRatesFromApi');
    fetchRatesFromApiMock.mockResolvedValue(response);

    await jobsController.populateCurrencyRates();

    expect(logger.error).toHaveBeenCalledWith('Error fetching rates from API');
  });

});
