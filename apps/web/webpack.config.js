const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@melektron/quantum-core': path.resolve(__dirname, '../../packages/quantum-core')
    }
  }
};