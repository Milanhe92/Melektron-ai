import { useTonWallet } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/core';
import { useTonConnect } from '@/hooks/useTonConnect';

export default function DonationWidget() {
  const wallet = useTonWallet();
  const { sender } = useTonConnect();
  
  const donate = async (amount: number) => {
    if (!wallet) return;
    
    await sender.send({
      to: Address.parse('EQCD...your-wallet-address'),
      value: toNano(amount.toString())
    });
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl mb-4">Podržite razvoj!</h3>
      <div className="flex gap-2 justify-center">
        {[1, 5, 10].map(amount => (
          <button 
            key={amount}
            onClick={() => donate(amount)}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition"
            disabled={!wallet}
          >
            {amount} TON
          </button>
        ))}
      </div>
      {!wallet && (
        <p className="mt-3 text-orange-400">
          Spoji TON novčanik da doniraš
        </p>
      )}
    </div>
  )
}