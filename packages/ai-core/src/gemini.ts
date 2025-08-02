// packages/ai-core/src/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export class QuantumAI {
  private model: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.model = new GoogleGenerativeAI(apiKey);
  }

  async analyzeQuantumState(state: QuantumState): Promise<string> {
    const prompt = `Analyze this quantum state: 
      ${JSON.stringify(state.getProbabilities())}
      Provide insights in markdown format.`;
    
    const result = await this.model.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    }).generateContent(prompt);
    
    return result.response.text();
  }

  async generateCode(specification: string): Promise<string> {
    const response = await this.model.getGenerativeModel({
      model: "gemini-1.5-pro"
    }).generateContent(`Generate TypeScript code for: ${specification}`);
    
    return response.response.text();
  }
}