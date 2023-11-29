// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import ProfileForm from '../components/ProfileForm';

// test('adds multiple skills-want separated by commas', async () => {
//     const onProfileSubmitMock = jest.fn();
//     const user = {
//       displayName: 'John Doe',
//       email: 'john@example.com',
//       photoURL: 'https://example.com/avatar.jpg',
//     };
  
//     const { getByLabelText, getByText } = render(
//       <ProfileForm onProfileSubmit={onProfileSubmitMock} user={user} />
//     );
  
//     const skillsWantInput = getByLabelText('Skills Want (comma separated)');
//     const createProfileButton = getByText('Create Profile');
  
//     // Enter multiple skills separated by commas
//     fireEvent.change(skillsWantInput, { target: { value: 'coding, baking, etc...' } });
  
//     // Submit the form
//     fireEvent.click(createProfileButton);
  
//     // Check if the onProfileSubmit function was called with the correct skills
//     expect(onProfileSubmitMock).toHaveBeenCalledWith({
//       name: 'John Doe',
//       image: 'https://example.com/avatar.jpg',
//       email: 'john@example.com',
//       'skills-want': ['coding', 'baking', 'etc...'],
//       'skills-have': [],
//       'skills-have-levels': [],
//     });
//   });