import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMaterial } from '../../api/materialData';
import MaterialDetails from '../../components/MaterialDetails/MaterialDetails';

export default function ViewMaterialPage() {
  const [material, setMaterial] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMaterial(firebaseKey).then(setMaterial);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{material.material_name}</title>
      </Head>
      <MaterialDetails firebaseKey={firebaseKey} />
    </>
  );
}
