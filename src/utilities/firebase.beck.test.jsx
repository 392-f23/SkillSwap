import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuthState }  from "./firebase";
vi.mock('./firebase');
useAuthState.mockReturnValue([null, null]);

import { fetchDataArray } from './fetch_data';
vi.mock('./fetch_data');
fetchDataArray.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, {displayName: "Jane Doe", email: "janedoe@gmail.com"}]);

it('shows Sign In if not logged out', () => {
  useAuthState.mockReturnValue([null, null]);
  render(<App />);
  const button = screen.queryByText(/Sign in/i);
  expect(button).toBeTruthy();
});

it('Test fails with invalid code for logged out', () => {
  useAuthState.mockImplementation(() => {
    throw new Error('This is an expected error');
  });
  expect(() => render(<App />)).toThrowError('This is an expected error');
});
  
it('shows Sign Out if logged in', async () => {
  useAuthState.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, null]);
  render(<App />);
  const button = screen.queryByText(/Sign out/i);
  expect(button).toBeTruthy();
});

it('Test fails with invalid code for logged in', () => {
  useAuthState.mockImplementation(() => {
    throw new Error('This is an expected error');
  });
  expect(() => render(<App />)).toThrowError('This is an expected error');
});