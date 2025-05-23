import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
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
  // eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === 'true',
})(config);
