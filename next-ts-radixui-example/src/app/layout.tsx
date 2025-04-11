'use client';
import type { ReactNode } from 'react';
import './globals.css';

export default function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
