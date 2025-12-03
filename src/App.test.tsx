import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GPTracker header', () => {
  render(<App />);
  const headerElement = screen.getByText(/GPTracker/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders add meal button', () => {
  render(<App />);
  const mealButton = screen.getByText(/Add Meal/i);
  expect(mealButton).toBeInTheDocument();
});

test('renders add symptom button', () => {
  render(<App />);
  const symptomButton = screen.getByText(/Add Symptom/i);
  expect(symptomButton).toBeInTheDocument();
});
