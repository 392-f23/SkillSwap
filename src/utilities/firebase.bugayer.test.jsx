import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { createProfile } from './api'; // replace with your actual API module

jest.mock('./api'); // Mock the API module

test('only one profile gets created when clicking Create Profile', async () => {
  const { getByText, getByLabelText } = render(<ProfileForm />);

  // Fill out the form
  fireEvent.change(getByLabelText(/Skills Want/i), { target: { value: 'coding,baking' } });
  // Add other form fields as necessary

  // Click the Create Profile button
  fireEvent.click(getByText(/Create Profile/i));

  // Assert that the createProfile function was called exactly once
  expect(createProfile).toHaveBeenCalledTimes(1);
});