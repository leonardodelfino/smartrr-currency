import React from 'react';
import { render } from '@testing-library/react';
import { mainListItems } from './ListItems'; // Import the component you want to test

test('renders mainListItems', () => {
  const { getByText } = render(mainListItems);
  const currencyText = getByText('Currency');
  expect(currencyText).toBeInTheDocument();
});
