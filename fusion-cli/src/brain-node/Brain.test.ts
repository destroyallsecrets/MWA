import { Brain } from './Brain.js';
import assert from 'assert';

async function runTests() {
  console.log('--- RUNNING BRAIN (PROVIDER FACTORY) TESTS ---');

  const brain = new Brain('fake-api-key');

  // Test 1: Default Provider
  console.log('Test 1: Default Provider (Gemini)');
  assert.strictEqual(brain.getProviderName(), 'gemini');
  console.log('  [PASS]');

  // Test 2: Switch Provider
  console.log('Test 2: Switch Provider (Claude)');
  const switched = brain.setProvider('claude');
  assert.ok(switched, 'Should switch to Claude');
  assert.strictEqual(brain.getProviderName(), 'claude');
  console.log('  [PASS]');

  // Test 3: Unknown Provider
  console.log('Test 3: Switch to Unknown Provider');
  const unknownSwitched = brain.setProvider('gpt-5');
  assert.ok(!unknownSwitched, 'Should not switch to unknown provider');
  assert.strictEqual(brain.getProviderName(), 'claude', 'Active provider should still be Claude');
  console.log('  [PASS]');

  // Test 4: Process with Stub Provider
  console.log('Test 4: Process with Claude Stub');
  const response = await brain.process('Hello');
  assert.ok(response.content.includes('Claude (Stub)'), 'Response should be from Claude stub');
  console.log('  [PASS]');

  console.log('--- ALL TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});
