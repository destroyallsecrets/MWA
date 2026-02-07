import fs from 'fs';
import path from 'path';

export interface Snapshot {
  id: string;
  timestamp: string;
  files: { [path: string]: string };
  meta: any;
}

/**
 * StateManager: Implements "Time-Travel" capabilities inspired by Codex research.
 * Allows the CLI to save and restore filesystem states during complex autonomous development.
 */
export class StateManager {
  private snapshotDir: string;

  constructor(baseDir: string) {
    this.snapshotDir = path.join(baseDir, '.fusion_snapshots');
    if (!fs.existsSync(this.snapshotDir)) {
      fs.mkdirSync(this.snapshotDir, { recursive: true });
    }
  }

  createSnapshot(id: string, filesToWatch: string[]): string {
    const snapshot: Snapshot = {
      id,
      timestamp: new Date().toISOString(),
      files: {},
      meta: {
        description: `Snapshot triggered for sequence ${id}`
      }
    };

    filesToWatch.forEach(file => {
      const fullPath = path.resolve(file);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        snapshot.files[fullPath] = fs.readFileSync(fullPath, 'utf-8');
      }
    });

    const snapPath = path.join(this.snapshotDir, `${id}.json`);
    fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2));
    return snapPath;
  }

  rollback(id: string): boolean {
    const snapPath = path.join(this.snapshotDir, `${id}.json`);
    if (!fs.existsSync(snapPath)) return false;

    const snapshot: Snapshot = JSON.parse(fs.readFileSync(snapPath, 'utf-8'));
    Object.entries(snapshot.files).forEach(([filePath, content]) => {
      fs.writeFileSync(filePath, content);
    });

    return true;
  }

  listSnapshots(): string[] {
    return fs.readdirSync(this.snapshotDir).map(f => f.replace('.json', ''));
  }
}
