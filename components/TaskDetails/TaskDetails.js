import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteTask, getSingleTask } from '../../api/taskData';
import { getSingleProject } from '../../api/projectData';

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
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{task.task_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Project: {project.title}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Date Created: {new Date(task.date_created).toLocaleDateString()}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{task.due_date ? `Due Date: ${task.due_date}` : 'No due date'}</Card.Subtitle>
        <Card.Text>{task.details}</Card.Text>
        <Link passHref href={`/task/edit/${firebaseKey}`}>
          <Card.Link href="#">Edit</Card.Link>
        </Link>
        <Card.Link href="#" onClick={handleDeleteTask}>Delete</Card.Link>
        <Link passHref href={`/project/${task.project_id}`}>
          <Card.Link href="#">Go Back</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  );
}

TaskDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
