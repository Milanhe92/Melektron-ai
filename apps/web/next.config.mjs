/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    optimizePackageImports: [
      '@ton/ton', 
      'three', 
      'vanta',
      'chart.js'
    ],
    instrumentationHook: true,
    outputFileTracingIncludes: {
      '/*': ['./packages/**/*']
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  },
  output: 'standalone',
  transpilePackages: [
    '../../packages/quantum-core',
    '../../packages/ai-core',
    '../../packages/ton-utils'
  ]
};

export default nextConfig;