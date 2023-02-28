/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card, Col, Dropdown, DropdownButton, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteTask } from '../../api/taskData';
import styles from './TaskCard.module.css';

export default function TaskCard({ taskObj, onChange }) {
  const handleDeleteTask = () => {
    if (window.confirm(`Are you sure you want to delete "${taskObj.task_name}"? This task cannot be undone.`)) {
      deleteTask(taskObj.firebaseKey).then(onChange);
    }
  };

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <Row>
          <Col>
            <Card.Title>{taskObj.task_name}</Card.Title>
          </Col>
          <Col>
            <Card.Text>
              Status: {taskObj.todo ? 'Not Started' : taskObj.in_progress ? 'In Progress' : 'Complete'}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              Due Date: {taskObj.due_date ? new Date(taskObj.due_date).toLocaleDateString() : 'No date set'}
            </Card.Text>
          </Col>
          <Col className={styles.taskDropdown}>
            <DropdownButton id="dropdown-basic-button" title="">
              <Link passHref href={`/task/${taskObj.firebaseKey}`}>
                <Dropdown.Item href="#/action-1">Details</Dropdown.Item>
              </Link>
              <Link passHref href={`/task/edit/${taskObj.firebaseKey}`}>
                <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleDeleteTask}>Delete</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        {/* <Link passHref href={`/task/${taskObj.firebaseKey}`}>
          <Card.Link href="#">View</Card.Link>
        </Link>
        <Link passHref href={`/task/edit/${taskObj.firebaseKey}`}>
          <Card.Link href="#">Edit</Card.Link>
        </Link>
        <Card.Link href="#" onClick={handleDeleteTask}>Delete</Card.Link> */}
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
    todo: PropTypes.string,
    complete: PropTypes.bool,
    in_progress: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
