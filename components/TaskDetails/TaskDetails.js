import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteTask, getSingleTask } from '../../api/taskData';
import { getSingleProject } from '../../api/projectData';
import styles from './TaskDetails.module.css';
import cardStyles from '../../styles/CardStyles.module.css';

export default function TaskDetails({ firebaseKey }) {
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});

  const router = useRouter();

  useEffect(() => {
    getSingleTask(firebaseKey).then(setTask);
    if (task.project_id) getSingleProject(task.project_id).then(setProject);
  }, [firebaseKey, task.project_id]);

  const handleDeleteTask = () => {
    if (window.confirm(`Are you sure you want to delete "${task.task_name}"? This task cannot be undone.`)) {
      deleteTask(firebaseKey).then(router.push(`/project/${project.firebaseKey}`));
    }
  };

  return (
    <Card className={styles.card}>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div className={styles.cardHeader}>
            <h3>{task.task_name}</h3>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" className={cardStyles.cardActionsBtn}>
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu className={cardStyles.dropdownMenu}>
                <Link passHref href={`/task/edit/${firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item className={cardStyles.dropdownItem} onClick={handleDeleteTask}>Delete Task</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <footer className={`${styles.cardSubtitle} blockquote-footer mt-2`}>Project: {project.title}</footer>
          <footer className={`${styles.cardSubtitle} blockquote-footer mt-2`}>Date Created: {new Date(task.date_created).toLocaleDateString()}</footer>
          <footer className={`${styles.cardSubtitle} blockquote-footer mt-2`}>{task.due_date ? `Due Date: ${task.due_date}` : 'No due date'}</footer>
          <hr />
          <h4>Task Details:</h4>
          <Card.Text className={styles.cardText}>{task.details}</Card.Text>
          <Link passHref href={`/project/${task.project_id}`}>
            <Card.Link className={styles.cardLink}> ← Go Back</Card.Link>
          </Link>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

TaskDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
