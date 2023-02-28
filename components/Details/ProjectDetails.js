/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProjectDetails } from '../../api/mergedData';
import { getProjectMaterials } from '../../api/materialData';
// import styles from './ProjectDetails.module.css';
import cardStyles from '../../styles/CardStyles.module.css';

export default function ProjectDetails({ project }) {
  const [materials, setMaterials] = useState([]);

  const router = useRouter();

  const displayDate = new Date(project.date_created);
  const totalCost = materials.length > 0
    ? materials.map((material) => material.price * material.quantity)
      .reduce((a, b) => a + b)
      .toFixed(2)
    : '0';

  useEffect(() => {
    getProjectMaterials(project.firebaseKey).then(setMaterials);
  }, [project]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This task cannot be undone.`)) {
      deleteProjectDetails(project.firebaseKey).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Card className={cardStyles.topCard}>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <div className={cardStyles.cardHeader}>
              <h3>{project.title}</h3>
              <Dropdown>
                <Dropdown.Toggle variant="outline-success" className={cardStyles.cardActionsBtn}>
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu className={cardStyles.dropdownMenu}>
                  <Link passHref href={`/project/edit/${project.firebaseKey}`}>
                    <Dropdown.Item className={cardStyles.dropdownItem}>Edit Project Name</Dropdown.Item>
                  </Link>
                  <Link passHref href={`/task/new/${project.firebaseKey}`}>
                    <Dropdown.Item className={cardStyles.dropdownItem}>Add Task</Dropdown.Item>
                  </Link>
                  <Link passHref href={`/material/new/${project.firebaseKey}`}>
                    <Dropdown.Item className={cardStyles.dropdownItem}>Add Material</Dropdown.Item>
                  </Link>
                  <Dropdown.Item className={cardStyles.dropdownItem} onClick={handleDelete}>Delete Project</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>
              Date Added: {displayDate.toLocaleDateString()}
            </footer>
            <footer className={`${cardStyles.cardSubtitle} blockquote-footer`}>
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
