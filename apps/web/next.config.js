/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@melektron/quantum-core'],
  webpack: (config) => {
    config.resolve.alias = {
    ...config.resolve.alias,
      '@melektron/quantum-core': require('path').resolve(__dirname, '../../packages/quantum-core'),
    };
    return config;
  },
};

module.exports = nextConfig;
