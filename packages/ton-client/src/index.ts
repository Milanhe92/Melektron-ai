import { TonClient, Address, toNano } from "@ton/ton";

export function createTonClient(network: 'mainnet' | 'testnet' = 'mainnet') {
  return new TonClient({
    endpoint: network === 'mainnet' 
      ? 'https://toncenter.com/api/v2/jsonRPC'
      : 'https://testnet.toncenter.com/api/v2/jsonRPC',
  });
}

export async function getWalletBalance(
  address: string,
  network: 'mainnet' | 'testnet' = 'mainnet'
): Promise<bigint> {
  const client = createTonClient(network);
  const walletAddress = Address.parse(address);
  return client.getBalance(walletAddress);
}

export function createTransaction(
  to: string,
  amount: string,
  network: 'mainnet' | 'testnet' = 'mainnet'
) {
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [{
      address: Address.parse(to),
      amount: toNano(amount)
    }],
    network
  };
}

// Додатне помоћне функције
export function isValidTonAddress(address: string): boolean {
  try {
    Address.parse(address);
    return true;
  } catch {
    return false;
  }
}

export function formatTonBalance(balance: bigint): string {
  const ton = Number(balance) / 1e9;
  return ton.toFixed(4) + ' TON';
}