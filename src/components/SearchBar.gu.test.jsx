import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { fetchDataArray } from '../utilities/fetch_data';
import { useAuthState }  from "../utilities/firebase";

// Lucy's code mocking a user "John Doe" to test logged in features
vi.mock('../utilities/firebase');
useAuthState.mockReturnValue([null, null]);
vi.mock('../utilities/fetch_data');
fetchDataArray.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, {displayName: "Jane Doe", email: "janedoe@gmail.com"}]);

it('Renders the searchbar', async () => {
  useAuthState.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, null]);
  render(<App />);
  await screen.findByText(/Search/i);
});