import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getTaskMaterials } from '../../api/materialData';
import { getSingleTask } from '../../api/taskData';
import MaterialCard from '../../components/Cards/MaterialCard';
import TaskDetails from '../../components/Details/TaskDetails';

export default function ViewTaskPage() {
  const [task, setTask] = useState({});
  const [materials, setMaterials] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTaskDetails = () => {
    getSingleTask(firebaseKey).then(setTask);
    getTaskMaterials(firebaseKey).then(setMaterials);
  };

  useEffect(() => {
    getTaskDetails();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{task.task_name}</title>
      </Head>
      <TaskDetails firebaseKey={firebaseKey} />
      {materials.length ? <h4>Task Materials:</h4> : ''}
      {materials.map((material) => (
        <MaterialCard
          key={material.firebaseKey}
          materialObj={material}
          onChange={getTaskDetails}
        />
      ))}
    </>
  );
}
