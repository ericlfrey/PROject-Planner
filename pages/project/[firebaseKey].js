/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getProjectDetails } from '../../api/mergedData';
import MaterialCard from '../../components/MaterialCard/MaterialCard';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import TaskCard from '../../components/TaskCard/TaskCard';

export default function ViewProjectPage() {
  const [project, setProject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getProjectDetails(firebaseKey).then(setProject);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>
      <ProjectDetails project={project} />
      <hr />
      <h2>tasks:</h2>
      <Link passHref href={`/task/new/${firebaseKey}`}>
        <Button>Add Task</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {project.projectTasks?.map((task) => <TaskCard key={task.firebaseKey} taskObj={task} />)}
      </div>
      <hr />
      <h2>materials:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {project.projectMaterials?.map((material) => <MaterialCard key={material.firebaseKey} materialObj={material} />)}
      </div>
    </>
  );
}
