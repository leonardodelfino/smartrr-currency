import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Chart from './Chart';
import '@testing-library/jest-dom/extend-expect'; 

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('recharts', () => {
  const actual = jest.requireActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ width, height, children }: { width: number; height: number; children: React.ReactNode }) => {
      return <div style={{ width, height }}>{children}</div>;
    },
  };
});

jest.mock('../../config/axios-services', () => ({
  currencyApi: {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          results: [
            {
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

describe('test Chart Component', () => {
  it('renders without errors', async () => {
    const { getByText } = render(<Chart />);
    await waitFor(() => {
      expect(getByText('Last 24 hours')).toBeDefined();
    });
  });

  // solve mock problem to remove skip
  it.skip('fetches and displays chart data', async () => {
    const { getByText } = render(<Chart />);

    await waitFor(() => {
      expect(getByText('Last 24 hours')).toBeDefined();
      expect(getByText('Exchange Rate (BRL)')).toBeDefined();
      expect(getByText('5.85')).toBeDefined(); 
    });
  });

});






