/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getProjectDetails } from '../../api/mergedData';
import TaskCard from '../../components/TaskCard/TaskCard';

export default function ViewProjectPage() {
  const [project, setProject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const displayDate = new Date(project.date_created);

  useEffect(() => {
    getProjectDetails(firebaseKey).then(setProject);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>
      <h1>{project.title}</h1>
      <h1>{displayDate.toLocaleDateString()}</h1>
      <hr />
      <h2>tasks:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {project.projectTasks?.map((task) => <TaskCard key={task.firebaseKey} taskObj={task} />)}
      </div>
      <hr />
      <h2>materials:</h2>
      {project.projectMaterials?.map((material) => <h3>{material.material_name}</h3>)}
    </>
  );
}
