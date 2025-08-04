/** @type {import('next').NextConfig} */
const nextConfig = {
  // Искључи проблематични пакет из билда
  transpilePackages: [
    '../../packages/ai-core',
    '../../packages/ton-utils'
  ],
  
  // Додај ово да заобиђеш проблеме
  webpack: (config) => {
    config.externals = [...config.externals, '@melektron/quantum-core'];
    return config;
  },
  
  // Остала подешавања
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  }
};

export default nextConfig;