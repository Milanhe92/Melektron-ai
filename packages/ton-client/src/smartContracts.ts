// packages/ton-client/src/smartContracts.ts
import { compile } from './compiler';
import { initData } from './dataInitializer';

// Asinhrona funkcija za kompilaciju
export async function compileContract() {
  try {
    const compiledCode = await compile();
    const initializedData = await initData();
    
    return {
      code: compiledCode,
      data: initializedData
    };
  } catch (error) {
    console.error('Greška pri kompilaciji:', error);
    throw error;
  }
}

// Glavna asinhrona funkcija
async function main() {
  try {
    const contract = await compileContract();
    console.log('Kontrakt uspešno kompajliran');
    return contract;
  } catch (error) {
    console.error('Greška u glavnoj funkciji:', error);
    process.exit(1);
  }
}

// Izvršavanje samo ako je fajl direktno pokrenut
if (require.main === module) {
  main().catch(console.error);
}

export default compileContract;