// apps/web/src/components/Footer.tsx
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto px-4">
      <p>© {new Date().getFullYear()} Melektron AI. Sva prava zadržana.</p>
    </div>
  </footer>
);

export default Footer;