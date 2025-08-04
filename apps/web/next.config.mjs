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
  experimental: {
    optimizePackageImports: ["@ton/ton", "three", "vanta", "chart.js"],
  },
  transpilePackages: [
    // Само безбедни пакети
    '@melektron/ai-core',
    '@melektron/ton-utils'
  ],
  webpack: (config, { isServer }) => {
    // Игнориши quantum-core током билда
    config.externals = [...(config.externals || []), '@melektron/quantum-core'];

    // Додај fallback за квантни модул
    import('path').then(path => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@melektron/quantum-core': path.resolve('./quantum-fallback.js')
      };
    });

    return config;
  }
};

export default nextConfig;