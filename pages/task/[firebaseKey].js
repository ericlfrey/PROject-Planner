import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleProject } from '../../api/projectData';
import { getSingleTask } from '../../api/taskData';

export default function ViewTaskPage() {
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTask(firebaseKey).then(setTask);
    if (task.project_id) getSingleProject(task.project_id).then(setProject);
  }, [firebaseKey, task.project_id]);

  // These details should include: Project Name, Task Name, Status, Details, and Date info.
  return (
    <>
      <Head>
        <title>{task.task_name}</title>
      </Head>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{task.task_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Project: {project.title}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Date Created: {new Date(task.date_created).toLocaleDateString()}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{task.due_date ? `Due Date: ${task.due_date}` : 'No due date'}</Card.Subtitle>
          <Card.Text>{task.details}</Card.Text>
          <Card.Link href="#">Edit</Card.Link>
          <Card.Link href="#">Delete</Card.Link>
          <Card.Link href="#">Go Back</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}
