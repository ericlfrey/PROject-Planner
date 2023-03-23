import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import formStyles from '../styles/FormStyles.module.css';
import GoBackBtn from './GoBackBtn/GoBackBtn';

const initialState = {
  email: '',
};

export default function SearchUser() {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(formInput.email);
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
