import React from 'react';
import { render } from '@testing-library/react';
import { mainListItems } from './ListItems'; // Import the mainListItems from your component file

describe('Main List Items Component', () => {
  it('renders main list items correctly', () => {
    const { getByText } = render(mainListItems);
    expect(getByText('Currency')).toBeDefined();
  });
});
