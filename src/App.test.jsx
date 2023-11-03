import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuthState }  from "./utilities/firebase";
vi.mock('./utilities/firebase');
useAuthState.mockReturnValue([null, null]);

import { fetchDataArray } from './utilities/fetch_data';
vi.mock('./utilities/fetch_data');
fetchDataArray.mockReturnValue([{displayName: "Lucy Beck", email: "lucybeck2024@u.northwestern.edu"}, {displayName: "Lucy Beck", email: "lucybeck2024@u.northwestern.edu"}]);

it('shows the title', async () => {
  render(<App />);
  await screen.findByText(/SkillSwap/);
});

it('shows Sign In if not logged in', () => {
  useAuthState.mockReturnValue([null, null]);
  render(<App />);
  const button = screen.queryByText(/Sign in/i);
  expect(button).toBeTruthy();
});
  
it('shows Sign Out if logged in', async () => {
  useAuthState.mockReturnValue([{displayName: "Lucy Beck", email: "lucybeck2024@u.northwestern.edu"}, null]);
  render(<App />);
  const button = screen.queryByText(/Sign out/i);
  expect(button).toBeTruthy();
});