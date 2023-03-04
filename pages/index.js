/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
        {projects.length
          ? <h4 className={pagesStyles.pageHeading}>{user.displayName}'s Projects:</h4>
          : (
            <h2 className={pagesStyles.pageHeading}>Welcome, {user.displayName}. It looks like you have either gotten all your shit done, or you have some shit to get started! Do you want to
              <Link passHref href="/project/new">
                <span className={pagesStyles.link}> Add a Project?</span>
              </Link>
            </h2>
          )}
      </div>
      <div className={pagesStyles.projectCardsDiv}>
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
