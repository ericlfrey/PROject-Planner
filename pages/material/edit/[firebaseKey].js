import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMaterial } from '../../../api/materialData';
import MaterialForm from '../../../components/MaterialForm/MaterialForm';

export default function EditMaterialPage() {
  const [material, setMaterial] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMaterial(firebaseKey).then(setMaterial);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>Edit Dynamic Material</title>
      </Head>
      <MaterialForm materialObj={material} projectFirebaseKey={material.project_id} />
    </>
  );
}
