import Head from 'next/head';
import React from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';

export default function AddTaskPage() {
  return (
    <>
      <Head>
        <title>Add New Task</title>
      </Head>
      <TaskForm />
    </>
  );
}
