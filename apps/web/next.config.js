const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@melektron/quantum-core'],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
     ...config.resolve.alias,
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core'),
    };
    return config;
  },
};

module.exports = nextConfig;
