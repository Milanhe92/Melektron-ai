// apps/web/next.config.mjs
const withTM = require('next-transpile-modules')([
  '@melektron/quantum-core',
  'three'
]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@ton/ton', 'three', 'vanta'],
    instrumentationHook: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  },
  output: 'standalone'
});

export default nextConfig;