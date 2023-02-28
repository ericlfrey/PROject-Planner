/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../../styles/ProjectCard.module.css';

export default function ProjectCard({ projectObj }) {
  return (
    <Card className={styles.card}>
      <Card.Body className={styles.cardBody}>
        <Link passHref href={`/project/${projectObj.firebaseKey}`}>
          <Card.Link className={styles.cardHeading}>📒</Card.Link>
        </Link>
        <Link passHref href={`/project/${projectObj.firebaseKey}`}>
          <Card.Link className={styles.projectName}>{projectObj.title}</Card.Link>
        </Link>
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
