/**
 * PolicyEngine: A TypeScript implementation of the Codex security shield.
 * Gates shell execution and file modifications based on context and rules.
 */
export class PolicyEngine {
  private allowedCommands: string[] = ['npm', 'npx', 'git', 'mkdir', 'ls', 'dir', 'move', 'copy', 'del', 'rm'];
  private restrictedPaths: string[] = ['Windows', 'System32', 'Program Files', 'Users'];

  checkCommand(command: string, workingDir: string): { allowed: boolean; reason?: string } {
    const cmdBase = command.split(' ')[0].toLowerCase();

    // 1. Check command whitelist
    if (!this.allowedCommands.includes(cmdBase)) {
      return { allowed: false, reason: `Command '${cmdBase}' is not in the approved security whitelist.` };
    }

    // 2. Check path restrictions
    const normalizedDir = workingDir.toLowerCase();
    if (this.restrictedPaths.some(p => normalizedDir.includes(p.toLowerCase()))) {
      return { allowed: false, reason: `Execution denied in restricted system directory: ${workingDir}` };
    }

    // 3. Project-Specific Lockdown
    if (!normalizedDir.includes('mwa')) {
      return { allowed: false, reason: 'Fusion-CLI is locked to the Outside We Stand Eternally project scope.' };
    }

    return { allowed: true };
  }

  checkRead(targetPath: string): { allowed: boolean; reason?: string } {
    const normalizedPath = targetPath.toLowerCase();

    // 1. Check path restrictions (System directories)
    if (this.restrictedPaths.some(p => normalizedPath.includes(p.toLowerCase()))) {
      return { allowed: false, reason: `Read access denied for restricted system directory: ${targetPath}` };
    }

    // 2. Scope check
    if (!normalizedPath.includes('mwa') && !normalizedPath.includes('.gemini')) {
      return { allowed: false, reason: 'Read access restricted to Fusion-CLI project scope.' };
    }

    return { allowed: true };
  }
}
