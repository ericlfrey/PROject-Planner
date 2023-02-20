import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createProject, updateProject } from '../../api/projectData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
};

export default function ProjectForm() {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid, date_created: new Date() };
    createProject(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateProject(patchPayload).then(() => router.push('/'));
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add a new Project</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter New Project Name"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
