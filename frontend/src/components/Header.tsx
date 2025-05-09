import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Rag.dev</div>
      <nav className={styles.nav}>
        <a href="#" className={styles.link}>Chat</a>
        <a href="#" className={styles.link}>Context</a>
      </nav>
    </header>
  );
};

export default Header;