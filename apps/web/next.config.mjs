import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" }
    ],
  },
  transpilePackages: [
    "@melektron/ai-core",
    "@melektron/ton-utils",
    "@melektron/quantum-core",
    "@melektron/ton-client"
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core'),
      '@melektron/ton-client': path.resolve(__dirname, '../../packages/ton-client'),
    };
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  // Next 15: stabilno ime opcije (ranije experimental.serverComponentsExternalPackages)
  serverExternalPackages: [
    '@ton/core',
    '@ton/ton',
    '@ton/crypto',
    '@melektron/quantum-core'
  ],
  experimental: {
    // ostavljamo loose ESM jer imaš mešavinu CJS/ESM u paketićima
    esmExternals: 'loose'
  }
};

export default nextConfig;