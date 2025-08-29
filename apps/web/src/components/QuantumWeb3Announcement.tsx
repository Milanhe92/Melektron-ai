'use client';

import { useState, useEffect } from 'react';

export default function QuantumWeb3Announcement() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 6,
    minutes: 33,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-3xl p-8 border border-cyan-500/30 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
        ⚡ Quantum Web3 Experience Coming Soon!
      </h2>
      
      <p className="text-xl text-gray-300 mb-8">
        Revolucionarna integracija blockchain tehnologije u kvantni ekosistem
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-slate-800/50 rounded-xl">
          <div className="text-2xl">🎯</div>
          <h3 className="font-semibold mt-2">TON Staking</h3>
          <p className="text-sm text-gray-400">Do 42.3% APY</p>
        </div>
        
        <div className="text-center p-4 bg-slate-800/50 rounded-xl">
          <div className="text-2xl">🔗</div>
          <h3 className="font-semibold mt-2">Multi-Chain</h3>
          <p className="text-sm text-gray-400">10+ blockchain mreža</p>
        </div>
        
        <div className="text-center p-4 bg-slate-800/50 rounded-xl">
          <div className="text-2xl">🛡️</div>
          <h3 className="font-semibold mt-2">Quantum Security</h3>
          <p className="text-sm text-gray-400">Kvantna enkripcija</p>
        </div>
      </div>

      <div className="countdown mb-6">
        <p className="text-gray-300 mb-2">Launch za:</p>
        <div className="flex justify-center gap-4 text-2xl font-mono">
          <span className="bg-slate-800/50 px-4 py-2 rounded">{timeLeft.days}d</span>
          <span className="bg-slate-800/50 px-4 py-2 rounded">{timeLeft.hours}h</span>
          <span className="bg-slate-800/50 px-4 py-2 rounded">{timeLeft.minutes}m</span>
          <span className="bg-slate-800/50 px-4 py-2 rounded">{timeLeft.seconds}s</span>
        </div>
      </div>

      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
        Obavesti me kada bude spremno!
      </button>
    </div>
  );
}