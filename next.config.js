/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@melektron/quantum-core',
    '@melektron/ton-client',
    '@melektron/ai-core',
    '@melektron/ton-utils'
  ],
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    domains: ['gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
    ],
  },
  experimental: {
    externalDir: true,
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    };
    
    return config;
  }
};

module.exports = nextConfig;