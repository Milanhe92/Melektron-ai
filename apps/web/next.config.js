const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // OVO JE KLJUČNI DEO KOJI REŠAVA PROBLEM SA BUILD-OM
  // Kažemo Next.js-u da ne pokušava da "spakuje" ove module u server-side bundle,
  // jer sadrže nativni kod koji Vercel-ov bundler ne može da obradi.
  experimental: {
    serverExternalPackages: [
      '@melektron/quantum-core',
      '@melektron/ton-client',
    ],
  },

  // Čuvamo tvoju postojeću Webpack konfiguraciju za aliase i fallback-ove.
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
     ...config.resolve.alias,
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core'),
      '@melektron/ton-client': path.resolve(__dirname, '../../packages/ton-client'),
      '@melektron/ton-utils': path.resolve(__dirname, '../../packages/ton-utils'),
      '@melektron/ai-core': path.resolve(__dirname, '../../packages/ai-core'),
    };

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
};

// Stari 'next-transpile-modules' (withTM) više nije potreban na ovaj način.
// Moderne verzije Next.js-a imaju ugrađenu podršku za transpilaciju iz monorepo-a,
// a za specifičan problem sa nativnim modulima, `serverExternalPackages` je ispravno rešenje.
module.exports = nextConfig;
