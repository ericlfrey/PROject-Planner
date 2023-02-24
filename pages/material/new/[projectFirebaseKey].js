import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleProject } from '../../../api/projectData';
import MaterialForm from '../../../components/MaterialForm/MaterialForm';

export default function AddMaterialPage() {
  const [project, setProject] = useState({});

  const router = useRouter();
  const { projectFirebaseKey } = router.query;

  useEffect(() => {
    getSingleProject(projectFirebaseKey).then(setProject);
  }, [projectFirebaseKey]);

  return (
    <>
      <Head>
        <title>Add Material to {project.title}</title>
      </Head>
      <MaterialForm projectFirebaseKey={projectFirebaseKey} />
    </>
  );
}
