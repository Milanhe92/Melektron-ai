declare module '@melektron/ton-client' {
  export function createTonClient(network?: 'mainnet' | 'testnet'): any;
  export function getWalletBalance(address: string, network?: 'mainnet' | 'testnet'): Promise<bigint>;
  export function createTransaction(to: string, amount: string, network?: 'mainnet' | 'testnet'): any;
  export function isValidTonAddress(address: string): boolean;
  export function formatTonBalance(balance: bigint): string;
}