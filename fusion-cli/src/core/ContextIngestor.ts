import fs from 'fs';
import path from 'path';

export class ContextIngestor {
  private ignorePatterns = [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    '.DS_Store',
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.fusion_snapshots'
  ];

  private allowedExtensions = [
    '.ts', '.tsx', '.js', '.jsx', '.json',
    '.md', '.txt', '.css', '.html', '.py',
    '.rs', '.toml', '.yml', '.yaml'
  ];

  scan(rootDir: string): string {
    const files = this.recursiveScan(rootDir);
    return this.aggregateContent(files);
  }

  private recursiveScan(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
      if (this.ignorePatterns.includes(file)) continue;

      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.recursiveScan(fullPath));
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (this.allowedExtensions.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
    return results;
  }

  private aggregateContent(filePaths: string[]): string {
    let context = `--- PROJECT CONTEXT (${filePaths.length} files) ---

`;

    for (const filePath of filePaths) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Simple heuristic to skip binary-looking files if extension check failed
        if (content.includes('\0')) continue;

        const relativePath = path.relative(process.cwd(), filePath);
        context += `
--- FILE: ${relativePath} ---
`;
        context += content;
        context += `
--- END FILE ---
`;
      } catch (e) {
        console.warn(`Failed to read file ${filePath}:`, e);
      }
    }
    return context;
  }
}
