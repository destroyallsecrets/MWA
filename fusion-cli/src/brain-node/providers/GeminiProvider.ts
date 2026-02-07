// @ts-ignore
import { GoogleGenAI } from '@google/genai';
import { AuthManager } from '../../core/AuthManager.js';
import { AIProvider, LlmResponse } from './AIProvider.js';
import { fileLog } from '../../core/Logger.js';

export class GeminiProvider implements AIProvider {
  public name = 'gemini';
  public isConnected: boolean = false;
  private client: any;
  public authType: 'apiKey' | 'oauth' | 'none' = 'none';

  constructor(apiKey: string) {
    if (!GoogleGenAI) {
      fileLog('[BRAIN_ERROR]: Failed to resolve GoogleGenAI from @google/genai module.');
      return;
    }
    
    const auth = new AuthManager();
    const config = auth.getGenAIConfig();

    if (config) {
      try {
        // @ts-ignore
        this.client = new GoogleGenAI(config);
        this.isConnected = true;
        this.authType = config.apiKey === 'OAUTH_MODE' ? 'oauth' : 'apiKey';
      } catch (e) {
        fileLog(`[BRAIN_ERROR]: Failed to initialize Gemini Client: ${e}`);
        this.isConnected = false;
      }
    } else {
      this.isConnected = false;
    }
  }

  async process(prompt: string, context: string = ""): Promise<LlmResponse> {
    if (!this.isConnected) {
      return {
        content: "",
        tokens: 0,
        model: "offline",
        error: "Neural link not established. Please provide a valid GEMINI_API_KEY in .env",
      };
    }
    try {
      fileLog(`[BRAIN]: Processing prompt with model: models/gemini-2.5-flash`);
      const response = await this.client.models.generateContent({
        model: "models/gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      return {
        content: response.text || "",
        tokens: response.usageMetadata?.totalTokenCount || 0,
        model: "gemini-2.5-flash",
      };
    } catch (error: any) {
      fileLog(`[BRAIN ERROR]: ${error.message}`);
      return {
        content: "",
        tokens: 0,
        model: "gemini-2.5-flash",
        error: error.message,
      };
    }
  }
}
