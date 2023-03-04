import { useRouter } from 'next/router';
import React from 'react';
import styles from './GoBackBtn.module.css';

export default function GoBackBtn() {
  const router = useRouter();
  return (
    <button className={styles.goBackBtn} type="button" onClick={router.back}>← Go Back</button>
  );
}
