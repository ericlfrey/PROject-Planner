import React, { useEffect, useState } from 'react';
import {
  Card, Col, Dropdown, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMaterial } from '../../api/materialData';
import { getSingleTask } from '../../api/taskData';
import cardStyles from '../../styles/CardStyles.module.css';

export default function MaterialCard({ materialObj, onChange }) {
  const [task, setTask] = useState({});

  useEffect(() => {
    getSingleTask(materialObj.task_id).then(setTask);
  }, [materialObj.task_id]);

  const handleDeleteMaterial = () => {
    if (window.confirm(`Are you sure you want to delete "${materialObj.material_name}"? This task cannot be undone.`)) {
      deleteMaterial(materialObj.firebaseKey).then(onChange);
    }
  };

  return (
    <Card className={cardStyles.card}>
      <Card.Body>
        <Row>
          <Col>
            <Link passHref href={`/material/${materialObj.firebaseKey}`}>
              <Card.Link className={cardStyles.cardLink}>{materialObj.material_name}</Card.Link>
            </Link>
          </Col>
          <Col>
            <Card.Text className={cardStyles.cardText}>Status: {materialObj.acquired ? 'Acquired' : 'Not Acquired'}</Card.Text>
          </Col>
          <Col>
            <Card.Text className={cardStyles.cardText}>Task: {task.task_name ? task.task_name : 'Not assigned'}</Card.Text>
          </Col>
          <Col className={cardStyles.cardDropdown}>
            <Dropdown>
              <Dropdown.Toggle className={cardStyles.cardActionsBtn} variant="success" />
              <Dropdown.Menu className={cardStyles.dropdownMenu}>
                <Link passHref href={`/material/${materialObj.firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Details</Dropdown.Item>
                </Link>
                <Link passHref href={`/material/edit/${materialObj.firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item className={cardStyles.dropdownItem} onClick={handleDeleteMaterial}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

MaterialCard.propTypes = {
  materialObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    project_id: PropTypes.string,
    task_id: PropTypes.string,
    material_name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    acquired: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
