import withBundleAnalyzer from '@next/bundle-analyzer';
import { NextConfig } from 'next';
// const { i18n } = require('./next-i18next.config');

const config: NextConfig = {
  output: 'export',
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
