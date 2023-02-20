import Head from 'next/head';
import React from 'react';
import ProjectForm from '../../components/ProjectForm/ProjectForm';

export default function AddProjectPage() {
  return (
    <>
      <Head>
        <title>Add New Project</title>
      </Head>
      <ProjectForm />
    </>
  );
}
