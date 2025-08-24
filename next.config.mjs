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
    '@melektron/ai-core',
    '@melektron/ton-utils'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Dodaj ovo za @ton/core specifično
      '@ton/core': require.resolve('@ton/core'),
      // Ostali paketi
      '@melektron/quantum-core': false
    };
    
    // Dodaj za ESM pakete
    config.experiments = { ...config.experiments, topLevelAwait: true };
    
    return config;
  },
  // Dodaj za Vercel optimizaciju
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['@ton/core', '@melektron/quantum-core']
  }
};

export default nextConfig;