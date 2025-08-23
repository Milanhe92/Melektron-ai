/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove appDir as it's deprecated in Next.js 14
    // appDir is now default
  },
  transpilePackages: [
    "@melektron/quantum-core",
    "@melektron/ai-core", 
    "@melektron/ton-client",
    "@melektron/ton-utils"
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    return config;
  },
}

module.exports = nextConfig