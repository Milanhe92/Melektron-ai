const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core'),
      '@melektron/ton-client': path.resolve(__dirname, '../../packages/ton-client'),
    };
    return config;
  },
};