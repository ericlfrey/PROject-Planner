/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card, Col, Dropdown, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteTask } from '../../api/taskData';
import cardStyles from '../../styles/CardStyles.module.css';

export default function TaskCard({ taskObj, onChange }) {
  const handleDeleteTask = () => {
    if (window.confirm(`Are you sure you want to delete "${taskObj.task_name}"? This task cannot be undone.`)) {
      deleteTask(taskObj.firebaseKey).then(onChange);
    }
  };

  return (
    <Card className={cardStyles.card}>
      <Card.Body>
        <Row>
          <Col>
            <Link passHref href={`/task/${taskObj.firebaseKey}`}>
              <Card.Link className={cardStyles.cardLink}>{taskObj.task_name}</Card.Link>
            </Link>
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
          <Col className={cardStyles.cardDropdown}>
            <Dropdown>
              <Dropdown.Toggle className={cardStyles.cardActionsBtn} variant="success" />
              <Dropdown.Menu className={cardStyles.dropdownMenu}>
                <Link passHref href={`/task/${taskObj.firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Details</Dropdown.Item>
                </Link>
                <Link passHref href={`/task/edit/${taskObj.firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item className={cardStyles.dropdownItem} onClick={handleDeleteTask}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
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
    todo: PropTypes.bool,
    complete: PropTypes.bool,
    in_progress: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
