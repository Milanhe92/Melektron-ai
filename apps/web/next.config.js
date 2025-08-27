/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@melektron/quantum-core',
    '@ton/core',
    '@ton/crypto',
    '@ton/ton',
    'ton-crypto'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        process: require.resolve('process/browser')
      };
    }
    return config;
  }
};

module.exports = nextConfig;