import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTask } from '../../api/taskData';
import TaskDetails from '../../components/Details/TaskDetails';

export default function ViewTaskPage() {
  const [task, setTask] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTask(firebaseKey).then(setTask);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{task.task_name}</title>
      </Head>
      <TaskDetails firebaseKey={firebaseKey} />
      <h4>Task Materials:</h4>
    </>
  );
}
