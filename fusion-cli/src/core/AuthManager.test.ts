import { AuthManager } from '../core/AuthManager.js';
import assert from 'assert';

async function runTests() {
  console.log('--- RUNNING AUTH MANAGER TESTS ---');
  const auth = new AuthManager();

  // Save originals
  const originalGemini = process.env.GEMINI_API_KEY;
  const originalGoogle = process.env.GOOGLE_API_KEY;

  // Test 1: API Key Preference (Env Var)
  console.log('Test 1: API Key Preference (Env Var)');
  
  // Clear Google key to ensure Gemini key is used if intended
  delete process.env.GOOGLE_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key-123';

  const creds = auth.getCredentials();
  assert.strictEqual(creds?.apiKey, 'test-key-123');
  console.log('  [PASS]');

  // Test 2: GenAI Config Generation
  console.log('Test 2: GenAI Config Generation (API Key)');
  const config = auth.getGenAIConfig();
  assert.strictEqual(config.apiKey, 'test-key-123');
  assert.strictEqual(config.vertexai, false);
  console.log('  [PASS]');

  // Test 3: Google Key Priority
  console.log('Test 3: Google Key Priority');
  process.env.GOOGLE_API_KEY = 'AIza-google-key';
  const creds2 = auth.getCredentials();
  assert.strictEqual(creds2?.apiKey, 'AIza-google-key');
  console.log('  [PASS]');

  // Cleanup
  process.env.GEMINI_API_KEY = originalGemini;
  process.env.GOOGLE_API_KEY = originalGoogle;

  console.log('--- ALL AUTH TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});