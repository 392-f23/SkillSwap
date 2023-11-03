import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuthState }  from "./utilities/firebase";
vi.mock('./utilities/firebase');
useAuthState.mockReturnValue([null, null]);

it('shows the title', async () => {
  render(<App />);
  await screen.findByText(/SkillSwap/);
});

// it('shows Sign In if not logged in', () => {
//   useAuthState.mockReturnValue([null, null]);
//   render(<App />);
//   const button = screen.queryByText(/Sign In/i);
//   expect(button).toBeInTheDocument();
// });
  
// it('shows Sign Out if logged in', () => {
//   useAuthState.mockReturnValue([{displayName: "Lucy Beck", email: "lucybeck2024@u.northwestern.edu"}, null]);
//   render(<App />);
//   const button = screen.queryByText(/Sign Out/i);
//   expect(button).toBeInTheDocument();
// });