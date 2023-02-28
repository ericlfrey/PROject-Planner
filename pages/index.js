/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserProjects } from '../api/projectData';
import ProjectCard from '../components/Cards/ProjectCard';
import { useAuth } from '../utils/context/authContext';
import styles from '../styles/Home.module.css';

function Home() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserProjects(user.uid).then(setProjects);
  }, [user]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h4 className={styles.heading}>{user.displayName}'s Current Open Projects:</h4>
      <div className="d-flex flex-wrap justify-content-center">
        {projects.map((project) => (
          <ProjectCard
            key={project.firebaseKey}
            projectObj={project}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
