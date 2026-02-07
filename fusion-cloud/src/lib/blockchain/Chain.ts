import { Block, BlockData } from './Block';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export class SecurityLedger {
  private dbPath: string;
  private isLocal: boolean;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'src', 'data', 'ledger.json');
    // Determine if we are in local fallback mode (no KV environment variables)
    this.isLocal = !process.env.KV_URL || !process.env.KV_REST_API_TOKEN;
  }

  private async loadChain(): Promise<Block[]> {
    if (!this.isLocal) {
      try {
        const data = await kv.get<any[]>('fusion_ledger');
        if (data && Array.isArray(data)) {
          return this.rehydrateChain(data);
        }
      } catch (e) {
        console.error('[CLOUD_DB_ERROR]: Failed to load from Vercel KV:', e);
      }
    }

    // Local Fallback
    if (fs.existsSync(this.dbPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
        return this.rehydrateChain(data);
      } catch (e) {
        console.error('[LOCAL_DB_ERROR]: Failed to load from file:', e);
      }
    }

    // Genesis
    const genesis = this.createGenesisBlock();
    const newChain = [genesis];
    await this.saveChain(newChain);
    return newChain;
  }

  private rehydrateChain(data: any[]): Block[] {
    return data.map((b: any) => {
      const block = new Block(b.index, b.previousHash, b.data);
      block.timestamp = b.timestamp;
      block.hash = b.hash;
      return block;
    });
  }

  private async saveChain(chain: Block[]) {
    if (!this.isLocal) {
      try {
        await kv.set('fusion_ledger', chain);
        return;
      } catch (e) {
        console.error('[CLOUD_DB_ERROR]: Failed to save to Vercel KV:', e);
      }
    }

    // Local Fallback
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.dbPath, JSON.stringify(chain, null, 2));
  }

  private createGenesisBlock(): Block {
    return new Block(0, "0", {
      userId: "SYSTEM",
      action: "GENESIS",
      result: "Security Ledger Initialized",
      policy: "allowed"
    });
  }

  async getLatestBlock(): Promise<Block> {
    const chain = await this.loadChain();
    return chain[chain.length - 1];
  }

  async addBlock(data: BlockData): Promise<Block> {
    const chain = await this.loadChain();
    const previousBlock = chain[chain.length - 1];
    const newBlock = new Block(
      previousBlock.index + 1,
      previousBlock.hash,
      data
    );
    chain.push(newBlock);
    await this.saveChain(chain);
    return newBlock;
  }

  async isChainValid(): Promise<boolean> {
    const chain = await this.loadChain();
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      // Re-calculate hash to verify
      const blockToVerify = new Block(currentBlock.index, currentBlock.previousHash, currentBlock.data);
      blockToVerify.timestamp = currentBlock.timestamp;
      
      if (currentBlock.hash !== blockToVerify.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  async getHistory(): Promise<Block[]> {
    return await this.loadChain();
  }
}

// Export a singleton instance creator to handle async initialization if needed, 
// but here we'll just export the class and let routes instantiate it or use a global.
export const ledger = new SecurityLedger();
