import { NextRequest, NextResponse } from 'next/server';
import { ledger } from '@/lib/blockchain/Chain';

export async function GET() {
  const [valid, history] = await Promise.all([
    ledger.isChainValid(),
    ledger.getHistory()
  ]);

  return NextResponse.json({
    valid,
    history
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (!data.action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    const newBlock = await ledger.addBlock({
      userId: data.userId || 'UNKNOWN_CLI',
      action: data.action,
      result: data.result || 'No result provided',
      policy: data.policy || 'allowed'
    });

    return NextResponse.json({
      status: 'AUDITED',
      blockIndex: newBlock.index,
      hash: newBlock.hash
    });
  } catch (e: any) {
    console.error('[API_ERROR]:', e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}