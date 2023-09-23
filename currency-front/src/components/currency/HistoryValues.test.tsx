import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import History from './HistoryValues'; // Adjust the import path as needed

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

describe('History Component', () => {
  it('renders without errors', async () => {
    const { getByText } = render(<History />);

    await waitFor(() => {
      expect(getByText('History')).toBeDefined()
      expect(getByText('Date')).toBeDefined();
      expect(getByText('From')).toBeDefined();
      expect(getByText('Target')).toBeDefined();
      expect(getByText('Value')).toBeDefined();
    });
  });

  // solve mock problem to remove skip
  it.skip('fetches and displays currency data', async () => {
    const { getByText } = render(<History />);

    await waitFor(() => {
      expect(getByText('9/21/2023, 3:30:00 PM')).toBeDefined();
      expect(getByText('USD')).toBeDefined();
      expect(getByText('BRL')).toBeDefined();
      expect(getByText('$5.85')).toBeDefined();
    });
  });

  // solve mock problem to remove skip
  it.skip('handles data fetching errors', async () => {
    render(<History />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching data:')).toBeInTheDocument();
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
    });
  });

});
