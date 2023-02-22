import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProject } from '../../../api/projectData';
import TaskForm from '../../../components/TaskForm/TaskForm';

export default function AddTaskPage() {
  const [project, setProject] = useState({});

  const router = useRouter();
  const { projectFirebaseKey } = router.query;

  useEffect(() => {
    getSingleProject(projectFirebaseKey).then(setProject);
  }, [projectFirebaseKey]);
  return (
    <>
      <Head>
        <title>Add Task to {project.title}</title>
      </Head>
      <TaskForm projectFirebaseKey={projectFirebaseKey} />
    </>
  );
}
