import Head from 'next/head';
import React from 'react';
import TaskForm from '../../../components/TaskForm/TaskForm';

export default function EditTaskPage() {
  return (
    <>
      <Head>
        <title>Edit Dynamic Task</title>
      </Head>
      <TaskForm />
    </>
  );
}
