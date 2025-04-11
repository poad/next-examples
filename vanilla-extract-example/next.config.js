import { createVanillaExtractPlugin as withVanillaExtract } from '@vanilla-extract/next-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withVanillaExtract()(nextConfig));
