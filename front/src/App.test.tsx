import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first date box', () => {
  render(<App />);
  const e = screen.queryAllByText(/Turing/i);
  expect(e).not.toHaveLength(0);
});

test('does not show Tutorium', () => {
  render(<App />);
  const e = screen.queryAllByText('210B')
  expect(e).toHaveLength(0);
})