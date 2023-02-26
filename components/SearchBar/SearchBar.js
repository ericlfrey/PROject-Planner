import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="m-auto">
        <FormControl
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
        />
        <Button type="submit">
          search
        </Button>
      </InputGroup>
    </Form>
  );
}
