/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

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
  
  // Environment variables
  env: {
    WALLET_MNEMONIC: process.env.WALLET_MNEMONIC,
  },
  
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
  
  webpack: (config, { isServer, dev }) => {
    // Resolve aliases for absolute imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/types': path.resolve(__dirname, 'src/types')
    };

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

    // Optimization for production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  }
};

module.exports = nextConfig;