import { useRouter } from 'next/router';
import React from 'react';
import AddUserToProject from '../../components/AddUserToProject';

export default function AddUserToProjectPage() {
  const router = useRouter();

  const { projectFirebaseKey } = router.query;

  return (
    <AddUserToProject projectFirebaseKey={projectFirebaseKey} />
  );
}
