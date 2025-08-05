import { useTonWallet } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/core';
import { useTonConnect } from '@/hooks/useTonConnect';
import { useState } from 'react';

export default function DonationWidget() {
  const wallet = useTonWallet();
  const { sender } = useTonConnect();
  const [donationAmount, setDonationAmount] = useState('1');
  const [message, setMessage] = useState('');

  const handleDonate = async () => {
    if (!wallet) {
      setMessage('Povežite novčanik prvo!');
      return;
    }

    try {
      await sender.send({
        to: Address.parse('EQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF'),
        value: toNano(donationAmount),
      });
      setMessage('Donacija uspešno poslata! Hvala!');
    } catch (error) {
      console.error('Greška pri donaciji:', error);
      setMessage('Došlo je do greške pri donaciji');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-800 rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Podržite naš projekat</h3>
      
      <div className="mb-4">
        <label className="block text-white mb-2">Iznos donacije (TON)</label>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-blue-700 text-white placeholder-blue-300"
          min="0.1"
          step="0.1"
        />
      </div>

      <button
        onClick={handleDonate}
        disabled={!wallet}
        className={`w-full py-3 px-6 rounded-lg font-bold ${
          wallet
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
            : 'bg-gray-500 cursor-not-allowed'
        } text-white transition-all`}
      >
        {wallet ? 'Donirajte sada' : 'Povežite novčanik'}
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('uspešno') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
        }`}>
          {message}
        </div>
      )}

      <p className="text-blue-200 text-sm mt-4">
        Vaša donacija će biti korišćena za dalji razvoj platforme i održavanje mreže.
      </p>
    </div>
  );
}