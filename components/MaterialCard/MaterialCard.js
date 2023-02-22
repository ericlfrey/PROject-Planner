import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MaterialCard({ materialObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{materialObj.material_name}</Card.Title>
        <Link passHref href={`/material/${materialObj.firebaseKey}`}>
          <Card.Link href="#">View</Card.Link>
        </Link>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
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
    price: PropTypes.number,
    quantity: PropTypes.number,
    acquired: PropTypes.bool,
  }).isRequired,
};
