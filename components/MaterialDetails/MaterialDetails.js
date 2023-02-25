import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleMaterial } from '../../api/materialData';
import { getSingleProject } from '../../api/projectData';

export default function MaterialDetails({ firebaseKey }) {
  const [material, setMaterial] = useState({});
  const [project, setProject] = useState({});

  useEffect(() => {
    getSingleMaterial(firebaseKey).then(setMaterial);
    if (material.project_id) getSingleProject(material.project_id).then(setProject);
  }, [firebaseKey, material.project_id]);
  // Project Name, Material Name, whether or not it has been acquired, price, and quantity.
  const handleDeleteTask = () => {
    console.warn('Delete mfer');
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{material.material_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Project: {project.title}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{material.acquired ? 'Acquired' : 'Not Acquired'}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Price: {material.price}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Quantity: {material.quantity}</Card.Subtitle>

        <Link passHref href={`/material/edit/${firebaseKey}`}>
          <Card.Link href="#">Edit</Card.Link>
        </Link>
        <Card.Link href="#" onClick={handleDeleteTask}>Delete</Card.Link>
        {/* <Link passHref href={`/project/${task.project_id}`}> */}
        <Card.Link href="#">Go Back</Card.Link>
        {/* </Link> */}
      </Card.Body>
    </Card>
  );
}

MaterialDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
