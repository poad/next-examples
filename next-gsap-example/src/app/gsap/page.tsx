'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

import Gsap from '@/components/Gsap';

export default function gsap() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          <Gsap />
        </div>
        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            <h2 className={inter.className}>
              Home <span>-&gt;</span>
            </h2>
          </Link>
        </div>
      </main>
    </>
  );
}
