// packages/ai/DeepSeekAIApi.ts
import { AIAnalysisResult } from './AI_Response';

export class DeepSeekAIApi {
    private apiKey: string;
    private model: string = 'deepseek-v2-chat';

    constructor() {
        this.apiKey = process.env.DEEPSEEK_API_KEY!;
        if (!this.apiKey) {
            // OBAVEZNO: Dodaj DEEPSEEK_API_KEY u tvoj .env fajl!
            throw new Error("DEEPSEEK_API_KEY mora biti postavljen u .env fajlu."); 
        }
    }

    /**
     * Analizira korisnikov upit i vraća nameru (intent) i podatke.
     * @param textInput Tekstualni upit (npr. iz Telegrama).
     * @returns AIAnalysisResult koji sadrži nameru i podatke.
     */
    public async analyzeIntent(textInput: string): Promise<AIAnalysisResult> {
        console.log(`DeepSeek Analiza: ${textInput}`);

        // *************************************************************************
        // KRITIČNA IMPLEMENTACIJA: Ovde ide poziv DeepSeek API-ju.
        // *************************************************************************
        
        // Trenutni MOCK odgovor:
        if (textInput.toLowerCase().includes('poslati ton')) {
            return {
                intent: 'TRANSFER_TON',
                textResponse: 'Potvrda transakcije je potrebna.',
                data: {
                    recipient: 'EQD... [TVOJA ADRESA ILI CILJANA ADRESA]', 
                    amount: 1.5,
                },
            };
        }

        return {
            intent: 'ANALYZE_ONLY',
            textResponse: `Hvala na upitu. Ja sam Melektron-AI i mogu ti pomoći sa ${textInput}.`,
            data: {},
        };
    }
}