import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LastValue from './LastValue';
import { currencyApi } from '../../config/axios-services';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../config/axios-services', () => ({
  currencyApi: {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          totalResults: 1,
          results: [
            {
              exchangeRate: 5.85,
              currencyTime: '2023-09-21T15:30:00Z',
            },
          ],
        },
      })
    ),
  },
}));

describe('LastValue', () => {
  it('renders the component with data', async () => {
    const { getByText } = render(<LastValue />);

    await waitFor(() => {
      expect(getByText('USD to BRL')).toBeInTheDocument();
    });
  });

  it('renders the component with loading state', async () => {
    (currencyApi.get as jest.Mock).mockResolvedValueOnce({ data: { totalResults: 0, results: [] } });
    const { getByText } = render(<LastValue />);
    
    await waitFor(() => {
      expect(getByText('USD to BRL')).toBeInTheDocument();
      expect(getByText('1 US Dollar = -')).toBeInTheDocument();
    });
    
  });
});
