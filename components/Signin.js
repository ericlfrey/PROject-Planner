import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from '../utils/auth';
import logo from '../public/images/logo.png';

function Signin() {
  return (
    <div className="signin-div">
      <Image src={logo} className="logo" />
      <Link passHref href="/">
        <button
          type="button"
          className="signin-btn"
          onClick={signIn}
        >
          Sign In
        </button>
      </Link>
    </div>
  );
}

export default Signin;
