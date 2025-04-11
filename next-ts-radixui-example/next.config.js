/** @type {import('next').NextConfig} */
const config =  {
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Module not found: Can't resolve 'msw/browser' が解決するまで
  experimental: {
    turbo: {
      resolveAlias: {
        'msw/browser': 'node_modules/msw/lib/browser',
        'msw/node': 'node_modules/msw/lib/node',
      },
    },
  },
};

module.exports = config;
