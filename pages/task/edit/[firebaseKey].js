import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTask } from '../../../api/taskData';
import TaskForm from '../../../components/Forms/TaskForm';

export default function EditTaskPage() {
  const [task, setTask] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTask(firebaseKey).then(setTask);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit {`${task.task_name}`}</title>
      </Head>
      <TaskForm taskObj={task} />
    </>
  );
}
