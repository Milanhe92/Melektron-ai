// packages/ai/AI_Response.ts
export interface AIAnalysisResult {
    // Intentions recognized by the AI
    intent: 'TRANSFER_TON' | 'ANALYZE_ONLY' | 'UNKNOWN'; 
    
    // The text response to send back to the user
    textResponse: string; 
    
    data: {
        recipient?: string; // Blockchain recipient address
        amount?: number;    // Amount to transfer
    };
}