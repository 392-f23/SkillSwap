import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

it('shows the title', async () => {
  render(<App />);
  await screen.findByText(/SkillSwap/);
});
