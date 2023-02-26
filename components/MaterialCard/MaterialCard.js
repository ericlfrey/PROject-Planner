import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMaterial } from '../../api/materialData';

export default function MaterialCard({ materialObj, onChange }) {
  const handleDeleteMaterial = () => {
    if (window.confirm(`Are you sure you want to delete "${materialObj.material_name}"? This task cannot be undone.`)) {
      deleteMaterial(materialObj.firebaseKey).then(onChange);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{materialObj.material_name}</Card.Title>
        <Link passHref href={`/material/${materialObj.firebaseKey}`}>
          <Card.Link href="#">View</Card.Link>
        </Link>
        <Link passHref href={`/material/edit/${materialObj.firebaseKey}`}>
          <Card.Link href="#">Edit</Card.Link>
        </Link>
        <Card.Link href="#" onClick={handleDeleteMaterial}>Delete</Card.Link>
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
