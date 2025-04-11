import './globals.css';

import '@aws-amplify/ui-react/styles.css';
import type { ReactNode } from 'react';

export default function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
