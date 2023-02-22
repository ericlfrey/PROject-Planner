/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProjectDetails } from '../../api/mergedData';
import { getProjectMaterials } from '../../api/materialData';

export default function ProjectDetails({ project }) {
  const [materials, setMaterials] = useState([]);
  const router = useRouter();
  const displayDate = new Date(project.date_created);

  useEffect(() => {
    getProjectMaterials(project.firebaseKey).then(setMaterials);
  }, [project]);
  const totalCost = materials.length > 0 ? materials.map((material) => material.price).reduce((a, b) => a + b) : '0';
  // const totalCost = materials.map((material) => material.price).reduce((a, b) => a + b);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the Project?')) {
      deleteProjectDetails(project.firebaseKey).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="text-end">
          <Link passHref href={`./edit/${project.firebaseKey}`}>
            Edit
          </Link>
          <Card.Link onClick={handleDelete}> Delete
          </Card.Link>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <h3>{project.title}</h3>
            <footer className="blockquote-footer mt-2">
              Date Added: {displayDate.toLocaleDateString()}
            </footer>
            <footer className="blockquote-footer">
              Total Estimated Costs: ${totalCost}
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
}

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    date_created: PropTypes.string,
    projectMaterials: PropTypes.array,
  }).isRequired,
};
