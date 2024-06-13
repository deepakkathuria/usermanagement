import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { store } from '../store';
import { RootState } from '../store';

const renderWithProviders = (ui: React.ReactElement, initialState: Partial<RootState>) => {
  return render(
    <Provider store={{ ...store, preloadedState: initialState }}>
      <Router>{ui}</Router>
    </Provider>
  );
};

test('redirects to /signin if not authenticated', () => {
  renderWithProviders(
    <Routes>
      <Route path="/protected" element={<ProtectedRoute />} />
      <Route path="/signin" element={<div>Sign In Page</div>} />
    </Routes>,
    { auth: { isAuthenticated: false, user: null, loading: false, error: null } }
  );

  expect(screen.getByText(/Sign In Page/i)).toBeInTheDocument();
});

test('renders protected route if authenticated', () => {
  renderWithProviders(
    <Routes>
      <Route path="/protected" element={<ProtectedRoute />} />
    </Routes>,
    { auth: { isAuthenticated: true, user: {}, loading: false, error: null } }
  );

  expect(screen.queryByText(/Sign In Page/i)).not.toBeInTheDocument();
});
