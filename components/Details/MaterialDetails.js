import React, { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteMaterial, getSingleMaterial } from '../../api/materialData';
import { getSingleProject } from '../../api/projectData';
import cardStyles from '../../styles/CardStyles.module.css';
import { getSingleTask } from '../../api/taskData';

export default function MaterialDetails({ firebaseKey }) {
  const [material, setMaterial] = useState({});
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});

  const router = useRouter();

  useEffect(() => {
    getSingleMaterial(firebaseKey).then(setMaterial);
    if (material.project_id) getSingleProject(material.project_id).then(setProject);
    if (material.task_id) getSingleTask(material.task_id).then(setTask);
  }, [firebaseKey, material.project_id, material.task_id]);

  const handleDeleteMaterial = () => {
    if (window.confirm(`Are you sure you want to delete "${material.material_name}"? This task cannot be undone.`)) {
      deleteMaterial(firebaseKey).then(router.push(`/project/${project.firebaseKey}`));
    }
  };

  return (
    <Card className={cardStyles.topCard}>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div className={cardStyles.cardHeader}>
            <h3>{material.material_name}</h3>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" className={cardStyles.cardActionsBtn}>
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu className={cardStyles.dropdownMenu}>
                <Link passHref href={`/material/edit/${firebaseKey}`}>
                  <Dropdown.Item className={cardStyles.dropdownItem}>Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item className={cardStyles.dropdownItem} onClick={handleDeleteMaterial}>Delete Task
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h5>Total Material Cost: ${(material.price * material.quantity).toFixed(2)}</h5>
          <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>Project: {project.title}</footer>
          <footer className={`${cardStyles.cardSubtitle} blockquote-footer mt-2`}>Task: {task.task_name}</footer>
          <hr />
          <Card.Text className={`${cardStyles.cardText} mt-2`}>Status: {material.acquired ? 'Acquired' : 'Not Acquired'}</Card.Text>
          <Card.Text className={`${cardStyles.cardText} mt-2`}>Price: ${material.price}</Card.Text>
          <Card.Text className={`${cardStyles.cardText} mt-2`}>Quantity: {material.quantity}</Card.Text>
          <Link passHref href={`/project/${material.project_id}`}>
            <Card.Link className={cardStyles.cardLink}> ← Go Back</Card.Link>
          </Link>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

MaterialDetails.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
};
