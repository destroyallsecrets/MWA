import { AIProvider, LlmResponse } from './providers/AIProvider.js';
import { GeminiProvider } from './providers/GeminiProvider.js';
import { ClaudeProvider } from './providers/ClaudeProvider.js';

/**
 * Brain: The strategic orchestrator (Provider Factory).
 * Manages the active AI provider and routes requests.
 */
export class Brain {
  private providers: Map<string, AIProvider> = new Map();
  private activeProviderName: string = 'gemini';

  constructor(apiKey: string) {
    // Initialize default providers
    // Note: In a real app, we'd pass specific keys for each provider
    this.providers.set('gemini', new GeminiProvider(apiKey));
    this.providers.set('claude', new ClaudeProvider('')); // No key for stub yet
  }

  get isConnected(): boolean {
    return this.activeProvider?.isConnected || false;
  }

  get authType(): string {
    const provider = this.activeProvider;
    if (provider instanceof GeminiProvider) {
      return provider.authType;
    }
    return 'unknown';
  }

  private get activeProvider(): AIProvider | undefined {
    return this.providers.get(this.activeProviderName);
  }

  setProvider(name: string): boolean {
    if (this.providers.has(name)) {
      this.activeProviderName = name;
      return true;
    }
    return false;
  }

  getProviderName(): string {
    return this.activeProviderName;
  }

  async process(prompt: string, context: string = ""): Promise<LlmResponse> {
    const provider = this.activeProvider;
    if (!provider) {
      return {
        content: "",
        tokens: 0,
        model: "error",
        error: "No active AI provider selected.",
      };
    }
    return provider.process(prompt, context);
  }
}