/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uklonite serverExternalPackages iz experimental sekcije
  serverExternalPackages: ['@melektron/quantum-core'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@melektron/quantum-core': require('path').resolve(__dirname, '../../packages/quantum-core'),
    };
    return config;
  },
};

module.exports = nextConfig;