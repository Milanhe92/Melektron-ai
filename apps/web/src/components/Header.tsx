import React from 'react';

const Header = () => (
  <header className="bg-gray-900 text-white py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Melektron AI</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/">Početna</a></li>
          <li><a href="/donacije">Donacije</a></li>
          <li><a href="/licenses">Licence</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;