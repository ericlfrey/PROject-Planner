/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { getUserProjects } from '../api/projectData';
import ProjectCard from '../components/Cards/ProjectCard';
import { useAuth } from '../utils/context/authContext';
import pagesStyles from '../styles/PagesStyles.module.css';

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
      <div className={pagesStyles.headingDiv}>
        <h4 className={pagesStyles.pageHeading}>{user.displayName}'s Projects:</h4>
      </div>
      {projects.length
        ? (
          <div className={pagesStyles.projectCardsDiv}>
            {projects.map((project) => (
              <ProjectCard
                key={project.firebaseKey}
                projectObj={project}
              />
            ))}
          </div>
        )
        : (
          <div className={pagesStyles.pageHeading}>
            <Link passHref href="/project/new">
              <Card.Link className={pagesStyles.link}> Add a Project?</Card.Link>
            </Link>
          </div>
        )}
    </>
  );
}

export default Home;
