/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@ton/ton', 'three', 'vanta']
  },
  output: process.env.DOCKER_BUILD? 'standalone' : undefined,
};

export default nextConfig;