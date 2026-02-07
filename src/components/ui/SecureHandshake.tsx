import React from 'react';
import { ShieldCheck, Lock, Wifi } from 'lucide-react';

export const SecureHandshake: React.FC = () => {
  return (
    <div className="flex gap-4 p-4 liquid-glass rounded-lg border border-accent/20 mb-8 max-w-sm">
      <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
        <ShieldCheck className="text-green-500" size={16} />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-mono text-white uppercase tracking-widest leading-none">Secure_Nexus_Link</p>
        <div className="flex items-center gap-4 text-[8px] font-mono text-slate-500 uppercase">
          <span className="flex items-center gap-1"><Lock size={8} /> Encrypted</span>
          <span className="flex items-center gap-1"><Wifi size={8} /> Auth_Registry</span>
        </div>
      </div>
    </div>
  );
};
