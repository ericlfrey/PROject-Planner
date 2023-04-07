import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSingleTask } from '../../api/taskData';
import { getSingleProject } from '../../api/projectData';
import cardStyles from '../../styles/CardStyles.module.css';
import { deleteTaskDetails } from '../../api/mergedData';

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
      deleteTaskDetails(firebaseKey).then(() => {
        router.push(`/project/${project.firebaseKey}`);
      });
    }
  };

  return (
    <Card className={cardStyles.topCard}>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div className={cardStyles.cardHeader}>
            <h3>{task.task_name}</h3>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" className={`toggle-btn ${cardStyles.cardActionsBtn}`}>
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
          <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>Project: {project.title}</footer>
          <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>Date Created: {new Date(task.date_created).toLocaleDateString()}</footer>
          <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>{task.due_date ? `Due Date: ${task.due_date}` : 'No due date'}</footer>
          <Link passHref href={`/project/${task.project_id}`}>
            <Card.Link className={cardStyles.goBackBtn}> ← Go Back</Card.Link>
          </Link>
          <hr />
          <h4>Task Details:</h4>
          <Card.Text className={cardStyles.detailsText}>{task.details}</Card.Text>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

TaskDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
