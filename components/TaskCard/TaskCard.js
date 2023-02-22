import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function TaskCard({ taskObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{taskObj.task_name}</Card.Title>
        <Link passHref href={`/task/${taskObj.firebaseKey}`}>
          <Card.Link href="#">View</Card.Link>
        </Link>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    project_id: PropTypes.string,
    task_name: PropTypes.string,
    details: PropTypes.string,
    date_created: PropTypes.string,
    due_date: PropTypes.string,
    complete: PropTypes.bool,
    in_progress: PropTypes.bool,
  }).isRequired,
};
