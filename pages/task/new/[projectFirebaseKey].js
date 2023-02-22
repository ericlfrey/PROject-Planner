import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import TaskForm from '../../../components/TaskForm/TaskForm';

export default function AddTaskPage() {
  const router = useRouter();
  const { projectFirebaseKey } = router.query;
  return (
    <>
      <Head>
        <title>Add New Task</title>
      </Head>
      <TaskForm projectFirebaseKey={projectFirebaseKey} />
    </>
  );
}
