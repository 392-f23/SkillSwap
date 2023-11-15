import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import ProfileForm from './ProfileForm';

const server = setupServer(
  // Define your API mocks here if needed
  // Example:
  rest.post('/api/upload', (req, res, ctx) => {
    return res(ctx.json({ imageUrl: 'https://example.com/avatar.jpg' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders ProfileForm component', () => {
  render(<ProfileForm />);
  // Add your assertions here, for example:
  expect(screen.getByLabelText('Skills Have')).toBeInTheDocument();
});

test('submits form with correct data', async () => {
  render(<ProfileForm />);

  // Add code to interact with the form fields and submit the form

  // Example:
  userEvent.type(screen.getByLabelText('Skills Have'), 'React,JavaScript');
  userEvent.type(screen.getByLabelText('Skills Want (comma separated)'), 'Coding,Testing');
  const fileInput = screen.getByLabelText('Profile Picture');
  const file = new File(['(⌐□_□)'], 'avatar.jpg', { type: 'image/jpeg' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Add more interactions as needed

  // Mock the image upload API call if necessary
  server.use(
    rest.post('/api/upload', (req, res, ctx) => {
      return res(ctx.json({ imageUrl: 'https://example.com/avatar.jpg' }));
    })
  );

  fireEvent.click(screen.getByText('Create Profile'));

  // Wait for asynchronous tasks to complete (e.g., image upload)
  await waitFor(() => {
    // Add assertions based on the expected behavior of your component after submission
    // For example, check that the API was called with the correct data
    expect(server.requests[0].url).toBe('/api/upload');
    expect(JSON.parse(server.requests[0].body)).toEqual(expect.any(File));
  });
});
