import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getAllUsers } from '../api/userData';
import formStyles from '../styles/FormStyles.module.css';
import GoBackBtn from './GoBackBtn/GoBackBtn';
import { getSingleProject } from '../api/projectData';
import { createUserProject, updateUserProject } from '../api/userProjects';

const initialState = {
  email: '',
};

export default function AddUserToProject({ projectFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const [user, setUser] = useState({});
  const [project, setProject] = useState({});

  const router = useRouter();

  useEffect(() => {
    getAllUsers().then((usersArr) => {
      const filteredArr = usersArr.filter((userObj) => userObj.email === formInput.email);
      setUser(filteredArr[0]);
    });
    getSingleProject(projectFirebaseKey).then(setProject);
  }, [formInput.email, projectFirebaseKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      if (window.confirm(`Are you sure you want to add ${user.displayName} to ${project.title}?`)) {
        const payload = { uid: user.uid, project_id: projectFirebaseKey };
        createUserProject(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateUserProject(patchPayload).then(router.push(`/project/${projectFirebaseKey}`));
        });
      }
    } else {
      window.alert('This user does not seem to exist. Try another email.');
    }
  };
  return (
    <>
      <div className={formStyles.formContainer}>
        <Form onSubmit={handleSubmit} className={formStyles.form}>
          <Form.Label>Select a user by Email</Form.Label>
          <InputGroup className="m-auto">
            <Form.Control
              className={formStyles.formInputField}
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <button type="submit" className={formStyles.formBtn}>Search</button>
          </InputGroup>
        </Form>
      </div>
      <GoBackBtn />
    </>
  );
}

AddUserToProject.propTypes = {
  projectFirebaseKey: PropTypes.string.isRequired,
};
