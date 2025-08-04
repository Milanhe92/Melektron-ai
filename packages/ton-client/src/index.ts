import { Address, toNano } from '@ton/core';
import { TonClient } from '@ton/ton';

export class TonClientWrapper {
  private client: TonClient;

  constructor(apiUrl: string) {
    this.client = new TonClient({ endpoint: apiUrl });
  }

  async getBalance(address: string) {
    return this.client.getBalance(Address.parse(address));
  }
}

export { Address, toNano };