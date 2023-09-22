import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { currencyApi } from '../../config/axios-services';
import { AxiosRequestConfig } from 'axios';

function formatCurrencyTime(currencyTime: Date): string {
  return new Date(currencyTime).toLocaleString('en-US');
}

export default function LastValue(): JSX.Element {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: AxiosRequestConfig = {
          params: {
            baseCurrency: 'USD',
            targetCurrency: 'BRL',
            sortBy: 'currencyTime:desc',
            limit: 1,
          },
        };

        const response = await currencyApi.get('/currency-rates', params);

        if (response && response.data.totalResults > 0) {
          const { exchangeRate, currencyTime } = response.data.results[0];
          setExchangeRate(exchangeRate);
          setLastUpdated(formatCurrencyTime(currencyTime));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>USD to BRL</Title>
      <Typography component="p" variant="h4">
        {exchangeRate !== null ? `R$ ${exchangeRate.toFixed(2)}` : '-'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        1 US Dollar = {exchangeRate !== null ? `BRL ${exchangeRate.toFixed(2)}` : '-'}
      </Typography>
      <div>
        <Typography component="p" variant="h6" sx={{ fontSize: '0.75em' }}>
          {lastUpdated !== null ? `Updated at: ${lastUpdated}` : '-'}
        </Typography>
      </div>
    </React.Fragment>
  );
}
