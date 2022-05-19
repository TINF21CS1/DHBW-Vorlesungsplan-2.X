import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first date box', () => {
  render(<App />);
  const e = screen.getByText(/Turing/i);
  expect(e).toBeInTheDocument();
});

test('does not show Tutorium', () => {
  render(<App />);
  const e = screen.getByText(/210B/i);
  expect(e).not.toBeInTheDocument();
})