// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProfileForm from './ProfileForm';

// test('renders ProfileForm component', () => {
//   render(<ProfileForm />);
//   expect(screen.getByLabelText('Skills Have')).toBeTruthy();
// });

// test('submits form with correct data', async () => {
//   render(<ProfileForm />);

//   // Interaction with the form fields
//   fireEvent.change(screen.getByLabelText('Skills Have', { selector: 'input' }), {
//     target: { value: 'React,JavaScript' },
//   });

//   fireEvent.change(screen.getByLabelText('Skills Want (comma separated)', { selector: 'input' }), {
//     target: { value: 'Coding,Testing' },
//   });

//   const fileInput = screen.getByLabelText('Profile Picture', { selector: 'input[type="file"]' });
//   const file = new File(['(⌐□_□)'], 'avatar.jpg', { type: 'image/jpeg' });
//   fireEvent.change(fileInput, { target: { files: [file] } });

//   // Form submission
//   fireEvent.click(screen.getByText('Create Profile'));

//   // Wait for asynchronous tasks to complete (e.g., image upload)
//   await waitFor(() => {

//   });
// });
