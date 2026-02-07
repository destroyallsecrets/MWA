import { PolicyEngine } from '../core/PolicyEngine.js';
import assert from 'assert';

async function runTests() {
  console.log('--- RUNNING POLICY ENGINE TESTS ---');
  const policy = new PolicyEngine();

  // Test 1: Allowed Command
  console.log('Test 1: Allowed Command (npm)');
  const res1 = policy.checkCommand('npm run build', 'F:\\MWA\\fusion-cli');
  assert.ok(res1.allowed, 'npm should be allowed');
  console.log('  [PASS]');

  // Test 2: Blocked Command
  console.log('Test 2: Blocked Command (format)');
  const res2 = policy.checkCommand('format c:', 'F:\\MWA\\fusion-cli');
  assert.ok(!res2.allowed, 'format should be blocked');
  assert.ok(res2.reason?.includes('whitelist'), 'Reason should mention whitelist');
  console.log('  [PASS]');

  // Test 3: System Path Block
  console.log('Test 3: Restricted Path (System32)');
  const res3 = policy.checkCommand('ls', 'C:\\Windows\\System32');
  assert.ok(!res3.allowed, 'System32 should be restricted');
  console.log('  [PASS]');

  // Test 4: Project Scope Block
  console.log('Test 4: Outside Scope (Random folder)');
  const res4 = policy.checkCommand('ls', 'F:\\RandomFolder');
  assert.ok(!res4.allowed, 'Outside MWA/gemini should be blocked');
  console.log('  [PASS]');

  // Test 5: Read Policy (Allowed)
  console.log('Test 5: Read Policy (Allowed)');
  const res5 = policy.checkRead('F:\\MWA\\fusion-cli\\src\\index.tsx');
  assert.ok(res5.allowed, 'MWA read should be allowed');
  console.log('  [PASS]');

  // Test 6: Read Policy (Blocked)
  console.log('Test 6: Read Policy (Blocked System)');
  const res6 = policy.checkRead('C:\\Users\\kampv\\AppData\\Local\\Secrets.json');
  assert.ok(!res6.allowed, 'System path read should be blocked');
  console.log('  [PASS]');

  console.log('--- ALL POLICY TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});
