import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTask, updateTask } from '../../api/taskData';

const initialState = {
  firebaseKey: '',
  project_id: '',
  task_name: '',
  details: '',
  date_created: '',
  due_date: '',
  complete: false,
  in_progress: false,
};

export default function TaskForm({ projectFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, date_created: new Date(), project_id: projectFirebaseKey };
    createTask(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateTask(patchPayload).then(() => router.push(`/project/${projectFirebaseKey}`));
    });
  };

  return (
    <>
      <h1>Task Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task Name"
            name="task_name"
            value={formInput.task_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="details"
            value={formInput.details}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={formInput.due_date}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

TaskForm.propTypes = {
  projectFirebaseKey: PropTypes.string,
};

TaskForm.defaultProps = {
  projectFirebaseKey: '',
};