import React from 'react';
import {
  Card, Col, Dropdown, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMaterial } from '../../api/materialData';
import cardStyles from '../../styles/CardStyles.module.css';

export default function MaterialCard({ materialObj, onChange }) {
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
            <Card.Text>Status: {materialObj.acquired ? 'Acquired' : 'Not Acquired'}</Card.Text>
          </Col>
          <Col>
            <Card.Text>Task Name</Card.Text>
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
    //     <Link passHref href={`/material/${materialObj.firebaseKey}`}>
    //     <Card.Link href="#">View</Card.Link>
    //   </Link>
    // <Link passHref href={`/material/edit/${materialObj.firebaseKey}`}>
    //     <Card.Link href="#">Edit</Card.Link>
    //   </Link>
    // <Card.Link href="#" onClick={handleDeleteMaterial}>Delete</Card.Link>
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
