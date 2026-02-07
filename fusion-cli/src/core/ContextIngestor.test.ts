import { ContextIngestor } from '../core/ContextIngestor.js';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('--- RUNNING CONTEXT INGESTOR TESTS ---');
  const ingestor = new ContextIngestor();
  const testDir = path.join(process.cwd(), 'F_tmp_ingest_test');

  try {
    // Setup
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true });
    fs.mkdirSync(testDir);
    fs.writeFileSync(path.join(testDir, 'test.ts'), 'console.log("TS");');
    fs.writeFileSync(path.join(testDir, 'README.md'), '# Title');
    fs.mkdirSync(path.join(testDir, 'node_modules'));
    fs.writeFileSync(path.join(testDir, 'node_modules', 'ignored.js'), 'BAD');

    // Test 1: Scanning
    console.log('Test 1: File Scanning (Respect Ignores)');
    const result = ingestor.scan(testDir);
    assert.ok(result.includes('test.ts'), 'Should include test.ts');
    assert.ok(result.includes('README.md'), 'Should include README.md');
    assert.ok(!result.includes('ignored.js'), 'Should ignore node_modules');
    console.log('  [PASS]');

    // Test 2: Content Aggregation
    console.log('Test 2: Content Aggregation');
    assert.ok(result.includes('console.log("TS");'), 'Should contain file content');
    assert.ok(result.includes('--- FILE:'), 'Should have file delimiters');
    console.log('  [PASS]');

  } finally {
    // Cleanup
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true });
  }

  console.log('--- ALL INGESTOR TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});
