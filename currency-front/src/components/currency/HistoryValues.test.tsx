import React from 'react';
import { render, waitFor } from '@testing-library/react';
import History from './HistoryValues';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../config/axios-services', () => ({
  currencyApi: {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          page: 1,
          totalResults: 10,
          results: [
            {
              id: 1,
              currencyTime: '2023-09-21T15:30:00Z',
              baseCurrency: 'USD',
              targetCurrency: 'BRL',
              exchangeRate: 5.85,
            },
          ],
        },
      })
    ),
  },
}));

describe('test HistoryValues Component', () => {
  it('renders without errors and displays table data', async () => {
    const { getByText, getAllByRole } = render(<History />);

    await waitFor(() => {
      expect(getByText('History')).toBeInTheDocument();

      expect(getByText('Date')).toBeInTheDocument();
      expect(getByText('From')).toBeInTheDocument();
      expect(getByText('Target')).toBeInTheDocument();
      expect(getByText('Value')).toBeInTheDocument();

      const tableRows = getAllByRole('row');
      expect(tableRows.length).toBe(1); 

    });
  });

});
