'use client';

import { useState, useEffect } from 'react';

export default function MilanSignature() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-cyan-400 overflow-hidden">
            <img 
              src="https://www.gravatar.com/avatar/23e6717a6d88f3438a088656a1b26d1e?s=512&d=mp" 
              alt="Milan He"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-cyan-400 mb-1">Milan He</h3>
          <p className="text-xs text-gray-300 mb-2">Glavni Arhitekta</p>
          <div className="flex justify-center space-x-2">
            <a href="https://github.com/Milanhe92" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-sm">GitHub</span>
            </a>
            <a href="https://t.me/Milanhe92" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-sm">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}