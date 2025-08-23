import path from "path";
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
    "@melektron/ai-core",
    "@melektron/ton-utils",
    "@melektron/quantum-core"
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
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      '@ton/core',
      '@melektron/quantum-core'
    ]
  }
};
export default nextConfig;