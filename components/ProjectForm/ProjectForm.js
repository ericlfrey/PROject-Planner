/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createProject, updateProject } from '../../api/projectData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  firebaseKey: '',
  uid: '',
  date_created: '',
};

export default function ProjectForm({ projectObj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (projectObj.firebaseKey) setFormInput(projectObj);
  }, [projectObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectObj.firebaseKey) {
      updateProject(formInput).then(() => router.push(`/project/${projectObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, date_created: new Date() };
      createProject(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProject(patchPayload).then(() => router.push(`/project/${patchPayload.firebaseKey}`));
      });
    }
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

ProjectForm.propTypes = {
  projectObj: PropTypes.shape({
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    date_created: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  projectObj: initialState,
};
