import { TonClient, Address } from "@ton/core";

export class QuantumBlockchainBridge {
  private client: TonClient;

  constructor(client: TonClient) {
    this.client = client;
  }

  async getWalletBalance(address: string): Promise<bigint> {
    const balance = await this.client.getBalance(Address.parse(address));
    return balance;
  }

  async sendTransaction() {
    // Implementacija po potrebi
  }
}