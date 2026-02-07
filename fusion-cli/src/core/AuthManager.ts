import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileLog } from './Logger.js';

export interface Credentials {
  apiKey: string;
}

/**
 * AuthManager: Manages authentication for Fusion-CLI.
 * Hardened to prioritize verified Google API Keys and ensure SDK stability.
 */
export class AuthManager {
  getCredentials(): Credentials | null {
    // Priority 1: Google Environment Variable (Verified)
    const googleKey = process.env.GOOGLE_API_KEY;
    if (googleKey && googleKey.startsWith('AIza') && googleKey !== 'PLACEHOLDER_KEY_REQUIRED') {
      fileLog('[AUTH]: Using verified GOOGLE_API_KEY from environment.');
      return { apiKey: googleKey };
    }

    // Priority 2: Gemini Environment Variable
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey !== 'PLACEHOLDER_KEY_REQUIRED') {
      fileLog('[AUTH]: Using GEMINI_API_KEY from environment.');
      return { apiKey: geminiKey };
    }

    // Fallback: Check local .env directly if process.env is stale
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/GEMINI_API_KEY=([^\s]+)/);
      if (match && match[1] !== 'PLACEHOLDER_KEY_REQUIRED') {
        fileLog('[AUTH]: Using API Key found in local .env file.');
        return { apiKey: match[1] };
      }
    }

    fileLog('[AUTH]: CRITICAL: No valid API Key found.');
    return null;
  }

  getGenAIConfig(): any {
    const creds = this.getCredentials();
    if (!creds) return null;

    // Hardened config matching working diagnostic script
    return { 
      apiKey: creds.apiKey,
      vertexai: false
    };
  }
}