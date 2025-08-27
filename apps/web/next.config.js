/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@melektron/quantum-core',
    '@ton/core',
    '@ton/crypto',
    '@ton/ton'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer')
    };
    return config;
  }
};

module.exports = nextConfig;