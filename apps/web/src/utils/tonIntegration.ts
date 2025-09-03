export async function connectTONWallet() {
  try {
    // Sigurno proverite postojanje environment variable
    const walletMnemonic = process.env.WALLET_MNEMONIC;
    
    if (!walletMnemonic) {
      throw new Error('WALLET_MNEMONIC nije postavljen u okruženju');
    }

    // Dodajte dodatnu validaciju
    if (typeof walletMnemonic !== 'string') {
      throw new Error('WALLET_MNEMONIC mora biti string');
    }

    // Podelite mnemonic sa sigurnosnom proverom
    const mnemonicArray = walletMnemonic.split(' ');
    
    if (mnemonicArray.length < 24) {
      throw new Error('Mnemonic mora imati najmanje 24 reči');
    }

    const keyPair = await mnemonicToWalletKey(mnemonicArray);
    // ... ostatak koda
  } catch (error) {
    console.error('Greška pri povezivanju sa TON novčanikom:', error);
    throw error;
  }
}