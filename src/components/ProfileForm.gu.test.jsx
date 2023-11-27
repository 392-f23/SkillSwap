// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProfileForm from './ProfileForm';
// import { useAuthState }  from "../utilities/firebase";
// import { fetchDataArray } from '../utilities/fetch_data';
// vi.mock('../utilities/firebase');
// useAuthState.mockReturnValue([null, null]);

// vi.mock('../utilities/fetch_data');
// fetchDataArray.mockReturnValue([{displayName: "John Doe", email: "johndoe@gmail.com"}, {displayName: "Jane Doe", email: "janedoe@gmail.com"}]);
// const mockUser = { displayName: 'John Doe', email: 'johndoe@gmail.com'};

// test('renders ProfileForm component', () => {
//   render(<ProfileForm user={mockUser}/>);
//   expect(screen.getByLabelText('Skills Have')).toBeTruthy();
// });

// test('submits form with correct data', async () => {
//   render(<ProfileForm user={mockUser}/>);

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
//     // Assertions based on the expected behavior after submission
//     // Add your assertions here based on the behavior of your component after form submission
//   });
// });
