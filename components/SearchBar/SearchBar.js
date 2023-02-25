import React from 'react';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';

export default function SearchBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="m-auto">
        <FormControl
          // className={styles.searchInput}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        // onChange={handleChange}
        // value={searchInput}
        />
        <Button type="submit">
          search
        </Button>
      </InputGroup>
    </Form>
  );
}
