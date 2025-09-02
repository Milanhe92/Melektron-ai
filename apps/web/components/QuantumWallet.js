// apps/web/components/QuantumWallet.js
'use client';

import React, { useState, useEffect } from 'react';
import { connectWallet, getTokenBalance, getNetworkId } from '../utils/web3';
import MLTRNToken from '../../contracts/MLTRNToken.json';

const QuantumWallet = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('');

  const loadBlockchainData = async () => {
    try {
      const acc = await connectWallet();
      if (acc) {
        setAccount(acc);

        const networkId = await getNetworkId();
        setNetwork(getNetworkName(networkId));

        const tokenContract = new web3.eth.Contract(
          MLTRNToken.abi,
          MLTRNToken.networks[networkId]?.address
        );

        if (tokenContract) {
          const bal = await getTokenBalance(tokenContract, acc);
          setBalance(web3.utils.fromWei(bal, 'ether'));
        }
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case 1: return 'Ethereum Mainnet';
      case 3: return 'Ropsten';
      case 4: return 'Rinkeby';
      case 5: return 'Goerli';
      case 11155111: return 'Sepolia';
      default: return `Unknown Network (${networkId})`;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      loadBlockchainData();

      // Refresh on account/network changes
      window.ethereum.on('accountsChanged', loadBlockchainData);
      window.ethereum.on('chainChanged', loadBlockchainData);

      return () => {
        window.ethereum.removeListener('accountsChanged', loadBlockchainData);
        window.ethereum.removeListener('chainChanged', loadBlockchainData);
      };
    }
  }, []);

  return (
    <div className="wallet-card quantum-glass">
      <h3>🪙 Kvantni Novčanik</h3>
      <div className="wallet-info">
        <p>🌐 Mreža: {network}</p>
        <p>📧 Adresa: {account ? `${account.substring(0,6)}...${account.substring(38)}` : 'Nije povezan'}</p>
        <p>💰 Stanje: <span className="balance">{balance}</span> MLTRN</p>
      </div>
      <button 
        onClick={loadBlockchainData}
        className="quantum-btn"
      >
        {account ? '🔄 Ažuriraj' : '🔗 Poveži Novčanik'}
      </button>
    </div>
  );
};

export default QuantumWallet;