export interface LlmResponse {
  content: string;
  tokens: number;
  model: string;
  error?: string;
}

export interface AIProvider {
  name: string;
  isConnected: boolean;
  process(prompt: string, context?: string): Promise<LlmResponse>;
}
