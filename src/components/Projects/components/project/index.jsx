'use client';
import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';

export default function Index({ index, title, manageModal, logo, metadata }) {
  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <div className={styles.logoContainer}>
        <Image
          src={`/images/${logo}`}
          alt={`${title} logo`}
          width={100} 
          height={50} 
          style={{ objectFit: 'contain' }} 
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.metadata}>{metadata.join(' | ')}</p>
      </div>
    </div>
  );
}
