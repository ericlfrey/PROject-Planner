import React from 'react';
import styles from './ProjectCard.module.css';

export default function ProjectCard() {
  return (
    <div>
      <h1 className={styles.cardHeading}>📒</h1>
      <h5>Project Title</h5>
    </div>
  );
}
