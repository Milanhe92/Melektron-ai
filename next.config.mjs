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
  ],
  // DODATO: Environment varijable
  env: {
    TON_API_KEY: process.env.TON_API_KEY,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    NODE_ENV: process.env.NODE_ENV
  }
};

export default nextConfig;