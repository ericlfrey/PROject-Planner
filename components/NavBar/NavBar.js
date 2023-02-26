/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../../utils/auth';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand">
            📒 PROject Planner
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <div className="nav-links">
              <li className="nav-item">
                <Link passHref href="/">
                  <a className="nav-link">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/project/new">
                  <a className="nav-link">
                    Add New Project
                  </a>
                </Link>
              </li>
            </div>
            <SearchBar />
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
