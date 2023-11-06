import { describe, it, expect } from 'vitest';
import React from 'react';
import SwapPage from '../components/SwapPage';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import App from '../App';
import { useAuthState }  from "./firebase";
vi.mock('./firebase');
useAuthState.mockReturnValue([null, null]);

import { fetchDataArray } from './fetch_data';
vi.mock('./fetch_data');
fetchDataArray.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, {displayName: "Jane Doe", email: "janedoe@gmail.com"}]);


describe('SwapPage tests', () => {
  it('renders without crashing', () => {
    render(<SwapPage />);
  });

  it('applies not-logged-in class when user is not logged in', () => {
    useAuthState.mockReturnValue([null]); // Simulate no user logged in
    render(<SwapPage />);
    const swapPageElement = screen.getByTestId('swap-page');
    expect(swapPageElement.className).toContain('not-logged-in');
  });

  it('applies logged-in class when user is logged in', () => {
    useAuthState.mockReturnValue([{}]); // Mock user object
    render(<SwapPage />);
    const swapPageElement = screen.getByText('SkillSwap').closest('div');
    expect(swapPageElement.className).to.include('logged-in');
  });

  it('contains the SkillSwap heading', () => {
    render(<SwapPage />);
    const heading = screen.queryByText('SkillSwap');
    expect(heading).toBeTruthy(); // Checks if the heading is present
  });

  it('renders SearchBar when user is logged in', () => {
    vi.mocked(useAuthState).mockReturnValue([{}]); // Mock user object
    render(<SwapPage />);
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBeGreaterThan(0); // Checks if at least one textbox is present
  });

  it('always renders the Navigation component', () => {
    render(<SwapPage />);
    const navigationElement = screen.getByRole('navigation');
    expect(navigationElement).toBeTruthy();
  });

  it('renders ProfileForm when the user does not have a profile', () => {
    vi.mocked(useAuthState).mockReturnValue([{}]);
    render(<SwapPage />);
    const createProfileButton = screen.getByRole('button', { name: /create profile/i });
    expect(createProfileButton).toBeTruthy(); // This replaces toBeInTheDocument
  });


  it('renders cards for each item in filteredData', async () => {
    vi.mocked(fetchDataArray).mockResolvedValue([
      { email: 'test@test.com', name: 'Test User', 'skills-have': [], 'skills-want': [] },
    ]);
    vi.mocked(useAuthState).mockReturnValue([{ email: 'test@test.com' }]);
    render(<SwapPage />);
    expect(await screen.findAllByRole('img')).toHaveLength(1); // Assuming there's an image for each card
  });

  it('has a Contact button in each card', async () => {
    vi.mocked(fetchDataArray).mockResolvedValue([
      { email: 'test@test.com', name: 'Test User', 'skills-have': [], 'skills-want': [] },
    ]);
    vi.mocked(useAuthState).mockReturnValue([{ email: 'test@test.com' }]);
    render(<SwapPage />);
    expect(await screen.findAllByText('Contact')).toHaveLength(1);
  });

  // More tests can be added based on the interaction and dynamic features of the component
});