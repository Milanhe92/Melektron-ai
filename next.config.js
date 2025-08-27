/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@melektron/quantum-core'],
  output: 'standalone', // 🚨 BITNO ZA RENDER!
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true // 🚨 BITNO ZA STATIČKI DEPLOY
  },
  // Dodaj za monorepo support
  experimental: {
    externalDir: true
  }
};

module.exports = nextConfig;