/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserProjects } from '../api/projectData';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserProjects(user.uid).then(setProjects);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="d-flex flex-wrap justify-content-center">
        {projects.map((project) => <ProjectCard key={project.firebaseKey} projectObj={project} />)}
      </div>
    </>
  );
}

export default Home;
