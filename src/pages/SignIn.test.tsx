// SignIn.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';
import { store } from '../store';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

test('renders Sign In form', () => {
  renderWithProviders(<SignIn />);

  expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('submits form with email and password', () => {
  renderWithProviders(<SignIn />);

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/Sign In/i));

  expect(store.getState().auth.loading).toBe(true);
});
