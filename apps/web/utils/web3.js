// apps/web/utils/web3.js
import Web3 from 'web3';

let web3;

export const initWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        window.location.reload();
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
      
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    // Fallback to Infura or other provider
    const provider = new Web3.providers.HttpProvider(
      'https://sepolia.infura.io/v3/YOUR_INFURA_KEY'
    );
    web3 = new Web3(provider);
  }
  return web3;
};

export const connectWallet = async () => {
  if (!web3) await initWeb3();
  const accounts = await web3.eth.getAccounts();
  return accounts[0] || null;
};

export const getTokenBalance = async (tokenContract, address) => {
  return await tokenContract.methods.balanceOf(address).call();
};

export const getNetworkId = async () => {
  if (!web3) await initWeb3();
  return await web3.eth.net.getId();
};

export default web3;