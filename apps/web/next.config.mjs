import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "melektron.ai" },
      { protocol: "https", hostname: "ton.org" }
    ]
  },
  transpilePackages: [
    '@melektron/ai-core',
    '@melektron/ton-utils',
    '@melektron/quantum-core',
    '@tonconnect/ui-react',
    '@ton/core'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: path.resolve(__dirname, 'node_modules/encoding'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
      crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
      http: path.resolve(__dirname, 'node_modules/stream-http'),
      https: path.resolve(__dirname, 'node_modules/https-browserify'),
      os: path.resolve(__dirname, 'node_modules/os-browserify/browser'),
      path: path.resolve(__dirname, 'node_modules/path-browserify'),
      fs: false
    };

    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  }
};

export default nextConfig;