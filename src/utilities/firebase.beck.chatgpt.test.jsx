import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwapPage from '../SwapPage';  // Adjust the path as needed

// Mock the authentication state hook
jest.mock('../utilities/firebase', () => ({
  ...jest.requireActual('../utilities/firebase'),
  useAuthState: jest.fn(() => [null]),
}));

describe('SwapPage component', () => {
  test('renders landing page when signed out', async () => {
    render(<SwapPage />);

    // Ensure "SkillSwap" heading is present on the landing page
    expect(screen.getByText('SkillSwap')).toBeInTheDocument();

    // Ensure navigation is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Ensure there's a sign-in option
    expect(screen.getByText('Sign In')).toBeInTheDocument();

    // Simulate a user clicking on the "Sign In" button
    userEvent.click(screen.getByText('Sign In'));

    // You might need to wait for some asynchronous action, like a redirect
    await waitFor(() => {
      // Check if the user is on the sign-in page or has been redirected
      expect(screen.getByText('Sign In Page')).toBeInTheDocument();
    });
  });
});
