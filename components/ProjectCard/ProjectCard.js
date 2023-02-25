/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ projectObj }) {
  return (
    <Link passHref href={`/project/${projectObj.firebaseKey}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className={styles.cardHeading}>📒</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{projectObj.title}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
