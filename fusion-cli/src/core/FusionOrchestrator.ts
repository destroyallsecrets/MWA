import { Brain } from '../brain-node/Brain.js';
import { StateManager } from './StateManager.js';
import { PolicyEngine } from './PolicyEngine.js';
import { SurgicalDiff } from './SurgicalDiff.js';
import { ContextIngestor } from './ContextIngestor.js';
import { fileLog } from './Logger.js';

export class FusionOrchestrator {
  private contextIngestor: ContextIngestor;
  private globalContext: string = '';

  constructor(
    private brain: Brain,
    private state: StateManager,
    private policy: PolicyEngine,
    private surgery: SurgicalDiff
  ) {
    this.contextIngestor = new ContextIngestor();
  }

  private async auditToCloud(action: string, result: string, policy: 'allowed' | 'denied') {
    let cloudUrl = process.env.FUSION_CLOUD_URL;
    if (!cloudUrl) {
      fileLog('[CLOUD_SKIP]: No FUSION_CLOUD_URL defined in environment.');
      return;
    }

    // Force 127.0.0.1 for local reliability
    cloudUrl = cloudUrl.replace('localhost', '127.0.0.1');
    
    try {
      fileLog(`[CLOUD_AUDIT]: Attempting to log ${action} to ${cloudUrl}`);
      const response = await fetch(`${cloudUrl}/api/ledger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'LOCAL_CLI_NODE',
          action,
          result,
          policy
        })
      });
      if (response.ok) {
        fileLog('[CLOUD]: Action successfully audited to blockchain.');
      } else {
        fileLog(`[CLOUD_ERROR]: Server returned ${response.status}`);
      }
    } catch (e) {
      fileLog(`[CLOUD_ERROR]: Failed to connect to security ledger: ${e}`);
    }
  }

  ingestContext(path: string): string {
    const policyCheck = this.policy.checkRead(path);
    if (!policyCheck.allowed) {
      this.auditToCloud(`INGEST_CONTEXT: ${path}`, 'ACCESS_DENIED', 'denied');
      return `[SECURITY DENIAL]: ${policyCheck.reason}`;
    }

    try {
      this.globalContext = this.contextIngestor.scan(path);
      this.auditToCloud(`INGEST_CONTEXT: ${path}`, `SUCCESS (${this.globalContext.length} chars)`, 'allowed');
      return `Successfully ingested context from ${path}. Total size: ${this.globalContext.length} characters.`;
    } catch (e: any) {
      return `Failed to ingest context: ${e.message}`;
    }
  }

  async executeGoal(goal: string, onUpdate: (msg: string) => void) {
    if (!this.brain.isConnected) {
      onUpdate(`[OFFLINE]: Cannot process '${goal}'. Neural link is not established.`);
      return;
    }

    onUpdate(`Analyzing tactical goal...`);

    const systemPrompt = "You are the Fusion-CLI Strategic Engine. " +
      "Goal: Provide a concise tactical plan and code patches if needed. " +
      "Format: Use markdown. If you want to execute a command, wrap it in bash code blocks. " +
      "Context: Access repository files if provided.";

    let contextMsg = "";
    if (this.globalContext) {
      // Use a reasonable chunk of context to avoid overwhelming the prompt
      contextMsg = "\n\n[CONTEXT]:\n" + this.globalContext.slice(0, 30000) + "...";
    }
    
    const fullPrompt = systemPrompt + "\n\nUSER GOAL: " + goal + contextMsg;

    try {
      const response = await this.brain.process(fullPrompt);

      if (response.error) {
        onUpdate(`[BRAIN ERROR]: ${response.error}`);
        this.auditToCloud(`EXECUTE_GOAL: ${goal}`, `ERROR: ${response.error}`, 'denied');
        return;
      }

      onUpdate(`[INTELLIGENCE RECEIVED]:`);
      this.auditToCloud(`EXECUTE_GOAL: ${goal}`, 'SUCCESS', 'allowed');
      
      const lines = response.content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        // Send meaningful lines to TUI
        if (trimmed) {
          onUpdate(trimmed);
        }
      }

      if (response.content.includes('```')) {
        onUpdate(`[POLICY]: Detected code block. Approval required for autonomous execution.`);
      }

    } catch (e: any) {
      fileLog(`[ORCHESTRATOR_FATAL]: ${e.message}`);
      onUpdate(`[SYSTEM FAILURE]: ${e.message}`);
    }
  }
}
