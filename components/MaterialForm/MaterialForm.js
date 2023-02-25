import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getProjectTasks } from '../../api/taskData';
import { createMaterial, updateMaterial } from '../../api/materialData';

const initialState = {
  firebaseKey: '',
  project_id: '',
  task_id: '',
  material_name: '',
  price: '',
  quantity: 0,
  acquired: false,
};

export default function MaterialForm({ projectFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const [projectTasks, setProjectTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getProjectTasks(projectFirebaseKey).then(setProjectTasks);
  }, [projectFirebaseKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, project_id: projectFirebaseKey };
    // console.warn(payload);
    createMaterial(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateMaterial(patchPayload).then(router.push(`/project/${projectFirebaseKey}`));
    });
  };
  return (
    <>
      {/* {taskObj.firebaseKey ? 'Edit' : 'Add'} */}
      <h1>Material</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Material Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Material Name"
            name="material_name"
            value={formInput.material_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            value={formInput.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Quantity"
            name="quantity"
            min="1"
            step="1"
            value={formInput.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Assign to Task</Form.Label>
          <Form.Select
            name="task_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.task_id}
            required
          >
            <option value="">Assign to Task</option>
            {
              projectTasks.map((task) => (
                <option
                  key={task.firebaseKey}
                  value={task.firebaseKey}
                >
                  {task.task_name}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          {/* {taskObj.firebaseKey ? 'Edit Task' : 'Add Task'} */}
          Submit
        </Button>
      </Form>
    </>
  );
}

MaterialForm.propTypes = {
  projectFirebaseKey: PropTypes.string.isRequired,
};
