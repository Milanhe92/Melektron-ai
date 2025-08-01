import { TonClient, Address, toNano } from "@ton/ton";

const client = new TonClient({
  endpoint: `https://toncenter.com/api/v2/jsonRPC`,
  apiKey: process.env.TON_API_KEY |

| undefined,
});

export async function getWalletBalance(address: string): Promise<bigint> {
  const walletAddress = Address.parse(address);
  const balance = await client.getBalance(walletAddress);
  return balance;
}

export function createTransaction(to: string, amount: string) {
  return {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sekundi validnost
    messages: [
      {
        address: Address.parse(to), // Validacija adrese
        amount: toNano(amount)
      }
    ]
  };
}