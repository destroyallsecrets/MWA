import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, render } from 'ink';
import { Header, StatusLine } from './tui/components.js';
import { Composer } from './tui/Composer.js';
import { Brain } from './brain-node/Brain.js';
import { StateManager } from './core/StateManager.js';
import { SessionManager, Session } from './core/SessionManager.js';
import { PolicyEngine } from './core/PolicyEngine.js';
import { SurgicalDiff } from './core/SurgicalDiff.js';
import { FusionOrchestrator } from './core/FusionOrchestrator.js';
import { cliTheme } from './tui/theme.js';
import { fileLog } from './core/Logger.js';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
fileLog('Loading environment...');
dotenv.config(); // Current dir
dotenv.config({ path: path.join(process.cwd(), '../.env') }); // Parent dir
dotenv.config({ path: path.join(process.cwd(), '../.env.local') }); // Parent dir local
fileLog(`GEMINI_API_KEY status: ${!!process.env.GEMINI_API_KEY}`);
fileLog(`FUSION_CLOUD_URL: ${process.env.FUSION_CLOUD_URL || 'UNDEFINED'}`);

const FusionApp: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>(['Neural link established.']);
  const [status, setStatus] = useState('Initializing...');

  // Initialize instances only once
  const instances = useRef<any>(null);

  if (!instances.current) {
    const brain = new Brain(process.env.GEMINI_API_KEY || '');
    const state = new StateManager(process.cwd());
    const sessionMgr = new SessionManager(process.cwd());
    const policy = new PolicyEngine();
    const surgery = new SurgicalDiff();
    const orchestrator = new FusionOrchestrator(brain, state, policy, surgery);
    
    instances.current = { brain, sessionMgr, orchestrator };
  }

  const { brain, sessionMgr, orchestrator } = instances.current;
  const currentSessionRef = useRef<Session | null>(null);

  useEffect(() => {
    setStatus(brain.isConnected ? `Synchronized (${brain.authType.toUpperCase()})` : 'Disconnected');

    const last = sessionMgr.getLastSession();
    if (last) {
      currentSessionRef.current = last;
      const history = last.messages.map((m: any) => 
        m.role === 'user' ? `> USER: ${m.content}` : `ORCHESTRATOR: ${m.content}`
      );
      setLogs(prev => ['Neural link established.', ...history]);
      fileLog(`Resumed session: ${last.id}`);
    } else {
      const newSession = sessionMgr.createSession();
      currentSessionRef.current = newSession;
      fileLog(`Created new session: ${newSession.id}`);
    }
  }, []);

  const addToSession = (role: 'user' | 'assistant', content: string) => {
    if (!currentSessionRef.current) return;
    currentSessionRef.current.messages.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });
    sessionMgr.saveSession(currentSessionRef.current);
  };

  const handleInput = async (query: string) => {
    if (!query) return;

    fileLog(`USER_INPUT: ${query}`);

    if (query.trim() === '/list-sessions') {
      addToSession('user', query);
      setLogs(prev => [...prev, `> USER: ${query}`]);
      const sessions = sessionMgr.listSessions();
      const msg = `[SESSIONS]:\n${sessions.slice(0, 10).map((s: string) => ` - ${s}`).join('\n')}`;
      setLogs(prev => [...prev, msg]);
      addToSession('assistant', msg);
      return;
    }

    if (query.trim().startsWith('/model')) {
      addToSession('user', query);
      setLogs(prev => [...prev, `> USER: ${query}`]);
      const parts = query.split(' ');
      const modelName = parts[1]?.toLowerCase();
      if (!modelName) {
        const msg = `[SYSTEM]: Current provider: ${brain.getProviderName()}`;
        setLogs(prev => [...prev, msg]);
        addToSession('assistant', msg);
      } else {
        const success = brain.setProvider(modelName);
        const msg = success ? `[SYSTEM]: Switched to '${modelName}'` : `[ERROR]: Unknown provider '${modelName}'`;
        setLogs(prev => [...prev, msg]);
        addToSession('assistant', msg);
        setStatus(brain.isConnected ? `Synchronized (${brain.authType.toUpperCase()})` : 'Disconnected');
      }
      return;
    }

    if (query.trim().startsWith('/ingest')) {
      addToSession('user', query);
      setLogs(prev => [...prev, `> USER: ${query}`]);
      const parts = query.split(' ');
      const targetPath = parts[1] || process.cwd();
      const result = orchestrator.ingestContext(targetPath);
      setLogs(prev => [...prev, `[INGEST]: ${result}`]);
      addToSession('assistant', result);
      return;
    }

    addToSession('user', query);
    setIsProcessing(true);
    setStatus('Processing');
    setLogs(prev => [...prev, `> USER: ${query}`]);

    if (!brain.isConnected) {
      const msg = '[⚠️ WARNING]: No authentication found.';
      setLogs(prev => [...prev, msg]);
      addToSession('assistant', msg);
    }

    await orchestrator.executeGoal(query, (msg: string) => {
      setLogs(prev => [...prev, msg]);
      fileLog(`ORCHESTRATOR: ${msg}`);
      addToSession('assistant', msg);
    });

    setStatus(brain.isConnected ? `Synchronized (${brain.authType.toUpperCase()})` : 'Disconnected');
    setIsProcessing(false);
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Header />
      <StatusLine status={status} color={status.includes('Synchronized') ? cliTheme.colors.success : cliTheme.colors.error} />
      <Box flexDirection="column" flexGrow={1} minHeight={10} marginBottom={1}>
        {logs.slice(-20).map((log, i) => (
          <Text key={i} color={log.startsWith('>') ? cliTheme.colors.accent : cliTheme.colors.foreground}>
            {log}
          </Text>
        ))}
      </Box>
      <Composer onInput={handleInput} isProcessing={isProcessing} />
    </Box>
  );
};

try {
  render(<FusionApp />);
} catch (e: any) {
  fileLog(`FATAL_ERROR: ${e.message}`);
}