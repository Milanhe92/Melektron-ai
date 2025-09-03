/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
  transpilePackages: [
    '@melektron/quantum-core',
    '@melektron/ton-client',
    '@melektron/ai-core',
    '@melektron/ton-utils', 
    'three'
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        net: false,
        tls: false,
        zlib: require.resolve('browserify-zlib'),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    return config;
  }
};

module.exports = nextConfig;