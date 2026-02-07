'use client';
import React, { useEffect, useState } from 'react';
import { Shield, Activity, Link as LinkIcon, Lock } from 'lucide-react';

export default function Dashboard() {
  const [ledger, setLedger] = useState<any>(null);

  useEffect(() => {
    fetch('/api/ledger')
      .then(res => res.json())
      .then(data => setLedger(data));
  }, []);

  return (
    <div className="space-y-8">
      {/* HUD Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={<Shield size={14}/>} label="POLICY_STATUS" value="SYNCHRONIZED" color="text-green-500" />
        <MetricCard icon={<Activity size={14}/>} label="LEDGER_HEIGHT" value={ledger?.history?.length || 0} color="text-white" />
        <MetricCard icon={<Lock size={14}/>} label="INTEGRITY_VLD" value={ledger?.valid ? 'STABLE' : 'UNSTABLE'} color={ledger?.valid ? 'text-green-500' : 'text-red-500'} />
      </div>

      {/* Blockchain Explorer */}
      <section>
        <h2 className="text-[10px] font-bold text-[#666] mb-4 uppercase tracking-widest">Global Audit Chain</h2>
        <div className="space-y-2">
          {ledger?.history?.map((block: any) => (
            <div key={block.index} className="border border-[#1a1a1a] p-4 bg-[#0a0a0a] hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#444]">BLOCK_{block.index.toString().padStart(4, '0')}</span>
                <span className="text-[10px] text-[#444]">{new Date(block.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${block.data.policy === 'allowed' ? 'border-green-900/50 text-green-500' : 'border-red-900/50 text-red-500'}`}>
                    {block.data.policy.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-white uppercase">{block.data.action}</p>
                  <p className="text-[10px] text-[#666] truncate">{block.data.result}</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-[8px] text-[#333] font-mono leading-none break-all">HASH: {block.hash.slice(0, 16)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: any) {
  return (
    <div className="border border-[#1a1a1a] p-4 bg-[#080808]">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] text-[#666] tracking-tighter">{label}</span>
      </div>
      <div className={`text-lg font-bold tracking-tighter ${color}`}>{value}</div>
    </div>
  );
}
