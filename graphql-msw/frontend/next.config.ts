import withBundleAnalyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  // Module not found: Can't resolve 'msw/browser' が解決するまで
  turbopack: {
    resolveAlias: {
      'msw/browser': 'node_modules/msw/lib/browser',
      'msw/node': 'node_modules/msw/lib/node',
    },
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
