/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectDetails({ project }) {
  const displayDate = new Date(project.date_created);
  const totalCost = project.projectMaterials?.map((material) => material.price).reduce((a, b) => a + b);
  return (
    <>
      <h1>{project.title}</h1>
      <h1>{displayDate.toLocaleDateString()}</h1>
      <h1>Total Estimated Costs: ${totalCost}</h1>
    </>
  );
}

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    date_created: PropTypes.string,
    projectMaterials: PropTypes.array,
  }).isRequired,
};
