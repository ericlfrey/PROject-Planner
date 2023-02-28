/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllProjectsDetails } from '../../api/mergedData';
import ProjectCard from '../../components/Cards/ProjectCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchPage() {
  const [projects, setProjects] = useState([]);

  const { user } = useAuth();

  const router = useRouter();
  const { searchQuery } = router.query;

  useEffect(() => {
    getAllProjectsDetails(user.uid).then((allProjectsDetails) => {
      const filteredProjectsArr = allProjectsDetails.filter((project) => project.projectMaterials.some((material) => material.material_name.toLowerCase().includes(searchQuery))
        || project.projectTasks.some((task) => task.task_name.toLowerCase().includes(searchQuery))
        || project.title.toLowerCase().includes(searchQuery));
      setProjects(filteredProjectsArr);
      console.warn(filteredProjectsArr);
    });
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>Search for "{`${searchQuery}`}"</title>
      </Head>
      <h1>Search results for "{searchQuery}"</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {projects.map((project) => <ProjectCard key={project.firebaseKey} projectObj={project} />)}
      </div>
    </>
  );
}
