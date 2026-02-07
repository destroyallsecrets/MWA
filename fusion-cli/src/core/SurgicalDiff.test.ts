import { SurgicalDiff } from '../core/SurgicalDiff.js';
import assert from 'assert';

async function runTests() {
  console.log('--- RUNNING SURGICAL DIFF TESTS ---');
  const surgery = new SurgicalDiff();

  const source = `
    function hello() {
      console.log("hello world");
    }
  `;

  // Test 1: Successful Patch
  console.log('Test 1: Successful Patch');
  const oldBlock = 'console.log("hello world");';
  const newBlock = 'console.log("fusion link active");';
  const result = surgery.applyPatch(source, oldBlock, newBlock);
  assert.ok(result.includes('fusion link active'), 'Patch should be applied');
  assert.ok(!result.includes('hello world'), 'Old block should be removed');
  console.log('  [PASS]');

  // Test 2: Failed Patch (Missing block)
  console.log('Test 2: Failed Patch (Target not found)');
  assert.throws(() => {
    surgery.applyPatch(source, 'MISSING BLOCK', 'NEW CONTENT');
  }, /not found/, 'Should throw error if target block is missing');
  console.log('  [PASS]');

  console.log('--- ALL SURGICAL TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});
