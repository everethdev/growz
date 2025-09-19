'use client';
import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Index({ index, title, logo, metadata }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.project}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.logoContainer}>
        <motion.div
          className={styles.logoWrapper}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={`/images/${logo}`}
            alt={`${title} logo`}
            width={120}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.categoryBadge}>
          <span>{metadata[0]}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metadataContainer}>
          {metadata.slice(1).map((item, idx) => (
            <span key={idx} className={styles.metadataTag}>
              {item}
            </span>
          ))}
        </div>
        <motion.div
          className={styles.arrow}
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
