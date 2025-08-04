import { Address, toNano } from '@ton/core'; // Промени импорт
import { TonClient, WalletContractV4 } from '@ton/ton';

export class TonClientWrapper {
  private client: TonClient;

  constructor(apiUrl: string) {
    this.client = new TonClient({ endpoint: apiUrl });
  }

  async getBalance(address: string) {
    return this.client.getBalance(Address.parse(address));
  }

  // Додај остале методе...
}

export { Address, toNano }; // Експортуј потребне функције