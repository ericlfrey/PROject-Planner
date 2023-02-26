import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import Image from 'next/image';
import styles from './SearchBar.module.css';
import searchWhite from '../../public/images/searchWhite.png';

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
          className={styles.searchBar}
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
        />
        <Button type="submit" className={styles.searchBtn} id="searchBtn">
          <Image src={searchWhite} alt="search icon" height={20} width={20} />
        </Button>
      </InputGroup>
    </Form>
  );
}
