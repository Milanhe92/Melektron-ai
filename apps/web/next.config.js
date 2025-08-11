const path = require('path');
const withTM = require('next-transpile-modules')([
  '@melektron/quantum-core',
  '@melektron/ton-client',
]);

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Dodajte alias-e za sve monorepo pakete
    config.resolve.alias = {
      ...config.resolve.alias,
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core'),
      '@melektron/ton-client': path.resolve(__dirname, '../../packages/ton-client'),
      '@melektron/ton-utils': path.resolve(__dirname, '../../packages/ton-utils'),
      '@melektron/ai-core': path.resolve(__dirname, '../../packages/ai-core'),
    };

    // Dodajte podešavanja za Three.js i kvantne module
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: 'file-loader',
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },
});