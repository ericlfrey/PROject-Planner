import React from 'react';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logo from '../public/images/logo.png';

function Signin() {
  return (
    <div
      className="signin-div"
    // style={{
    //   height: '90vh',
    //   padding: '30px',
    //   maxWidth: '400px',
    //   margin: '0 auto',
    // }}
    >
      <Image src={logo} className="logo" />
      <button type="button" className="signin-btn" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
