// apps/web/src/utils/tonIntegration.ts
import { mnemonicToPrivateKey } from '@ton/crypto'; // Ažurirani import
import { WalletContractV4 } from '@ton/ton';

export async function connectTONWallet() {
  try {
    const walletMnemonic = process.env.WALLET_MNEMONIC;
    
    if (!walletMnemonic) {
      throw new Error('WALLET_MNEMONIC није подешен у окружењу');
    }

    if (typeof walletMnemonic !== 'string') {
      throw new Error('WALLET_MNEMONIC мора бити стринг');
    }

    const mnemonicArray = walletMnemonic.split(' ');
    
    if (mnemonicArray.length < 24) {
      throw new Error('Мнемоник мора имати најмање 24 речи');
    }

    // KORISTITE mnemonicToPrivateKey UMESTO mnemonicToWalletKey
    const keyPair = await mnemonicToPrivateKey(mnemonicArray);
    
    const wallet = WalletContractV4.create({ 
      publicKey: keyPair.publicKey, 
      workchain: 0 
    });
    
    return wallet;
  } catch (error) {
    console.error('Грешка при повезивању са TON новчаником:', error);
    throw new Error('Неуспешно повезивање са TON новчаником');
  }
}