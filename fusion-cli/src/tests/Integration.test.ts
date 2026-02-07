import { Brain } from '../brain-node/Brain.js';
import { StateManager } from '../core/StateManager.js';
import { PolicyEngine } from '../core/PolicyEngine.js';
import { SurgicalDiff } from '../core/SurgicalDiff.js';
import { FusionOrchestrator } from '../core/FusionOrchestrator.js';
import assert from 'assert';
import path from 'path';

async function runTests() {
  console.log('--- RUNNING INTEGRATION TESTS ---');

  const brain = new Brain('fake-key');
  const state = new StateManager(process.cwd());
  const policy = new PolicyEngine();
  const surgery = new SurgicalDiff();
  const orchestrator = new FusionOrchestrator(brain, state, policy, surgery);

  // Test 1: Orchestrator Context Ingestion with Policy
  console.log('Test 1: Ingest Context with Scope Check');
  const result = orchestrator.ingestContext(process.cwd());
  assert.ok(result.includes('Successfully ingested'), 'Should allow ingestion within MWA scope');
  console.log('  [PASS]');

  // Test 2: Orchestrator Context Ingestion (Blocked)
  console.log('Test 2: Ingest Context (Blocked Path)');
  const blockedResult = orchestrator.ingestContext('C:\\Windows\\System32');
  assert.ok(blockedResult.includes('SECURITY DENIAL'), 'Should block system directory access');
  console.log('  [PASS]');

  // Test 3: Orchestrator Goal Execution (Simulation)
  console.log('Test 3: Execute Goal (Disconnected Brain Simulation)');
  // Since we don't have a real API key in test, it should report offline or error
  let updateCalled = false;
  await orchestrator.executeGoal('Test Goal', (msg) => {
    updateCalled = true;
  });
  assert.ok(updateCalled, 'Orchestrator should provide status updates');
  console.log('  [PASS]');

  console.log('--- ALL INTEGRATION TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('INTEGRATION TEST FAILED:');
  console.error(err);
  process.exit(1);
});
