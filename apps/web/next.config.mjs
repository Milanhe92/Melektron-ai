/** @type {import('next').NextConfig} */
process.env.__NEXT_DISABLE_BABEL = 'true'; // OVO JE KLJUČNO

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
  },
  experimental: {
    swcMinify: true,
    forceSwcTransforms: true
  }
};

export default nextConfig;