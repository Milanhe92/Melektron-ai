'use client';

import { useState } from 'react';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
  address: string;
  currency: string;
  icon: string;
}

export default function QRCodeDisplay({ address, currency, icon }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center p-4 bg-slate-800/50 rounded-xl">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-3">{currency}</h3>
      
      <div className="flex justify-center mb-3">
        <div className="bg-white p-2 rounded-lg">
          <QRCode value={address} size={100} level="H" includeMargin />
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-3 font-mono break-all">{address}</p>
      
      <button
        onClick={copyAddress}
        className="px-3 py-1 bg-cyan-600 rounded text-white text-sm hover:bg-cyan-700 transition-colors"
      >
        {copied ? '✓ Kopirano!' : 'Kopiraj'}
      </button>
    </div>
  );
}