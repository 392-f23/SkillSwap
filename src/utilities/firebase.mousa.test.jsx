import { it, expect, describe } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ProfileForm from '../components/ProfileForm';

describe('ProfileForm tests', () => {
    it('should add multiple skills separated by commas', async () => {
        const onProfileSubmitMock = vi.fn();
        const mockUser = { displayName: 'Test User', email: 'test@example.com', photoURL: 'http://example.com/photo.jpg' };
        const profileForm = render(<ProfileForm onProfileSubmit={onProfileSubmitMock} user={mockUser} />);    
        const addSkillButton = screen.getByText('+ Add Skill');
        fireEvent.click(addSkillButton);
    
        const skillInputs = screen.getAllByRole('textbox');
        fireEvent.change(skillInputs[0], { target: { value: 'Skill1' } });
        fireEvent.change(skillInputs[1], { target: { value: 'Skill2' } });
    
        // Log state before submitting
        console.log("State before submit:", { skills: skillInputs.map(input => input.value) });
    
        const submitButton = screen.getByRole('button', { name: /Create Profile/i });
        await fireEvent.click(submitButton);
    
        console.log("Mock Function Calls:", onProfileSubmitMock.mock.calls);

        const form = profileForm.container.querySelector('form');
        if (form) {
            fireEvent.submit(form);
        }

        expect(onProfileSubmitMock).toHaveBeenCalledWith(expect.objectContaining({
            name: mockUser.displayName,
            email: mockUser.email,
            image: mockUser.photoURL,
            "skills-want": expect.anything(),
            "skills-have": expect.arrayContaining(['Skill1', 'Skill2']),
            "skills-have-levels": expect.anything(),
        }));
    });

    it('should add multiple skills in "skills-want" separated by commas', async () => {
        const onProfileSubmitMock = vi.fn();
        const mockUser = { displayName: 'Test User', email: 'test@example.com', photoURL: 'http://example.com/photo.jpg' };
        render(<ProfileForm onProfileSubmit={onProfileSubmitMock} user={mockUser} />);

        // Simulate typing in the "skills-want" field
        const skillsWantInput = screen.getByPlaceholderText("coding,baking,etc...");
        fireEvent.change(skillsWantInput, { target: { value: 'coding, baking, painting' } });

        // Optional: Add skills in "skills-have" if required for form submission
        // ...code to add skills to "skills-have"...
        const skillInputs = screen.getAllByRole('textbox');
        fireEvent.change(skillInputs[0], { target: { value: 'Skill1' } });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /Create Profile/i });
        await fireEvent.click(submitButton);

        // Check if onProfileSubmit was called with the correct "skills-want"
        expect(onProfileSubmitMock).toHaveBeenCalledWith(expect.objectContaining({
            "skills-want": expect.arrayContaining(['coding', 'baking', 'painting']),
        }));
    });

    it('should fail to submit the form when no skills are added', async () => {
        const onProfileSubmitMock = vi.fn();
        const mockUser = { displayName: 'Test User', email: 'test@example.com', photoURL: 'http://example.com/photo.jpg' };
        render(<ProfileForm onProfileSubmit={onProfileSubmitMock} user={mockUser} />);

        const submitButton = screen.getByRole('button', { name: /Create Profile/i });
        await fireEvent.click(submitButton);

        // Check if the onProfileSubmit function has not been called, indicating a submission failure
        expect(onProfileSubmitMock).not.toHaveBeenCalled();
    });
});
