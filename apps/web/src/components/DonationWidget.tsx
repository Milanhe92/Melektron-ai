'use client';

import { useTonWallet } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/core';
import { useTonConnect } from '@/hooks/useTonConnect';
import { useState } from 'react';

export default function DonationWidget() {
  const wallet = useTonWallet();
  const { sender, connected } = useTonConnect();
  const [donationAmount, setDonationAmount] = useState('1');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!connected || !wallet) {
      setMessage('Povežite novčanik prvo!');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await sender.send({
        to: Address.parse('EQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF'),
        value: toNano(donationAmount),
      });
      
      setMessage('Donacija uspešno poslata! Hvala na podršci!');
      setDonationAmount('1');
    } catch (error) {
      console.error('Greška pri donaciji:', error);
      setMessage('Došlo je do greške: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-800 rounded-xl p-6 shadow-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Podržite naš projekat</h3>
      
      <div className="mb-4">
        <label className="block text-white mb-2 text-center">Iznos donacije (TON)</label>
        <div className="relative">
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full p-3 rounded-lg bg-blue-700 text-white text-center text-lg font-bold"
            min="0.1"
            step="0.1"
            disabled={isLoading}
          />
          <span className="absolute right-3 top-3 text-white">TON</span>
        </div>
      </div>

      <button
        onClick={handleDonate}
        disabled={!connected || isLoading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg ${
          connected && !isLoading
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
            : 'bg-gray-500 cursor-not-allowed'
        } text-white transition-all duration-300 transform hover:scale-105`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Slanje...
          </span>
        ) : connected ? (
          'Donirajte sada'
        ) : (
          'Povežite novčanik'
        )}
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          message.includes('uspešno') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
        }`}>
          {message}
        </div>
      )}

      <p className="text-blue-200 text-sm mt-4 text-center">
        Vaša donacija će biti korišćena za dalji razvoj platforme i održavanje mreže.
      </p>
    </div>
  );
}