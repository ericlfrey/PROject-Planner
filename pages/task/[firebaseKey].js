import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTask } from '../../api/taskData';
import TaskDetails from '../../components/TaskDetails/TaskDetails';

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
    </>
  );
}
