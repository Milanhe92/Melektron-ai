import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6 mt-auto">
    <div className="container mx-auto px-4">
      <p className="text-center">
        © {new Date().getFullYear()} Melektron AI. Sva prava zadržana.
      </p>
    </div>
  </footer>
);

export default Footer;