import React from 'react';
import { Button } from '../components/ui/Button';
import { InteractiveGlass } from '../components/ui/InteractiveGlass';
import { siteConfig } from '../config/site';
import { Mail, Send, Terminal } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-secondary p-6 md:p-24 flex items-center justify-center relative">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-accent mb-4">
            <Mail size={18} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Communication_Link</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            LET'S <span className="text-transparent stroke-text">CONNECT</span>
          </h1>
        </header>
        
        <InteractiveGlass className="p-8 md:p-12 rounded-2xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tighter text-white">Transmission_Form</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase mt-1 tracking-widest">
                  All signals processed within 24h cycle
                </p>
              </div>
              <Terminal size={20} className="text-slate-800" />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">Protocol_Entity</label>
                  <input
                    type="text"
                    placeholder="NAME::ENTITY"
                    className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent outline-none transition-all font-mono text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">Signal_Origin</label>
                  <input
                    type="email"
                    placeholder="EMAIL@DOMAIN.SYS"
                    className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent outline-none transition-all font-mono text-xs text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">Encrypted_Payload</label>
                <textarea
                  rows={4}
                  placeholder="INPUT_TRANSMISSION_HERE..."
                  className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent outline-none transition-all font-mono text-xs text-white resize-none"
                />
              </div>
            </div>

            <Button variant="neo" className="w-full py-8 group">
              INITIALIZE_TRANSMISSION 
              <Send size={14} className="ml-4 opacity-50 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </InteractiveGlass>

        <div className="mt-12 flex justify-between text-[10px] font-mono text-slate-700 uppercase tracking-[0.3em]">
          <div>{siteConfig.creator.toUpperCase()} // ARCHITECT</div>
          <div>STATUS::SYNCED</div>
          <div>{new Date().toISOString().split('T')[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;