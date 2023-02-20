/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProject } from '../../api/projectData';

export default function ViewProjectPage() {
  const [project, setProject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const displayDate = new Date(project.date_created);

  useEffect(() => {
    getSingleProject(firebaseKey).then(setProject);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>
      <h1>{project.title}</h1>
      <h1>{displayDate.toLocaleDateString()}</h1>
    </>
  );
}
