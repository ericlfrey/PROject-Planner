/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getProjectDetails } from '../../api/mergedData';
import MaterialCard from '../../components/Cards/MaterialCard';
import TaskCard from '../../components/Cards/TaskCard';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';

export default function ViewProjectPage() {
  const [project, setProject] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheProjectDetails = () => {
    getProjectDetails(firebaseKey).then(setProject);
  };

  useEffect(() => {
    getTheProjectDetails();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>
      <ProjectDetails project={project} />
      <hr />
      <h2>tasks:</h2>
      <div className="mb-5">
        {project.projectTasks?.map((task) => (
          <TaskCard
            key={task.firebaseKey}
            taskObj={task}
            onChange={getTheProjectDetails}
          />
        ))}
      </div>
      {/* <hr /> */}
      <h2>materials:</h2>
      <div>
        {project.projectMaterials?.map((material) => (
          <MaterialCard
            key={material.firebaseKey}
            materialObj={material}
            onChange={getTheProjectDetails}
          />
        ))}
      </div>
    </>
  );
}
