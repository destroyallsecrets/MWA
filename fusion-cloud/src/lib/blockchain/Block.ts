import CryptoJS from 'crypto-js';

export interface BlockData {
  userId: string;
  action: string;
  result: string;
  policy: 'allowed' | 'denied';
}

export class Block {
  public hash: string;
  public timestamp: number;

  constructor(
    public index: number,
    public previousHash: string,
    public data: BlockData
  ) {
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return CryptoJS.SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data)
    ).toString();
  }
}
