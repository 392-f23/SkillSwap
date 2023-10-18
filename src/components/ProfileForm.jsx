// ProfileForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './ProfileForm.css';


const ProfileForm = ({ onProfileSubmit, user }) => {
  const [skillsHave, setSkillsHave] = useState('');
  const [skillsWant, setSkillsWant] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = user.displayName
    const image = user.photoURL
    const email = user.email

    onProfileSubmit({
      name,
      image,
      email,
      "skills-have": skillsHave.split(',').map(skill => skill.trim()),
      "skills-want": skillsWant.split(',').map(skill => skill.trim())
    });
    setName('');
    setImage('');
    setEmail('');
    setSkillsHave('');
    setSkillsWant('');
  };

  return (
    <div className='profileForm'>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Skills Have (comma separated)</Form.Label>
        <Form.Control required type="text" value={skillsHave} onChange={e => setSkillsHave(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Skills Want (comma separated)</Form.Label>
        <Form.Control required type="text" value={skillsWant} onChange={e => setSkillsWant(e.target.value)} />
      </Form.Group>
      <Button type="submit">Create Profile</Button>
    </Form>
    </div>
  );
};

export default ProfileForm;