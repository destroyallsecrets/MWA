import { AIProvider, LlmResponse } from './AIProvider.js';

export class ClaudeProvider implements AIProvider {
  public name = 'claude';
  public isConnected: boolean = false;

  constructor(apiKey: string) {
    // Stub implementation
    // In a real implementation, we would initialize the Anthropic client here
    this.isConnected = !!apiKey && apiKey.startsWith('sk-ant');
  }

  async process(prompt: string, context: string = ""): Promise<LlmResponse> {
    return {
      content: "I am Claude (Stub). I cannot actually think yet, but I am ready to be integrated.",
      tokens: 0,
      model: "claude-3-opus-stub",
    };
  }
}
