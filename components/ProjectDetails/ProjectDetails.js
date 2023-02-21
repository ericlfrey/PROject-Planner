/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function ProjectDetails({ project }) {
  const displayDate = new Date(project.date_created);
  const totalCost = project.projectMaterials?.map((material) => material.price).reduce((a, b) => a + b);
  return (
    <>
      <Card>
        <Card.Header className="text-end">
          <Link passHref href={`./edit/${project.firebaseKey}`}>
            Edit
          </Link>
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
      {/* <h3>Project Name: {project.title}</h3>
      <h1>{displayDate.toLocaleDateString()}</h1> */}
      {/* <h1>Total Estimated Costs: ${totalCost}</h1> */}
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
