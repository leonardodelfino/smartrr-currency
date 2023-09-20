import CurrencyRate from './currencyRate.model';
import { ICurrencyRate } from './currencyRate.interfaces';

describe('CurrencyRate model', () => {
  describe('CurrencyRate validation', () => {
    let newCurrencyRate: ICurrencyRate;

    beforeEach(() => {
      newCurrencyRate = {
        baseCurrency: 'USD',
        targetCurrency: 'BRL',
        exchangeRate: 5.3, // Change to a valid exchange rate value
        currencyTime: new Date(),
      };
    });

    test('should correctly validate a valid currency rate', async () => {
      await expect(new CurrencyRate(newCurrencyRate).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if baseCurrency does not have 3 characters', async () => {
      newCurrencyRate.baseCurrency = 'US';
      await expect(new CurrencyRate(newCurrencyRate).validate()).rejects.toThrow();
    });

    test('should throw a validation error if targetCurrency does not have 3 characters', async () => {
      newCurrencyRate.targetCurrency = 'BR';
      await expect(new CurrencyRate(newCurrencyRate).validate()).rejects.toThrow();
    });

    // test('should throw a validation error if exchangeRate is missing', async () => {
    //   delete newCurrencyRate.exchangeRate;
    //   await expect(new CurrencyRate(newCurrencyRate).validate()).rejects.toThrow();
    // });

    // test('should throw a validation error if currencyTime is missing', async () => {
    //   delete newCurrencyRate.currencyTime;
    //   await expect(new CurrencyRate(newCurrencyRate).validate()).rejects.toThrow();
    // });
  });
});
