/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProjectDetails } from '../../api/mergedData';
import { getProjectMaterials } from '../../api/materialData';
import styles from './ProjectDetails.module.css';

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
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <blockquote className="blockquote mb-0">
            <div className={styles.cardHeader}>
              <h3>{project.title}</h3>
              <Dropdown>
                <Dropdown.Toggle variant="outline-success" className={styles.cardActionsBtn}>
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link passHref href={`./edit/${project.firebaseKey}`}>
                    <Dropdown.Item>Edit Project Name</Dropdown.Item>
                  </Link>
                  <Dropdown.Item>Add Task</Dropdown.Item>
                  <Dropdown.Item>Add Material</Dropdown.Item>
                  <Card.Link onClick={handleDelete}>
                    <Dropdown.Item>Delete Project</Dropdown.Item>
                  </Card.Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <footer className={`${styles.cardSubtitle} blockquote-footer mt-2`}>
              Date Added: {displayDate.toLocaleDateString()}
            </footer>
            <footer className={`${styles.cardSubtitle} blockquote-footer`}>
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
