import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first date box', () => {
  render(<App />);
  const linkElement = screen.getByText(/Schulz/i);
  expect(linkElement).toBeInTheDocument();
});
