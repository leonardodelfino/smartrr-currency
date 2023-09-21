import * as jobsService from './jobs.services';
import { CurrencyConverterApiResponse, CurrencyRateApiParams } from './jobs.interfaces';
import logger from '../logger/logger';

const processResponseFromCurrencyApi = (response: CurrencyConverterApiResponse) => {
  if (response.status === 'success') {
      const currenRateParams: CurrencyRateApiParams | undefined = convertApiResponseToRateParams(response)
      if(currenRateParams) {
        logger.debug("Inserting currency rates", currenRateParams);
        jobsService.insertRateCurrencyApi(currenRateParams).catch((error) => {
          logger.error('Error insreting rates to API:', error);
        });
      }
  } else {
    logger.error('Error fetching rates from API');
  }
};

const convertApiResponseToRateParams = (response: CurrencyConverterApiResponse): CurrencyRateApiParams | undefined => {
  const { base_currency_code, rates } = response;
  const currencyCodes = Object.keys(rates);

  if (currencyCodes.length === 0) {
    return undefined;
  }

  const firstCurrencyCode = currencyCodes[0];

  if (!firstCurrencyCode) {
    return undefined;
  }

  const firstRateInfo = rates[firstCurrencyCode];

  if (!firstRateInfo) {
    return undefined;
  }

  return {
    baseCurrency: base_currency_code,
    targetCurrency: firstCurrencyCode,
    exchangeRate: parseFloat(firstRateInfo.rate),
    currencyTime: new Date(),
  };
};


export const populateCurrencyRates = () => {
  jobsService.fetchRatesFromApi('USD', 'BRL')
    .then(processResponseFromCurrencyApi)
    .catch((error) => {
      logger.error('Error fetching rates from API:', error);
    });
};
