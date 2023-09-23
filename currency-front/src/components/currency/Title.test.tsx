import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title'; 

describe('Title Component', () => {
  it('renders the provided children', () => {
    const { getByText } = render(<Title>Title Text</Title>);
    const titleElement = getByText('Title Text');
    expect(titleElement).toBeDefined();
  });
});
