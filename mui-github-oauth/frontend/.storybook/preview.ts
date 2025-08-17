import type { Preview } from '@storybook/nextjs';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/styles/globals.css';

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
