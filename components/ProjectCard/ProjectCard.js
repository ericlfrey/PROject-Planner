import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ projectObj }) {
  return (
    <div>
      <h1 className={styles.cardHeading}>📒</h1>
      <h5>{projectObj.title}</h5>
    </div>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
