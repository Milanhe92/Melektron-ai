/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  transpilePackages: [
    '@melektron/ai-core',
    '@melektron/ton-utils'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@melektron/quantum-core': false
    };
    return config;
  }
};

export default nextConfig;