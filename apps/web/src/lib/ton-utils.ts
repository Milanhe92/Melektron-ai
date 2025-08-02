// apps/web/src/lib/ton-utils.ts
import { Address, TonClient } from "@ton/ton";
import { QuantumBlockchainBridge } from '@melektron/quantum-core';

export const initTON = async () => {
  const client = new TonClient({
    endpoint: 'https://ton-mainnet.gateway.pokt.network/v1/'
  });

  const quantumBridge = new QuantumBlockchainBridge(
    new QuantumState(12),
    client
  );

  return {
    getBalance: async (address: string) => {
      const balance = await client.getBalance(Address.parse(address));
      return balance.toString();
    },
    sendTransaction: (to: string, amount: string) => {
      return {
        validUntil: Date.now() + 60000,
        messages: [{
          address: Address.parse(to),
          amount: toNano(amount)
        }]
      };
    },
    entangleWithBlock: quantumBridge.entangleWithBlock.bind(quantumBridge)
  };
};