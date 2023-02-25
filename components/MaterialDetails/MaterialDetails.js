import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteMaterial, getSingleMaterial } from '../../api/materialData';
import { getSingleProject } from '../../api/projectData';

export default function MaterialDetails({ firebaseKey }) {
  const [material, setMaterial] = useState({});
  const [project, setProject] = useState({});

  const router = useRouter();

  useEffect(() => {
    getSingleMaterial(firebaseKey).then(setMaterial);
    if (material.project_id) getSingleProject(material.project_id).then(setProject);
  }, [firebaseKey, material.project_id]);

  const handleDeleteMaterial = () => {
    if (window.confirm(`Are you sure you want to delete "${material.material_name}"? This task cannot be undone.`)) {
      deleteMaterial(firebaseKey).then(router.push(`/project/${project.firebaseKey}`));
    }
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
        <Card.Link href="#" onClick={handleDeleteMaterial}>Delete</Card.Link>
        <Link passHref href={`/project/${material.project_id}`}>
          <Card.Link href="#">Go Back</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  );
}

MaterialDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
