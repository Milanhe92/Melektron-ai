// scripts/reset-dependencies.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting dependency reset...');

// 1. Remove node_modules and lock files
execSync('rm -rf node_modules apps/web/node_modules package-lock.json .turbo', { stdio: 'inherit' });

// 2. Recreate package-lock.json
execSync('npm install --legacy-peer-deps --package-lock-only', { stdio: 'inherit' });

// 3. Add internal packages explicitly
const internalPackages = [
  '@melektron/ai-core',
  '@melektron/quantum-core',
  '@melektron/ton-client',
  '@melektron/ton-utils'
];

internalPackages.forEach(pkg => {
  const path = pkg.replace('@melektron/', '');
  execSync(`npm install ./packages/${path} --no-save --legacy-peer-deps`, { stdio: 'inherit' });
});

console.log('✅ Dependency reset complete!');