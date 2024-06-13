import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import { store } from '../store';
import { fetchUsers } from '../store/slices/userSlice';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

test('renders Dashboard and fetches users', async () => {
  renderWithProviders(<Dashboard />);

  // Trigger the fetchUsers action
  store.dispatch(fetchUsers());

  // Check if the users are being loaded
  expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();

  // Simulate successful fetchUsers action
  await screen.findByText(/List Of Users/i);

  // Check if the users are displayed
  expect(screen.getByText(/List Of Users/i)).toBeInTheDocument();
});
