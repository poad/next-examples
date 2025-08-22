import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
};

export default withBundleAnalyzer({
  enabled: import.meta.env.ANALYZE === 'true',
})(config);
