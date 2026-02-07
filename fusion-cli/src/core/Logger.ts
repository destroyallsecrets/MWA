import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'fusion_debug.log');

export const fileLog = (msg: string) => {
  const timestamp = new Date().toISOString();
  try {
    fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`);
  } catch (e) {
    // Fallback to console if file is locked
    console.log(`[LOG_ERROR]: ${msg}`);
  }
};
