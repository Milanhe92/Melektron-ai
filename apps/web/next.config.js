/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: [
    '@melektron/quantum-core',
    '@melektron/ai-core', 
    '@melektron/ton-utils'
  ],
  webpack: (config) => {
    // Dodaj fallback za Node.js moduli
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }
    return config
  }
}

module.exports = nextConfig