// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ovo je ključna linija koja rešava problem.
    // Navedite tačna imena paketa kako su definisana u vašem package.json.
    serverExternalPackages:,
  },
};

module.exports = nextConfig;
