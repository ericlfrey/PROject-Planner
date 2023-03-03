/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createProject, updateProject } from '../../api/projectData';
import { useAuth } from '../../utils/context/authContext';
import formStyles from '../../styles/FormStyles.module.css';

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
    <div className={formStyles.formContainer}>
      <Form onSubmit={handleSubmit} className={formStyles.form}>
        <Form.Label>{projectObj.firebaseKey ? 'Edit Project Name' : 'Enter Project Name'}</Form.Label>
        <InputGroup className="m-auto">
          <Form.Control
            className={formStyles.formInputField}
            type="text"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button type="submit" className={formStyles.formBtn}>
            {projectObj.firebaseKey ? 'Edit' : '+'}
          </button>
        </InputGroup>
      </Form>
    </div>
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
