import fs from 'fs';
import path from 'path';

export interface SessionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Session {
  id: string;
  timestamp: string;
  messages: SessionMessage[];
}

export class SessionManager {
  private sessionDir: string;

  constructor(baseDir: string) {
    this.sessionDir = path.join(baseDir, 'src', 'data', 'sessions');
    if (!fs.existsSync(this.sessionDir)) {
      fs.mkdirSync(this.sessionDir, { recursive: true });
    }
  }

  createSession(): Session {
    const id = new Date().toISOString().replace(/[:.]/g, '-');
    const session: Session = {
      id,
      timestamp: new Date().toISOString(),
      messages: []
    };
    this.saveSession(session);
    return session;
  }

  saveSession(session: Session): void {
    const filePath = path.join(this.sessionDir, `${session.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
  }

  loadSession(id: string): Session | null {
    const filePath = path.join(this.sessionDir, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  listSessions(): string[] {
    if (!fs.existsSync(this.sessionDir)) return [];
    return fs.readdirSync(this.sessionDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort()
      .reverse();
  }

  getLastSession(): Session | null {
    const sessions = this.listSessions();
    if (sessions.length === 0) return null;
    return this.loadSession(sessions[0]);
  }
}
