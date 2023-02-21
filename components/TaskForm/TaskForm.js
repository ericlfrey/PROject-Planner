import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function TaskForm() {
  return (
    <>
      <h1>Task Form</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Task Name</Form.Label>
          <Form.Control type="text" placeholder="Task Name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
