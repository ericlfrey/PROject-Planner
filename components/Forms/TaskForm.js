import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTask, updateTask } from '../../api/taskData';
import formStyles from '../../styles/FormStyles.module.css';
import GoBackBtn from '../GoBackBtn/GoBackBtn';

const initialState = {
  firebaseKey: '',
  project_id: '',
  task_name: '',
  details: '',
  date_created: '',
  due_date: '',
  todo: true,
  complete: false,
  in_progress: false,
};

export default function TaskForm({ projectFirebaseKey, taskObj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (taskObj.firebaseKey) setFormInput(taskObj);
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskObj.firebaseKey) {
      updateTask(formInput).then(() => router.push(`/task/${taskObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, date_created: new Date(), project_id: projectFirebaseKey };
      createTask(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTask(patchPayload).then(() => router.push(`/project/${projectFirebaseKey}`));
      });
    }
  };

  return (
    <>
      <div className={formStyles.formContainer}>
        <Form onSubmit={handleSubmit} className={formStyles.form}>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              type="text"
              name="task_name"
              value={formInput.task_name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              as="textarea"
              rows={3}
              name="details"
              value={formInput.details}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              className={formStyles.formInputField}
              type="date"
              name="due_date"
              value={formInput.due_date}
              onChange={handleChange}
            />
          </Form.Group>
          {taskObj.firebaseKey
            && (
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <div key="inline-radio" className="mb-3">
                  <Form.Check
                    inline
                    id="todo"
                    type="radio"
                    label="To Do"
                    name="todo"
                    checked={formInput.todo}
                    onChange={(e) => {
                      setFormInput((prevState) => ({
                        ...prevState,
                        todo: e.target.checked,
                        in_progress: !e.target.checked,
                        complete: !e.target.checked,
                      }));
                    }}
                  />
                  <Form.Check
                    inline
                    id="in_progress"
                    type="radio"
                    label="In Progress"
                    name="in_progress"
                    checked={formInput.in_progress}
                    onChange={(e) => {
                      setFormInput((prevState) => ({
                        ...prevState,
                        in_progress: e.target.checked,
                        todo: !e.target.checked,
                        complete: !e.target.checked,
                      }));
                    }}
                  />
                  <Form.Check
                    inline
                    id="complete"
                    type="radio"
                    label="Complete"
                    name="complete"
                    checked={formInput.complete}
                    onChange={(e) => {
                      setFormInput((prevState) => ({
                        ...prevState,
                        complete: e.target.checked,
                        in_progress: !e.target.checked,
                        todo: !e.target.checked,
                      }));
                    }}
                  />
                </div>
              </Form.Group>
            )}
          <div>
            <button type="submit" className={formStyles.formBtn}>
              {taskObj.firebaseKey ? 'Edit Task' : 'Add Task'}
            </button>
          </div>
        </Form>
      </div>
      <GoBackBtn />
    </>
  );
}

TaskForm.propTypes = {
  projectFirebaseKey: PropTypes.string,
  taskObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    project_id: PropTypes.string,
    task_name: PropTypes.string,
    details: PropTypes.string,
    date_created: PropTypes.string,
    due_date: PropTypes.string,
    todo: PropTypes.bool,
    complete: PropTypes.bool,
    in_progress: PropTypes.bool,
  }),
};

TaskForm.defaultProps = {
  projectFirebaseKey: '',
  taskObj: initialState,
};
