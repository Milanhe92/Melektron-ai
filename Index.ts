// index.ts (ROOT - Glavni API Handler)
import { TONClient } from './packages/blockchain/TONClient';
import { DeepSeekAIApi } from './packages/ai/DeepSeekAIApi';
// Nema potrebe za importom AI_Response jer je implicitno u DeepSeekAIApi klasi

// Inicijalizacija ključnih servisa
const TON_SECRET = process.env.TON_MASTER_WALLET_SECRET; 

if (!TON_SECRET) {
    throw new Error("Fatal: TON_MASTER_WALLET_SECRET nije postavljen. Neophodno za Blockchain rad.");
}

const tonClient = new TONClient(TON_SECRET);
const aiService = new DeepSeekAIApi();

/**
 * Glavna funkcija: prima poruku od korisnika i orkestrira akciju.
 */
async function processUserCommand(message: string, senderId: string): Promise<string> {
    try {
        // 1. Analiza namere (Intent Analysis) pomoću DeepSeek AI
        const analysisResult = await aiService.analyzeIntent(message);

        // 2. Uslovna akcija na Blockchain-u
        if (analysisResult.intent === 'TRANSFER_TON') {
            const { recipient, amount } = analysisResult.data;
            
            if (recipient && amount) {
                // Pozivanje TON klijenta
                const txHash = await tonClient.sendTransfer(recipient, amount, `AI_TX_FOR_${senderId}`);
                return `[TON Success] ${analysisResult.textResponse} Transakcija: ${txHash}`;
            } else {
                return `[AI Error] Nedostaju podaci (adresa/iznos) za transfer.`;
            }
        }

        // 3. Nema Blockchain akcije - samo tekstualni odgovor
        return `[AI Response] ${analysisResult.textResponse}`;

    } catch (error) {
        console.error('Kritična greška u procesiranju komande:', error);
        return `[System Error] Interna greška. Kontaktirajte admina (Milanhe92).`;
    }
}

// MOCK API Entry Point (Simulacija Webhooka)
// U stvarnosti, ova funkcija bi primala HTTP zahtev od Telegrama i pozivala processUserCommand.
async function runMelektronAI() {
    console.log('--- Pokrenut Melektron-AI Core ---');
    
    // Provera sistema na startu:
    const masterBalance = await tonClient.getBalance(tonClient.getWalletAddress()); 
    console.log(`Glavni TON Balans (Provera): ${masterBalance} TON`);

    // Primer ulazne poruke:
    const testMessage = 'Molim te, pošalji 1.5 TON na adresu EQD****************************************.';
    const testSender = 'Telegram_User_Test';
    
    const finalResponse = await processUserCommand(testMessage, testSender);
    
    console.log(`\n=> KONAČAN REZULTAT PROCESIRANJA: ${finalResponse}`);
    console.log('--- Procesiranje Završeno ---');
}

runMelektronAI(); // Pokreni simulaciju

// KRAJ FAJLA