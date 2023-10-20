import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './ProfileForm.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ProfileForm = ({ onProfileSubmit, user }) => {
  const [skillsHave, setSkillsHave] = useState('');
  const [skillsWant, setSkillsWant] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = user.displayName;
    const email = user.email;
    let imageUrl = user.photoURL; // default to the user's current photo URL

    if (imageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, 'profileImages/' + imageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    onProfileSubmit({
      name,
      image: imageUrl,
      email,
      "skills-have": skillsHave.split(',').map(skill => skill.trim()),
      "skills-want": skillsWant.split(',').map(skill => skill.trim())
    });

    setSkillsHave('');
    setSkillsWant('');
    setImageFile(null);
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
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Create Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileForm;
