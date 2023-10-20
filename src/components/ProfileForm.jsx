import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './ProfileForm.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ProfileForm = ({ onProfileSubmit, user }) => {
  const [skillsWant, setSkillsWant] = useState('');
  const [skillsHaveFields, setSkillsHaveFields] = useState([{ skill: '', level: 'beginner' }]);
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    if (file && allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setImageFile(file);
    } else {
      alert('Please upload a .jpg, .jpeg, or .png file.');
    }
  };

  const handleSkillsHaveChange = (index, field, value) => {
    const newSkillsHaveFields = [...skillsHaveFields];
    newSkillsHaveFields[index][field] = value;
    setSkillsHaveFields(newSkillsHaveFields);
  };

  const addSkillsHaveField = () => {
    setSkillsHaveFields([...skillsHaveFields, { skill: '', level: 'beginner' }]);
  };

  const removeSkillsHaveField = (index) => {
    const newSkillsHaveFields = [...skillsHaveFields];
    newSkillsHaveFields.splice(index, 1);
    setSkillsHaveFields(newSkillsHaveFields);
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
      "skills-want": skillsWant.split(',').map(skill => skill.trim()),
      "skills-have": skillsHaveFields.map(field => field.skill.trim()),
      "skills-have-levels": skillsHaveFields.map(field => field.level),
    });

    setSkillsWant('');
    setSkillsHaveFields([{ skill: '', level: 'beginner' }]);
    setImageFile(null);
  };

  return (
    <div className='profileForm'>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Skills Have</Form.Label>
          {skillsHaveFields.map((field, index) => (
            <div className="row">
              <div key={index} className="input-skills-have">
                <div className="col-7">
                <Form.Control
                  required
                  type="text"
                  value={field.skill}
                  onChange={(e) => handleSkillsHaveChange(index, 'skill', e.target.value)}
                />
                </div>
                <div className="col">
                <Form.Control
                  as="select"
                  value={field.level}
                  onChange={(e) => handleSkillsHaveChange(index, 'level', e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Control>
                </div>
                <Button variant="danger" className="remove-skills-button" onClick={() => removeSkillsHaveField(index)}>-</Button>
              </div>
            </div>
          ))}
          <Button variant="success" className="add-skills-button" onClick={addSkillsHaveField}>+ Add Skill</Button>
        </Form.Group>


        <Form.Group className="form-group">
          <Form.Label>Skills Want (comma separated)</Form.Label>
          <Form.Control placeholder="coding,baking,etc..." required type="text" value={skillsWant} onChange={e => setSkillsWant(e.target.value)} />
        </Form.Group>
        

        <Form.Group className="form-group">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png" />
        </Form.Group>

        <Button type="submit">Create Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileForm;
