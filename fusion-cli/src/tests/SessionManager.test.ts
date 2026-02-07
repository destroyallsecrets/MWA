import { SessionManager } from '../core/SessionManager.js';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

async function runTests() {
  console.log('--- RUNNING SESSION MANAGER TESTS ---');
  
  const baseDir = process.cwd();
  const sessionMgr = new SessionManager(baseDir);
  const sessionDir = path.join(baseDir, 'src', 'data', 'sessions');

  // Test 1: Create Session
  console.log('Test 1: Create Session');
  const session = sessionMgr.createSession();
  assert.ok(session.id, 'Session ID should exist');
  assert.ok(fs.existsSync(path.join(sessionDir, `${session.id}.json`)), 'Session file should be created');
  console.log('  [PASS]');

  // Test 2: Save and Load Session
  console.log('Test 2: Save and Load Session');
  session.messages.push({ role: 'user', content: 'Hello', timestamp: new Date().toISOString() });
  sessionMgr.saveSession(session);
  
  const loaded = sessionMgr.loadSession(session.id);
  assert.strictEqual(loaded?.messages.length, 1, 'Loaded session should have 1 message');
  assert.strictEqual(loaded?.messages[0].content, 'Hello', 'Content should match');
  console.log('  [PASS]');

  // Test 3: List Sessions
  console.log('Test 3: List Sessions');
  const sessions = sessionMgr.listSessions();
  assert.ok(sessions.includes(session.id), 'Sessions list should include created session');
  console.log('  [PASS]');

  // Test 4: Get Last Session
  console.log('Test 4: Get Last Session');
  const last = sessionMgr.getLastSession();
  assert.strictEqual(last?.id, session.id, 'Last session ID should match');
  console.log('  [PASS]');

  console.log('--- ALL TESTS PASSED ---');
}

runTests().catch(err => {
  console.error('TEST FAILED:');
  console.error(err);
  process.exit(1);
});
