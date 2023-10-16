// ProfileForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ProfileForm = ({ onProfileSubmit }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [skillsHave, setSkillsHave] = useState('');
  const [skillsWant, setSkillsWant] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" value={image} onChange={e => setImage(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Skills Have (comma separated)</Form.Label>
        <Form.Control type="text" value={skillsHave} onChange={e => setSkillsHave(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Skills Want (comma separated)</Form.Label>
        <Form.Control type="text" value={skillsWant} onChange={e => setSkillsWant(e.target.value)} />
      </Form.Group>
      <Button type="submit">Create Profile</Button>
    </Form>
  );
};

export default ProfileForm;