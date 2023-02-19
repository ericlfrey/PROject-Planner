import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ projectObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className={styles.cardHeading}>📒</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{projectObj.title}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
