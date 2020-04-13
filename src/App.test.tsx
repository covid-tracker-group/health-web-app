import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders copyright link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Copyright/i);
  expect(linkElement).toBeInTheDocument();
});
