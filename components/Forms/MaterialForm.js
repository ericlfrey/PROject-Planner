import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getProjectTasks } from '../../api/taskData';
import { createMaterial, updateMaterial } from '../../api/materialData';
import formStyles from '../../styles/FormStyles.module.css';
import GoBackBtn from '../GoBackBtn/GoBackBtn';

const initialState = {
  firebaseKey: '',
  project_id: '',
  task_id: '',
  material_name: '',
  price: '',
  quantity: '',
  acquired: false,
};

export default function MaterialForm({ projectFirebaseKey, materialObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [projectTasks, setProjectTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getProjectTasks(projectFirebaseKey).then(setProjectTasks);
    if (materialObj.firebaseKey) setFormInput(materialObj);
  }, [materialObj, projectFirebaseKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (materialObj.firebaseKey) {
      updateMaterial(formInput).then(router.push(`/project/${projectFirebaseKey}`));
    } else {
      const payload = { ...formInput, project_id: projectFirebaseKey };
      createMaterial(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMaterial(patchPayload).then(router.push(`/project/${projectFirebaseKey}`));
      });
    }
  };

  return (
    <>
      <div className={formStyles.formContainer}>
        <Form onSubmit={handleSubmit} className={formStyles.form}>
          <Form.Group className="mb-3">
            <Form.Label>Material Name</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              type="text"
              name="material_name"
              value={formInput.material_name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              type="number"
              min=".01"
              step=".01"
              name="price"
              value={formInput.price}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              type="number"
              name="quantity"
              min="1"
              step="1"
              value={formInput.quantity}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          {projectTasks.length
            ? (
              <Form.Group className="mb-3">
                <Form.Label>Assign to Task</Form.Label>
                <Form.Select
                  className={formStyles.formInputField}
                  name="task_id"
                  onChange={handleChange}
                  value={formInput.task_id}
                  required
                >
                  <option value="">Choose</option>
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
            )
            : ''}
          {materialObj.firebaseKey
            ? (
              <Form.Group className="mb-3">
                <Form.Label>Acquired?</Form.Label>
                <Form.Check
                  type="switch"
                  name="acquired"
                  checked={formInput.acquired}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      acquired: e.target.checked,
                    }));
                  }}
                />
              </Form.Group>
            )
            : ''}
          <div>
            <button type="submit" className={formStyles.formBtn}>
              {materialObj.firebaseKey ? 'Edit Material' : 'Add Material'}
            </button>
          </div>
        </Form>
      </div>
      <GoBackBtn />
    </>
  );
}

MaterialForm.propTypes = {
  projectFirebaseKey: PropTypes.string,
  materialObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    project_id: PropTypes.string,
    task_id: PropTypes.string,
    material_name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    acquired: PropTypes.bool,
  }),
};

MaterialForm.defaultProps = {
  projectFirebaseKey: '',
  materialObj: initialState,
};
