/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "melektron.ai",
      },
      {
        protocol: "https",
        hostname: "ton.org",
      }
    ],
  },
  transpilePackages: [
    '@melektron/ai-core',
    '@melektron/ton-utils',
    '@melektron/quantum-core',
    '@tonconnect/ui-react',
    '@ton/core'
  ],
  webpack: (config, { isServer }) => {
    // Dodaj encoding polyfill
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: require.resolve('encoding'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      fs: false
    };

    // Dodaj za ESM pakete
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      '@ton/core',
      '@melektron/quantum-core',
      'encoding',
      'node-fetch'
    ]
  }
};

export default nextConfig;