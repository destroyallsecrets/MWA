import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { SwissGrid } from '../components/SwissGrid';
import { GithubEmbed } from '../components/ui/GithubEmbed';
import { SystemLog } from '../components/ui/SystemLog';
import { InteractiveGlass } from '../components/ui/InteractiveGlass';
import { SecureHandshake } from '../components/ui/SecureHandshake';
import { Cpu, Zap, Droplets, Layout, Server, Type } from 'lucide-react';

const DesignSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-secondary p-12 overflow-y-auto z-50 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32">
          <h1 className="text-6xl md:text-8xl font-bold mb-12 text-white tracking-tighter uppercase">Signature_DNA</h1>
          <p className="text-slate-500 max-w-2xl text-xl font-light italic">
            "Aesthetic purity is the result of technical precision. We architect the void into usable fields of information."
          </p>
        </header>

        {/* 01. COLOR PALETTE */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">01</span> Atoms::Color_Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PaletteColor color="bg-primary" label="Primary / Slate 950" value="hsl(222.2 84% 4.9%)" />
            <PaletteColor color="bg-secondary" label="Secondary / Slate 50" value="hsl(210 40% 98%)" isDark />
            <PaletteColor color="bg-accent" label="Accent / Cyan 400" value="hsl(189 94% 43%)" />
            <div className="p-4 border border-white/10 rounded liquid-glass">
              <div className="w-full h-24 mb-2 rounded border border-white/20 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest">Liquid / Glass</p>
            </div>
          </div>
        </section>

        {/* 02. BUTTON ARCHITECTURE */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">02</span> Atoms::Button_Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Standard Interactive Elements</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
            </div>
            <div className="space-y-8 p-8 border border-accent/20 bg-accent/5 rounded-xl">   
              <p className="text-[10px] text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={12} /> High_Visibility::Protocol_Variant
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="neo" size="md">ACCESS_NEO_PROTOCOL</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 03. LIQUID GLASS MOLECULES */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">03</span> Molecules::Liquid_Glass   
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InteractiveGlass className="p-12 rounded-3xl border border-white/10">
               <div className="flex items-center gap-3 mb-6">
                  <Droplets className="text-accent" size={18} />
                  <h3 className="text-2xl font-bold uppercase tracking-tighter">Refractive Surface</h3>
               </div>
               <p className="text-slate-400 font-light leading-relaxed mb-8">
                 Liquid Glass is the developer's signature container. It utilizes deep Gaussian blur, conically animated highlights, and internal refraction to create a sense of depth that feels "difficult to scale."
               </p>
               <Button variant="neo" size="sm">Verify_Integrity</Button>
            </InteractiveGlass>

            <div className="space-y-4">
               <Card className="hover:border-accent/50 bg-black/40 border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu size={14} className="text-accent" />
                      <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Morphic_Frame</span>
                    </div>
                    <CardTitle className="text-accent">Protocol_01</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">Standard architectural frame for metadata display.</p>
                  </CardContent>
               </Card>
               <SystemLog lines={['Initializing Design System...', 'Loading Signature Aesthetic...', 'Status: Operational']} />
               <SecureHandshake />
            </div>
          </div>
        </section>

        {/* 04. DYNAMIC LAYOUTS (SHELLS) */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">04</span> Organisms::Layout_Shells
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LayoutPreview icon={<Layout size={24}/>} title="Classic" desc="Structured metadata with integrated source mirrors." />
            <LayoutPreview icon={<Droplets size={24}/>} title="Immersive" desc="Full-screen cinematic focus with spatial focus." />
            <LayoutPreview icon={<Zap size={24}/>} title="Modern" desc="Liquid typography and asymmetric metadata grids." />
          </div>
        </section>

        {/* 05. SOURCE MIRROR */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">05</span> Organisms::Source_Mirror  
          </h2>
          <div className="max-w-5xl">
             <GithubEmbed 
                url="https://github.com/destroyallsecrets/mwa" 
                stats={{ stars: 128, forks: 12, issues: 0 }}
                className="min-h-[500px]" 
             />
          </div>
        </section>

        {/* 06. TYPOGRAPHY */}
        <section className="mb-32">
          <h2 className="text-2xl font-mono text-accent mb-8 border-b border-accent/20 pb-2 flex items-center gap-4">
            <span className="text-[10px] text-slate-700">06</span> Atoms::Typography
          </h2>
          <div className="space-y-12">
            <div>
              <p className="text-[10px] text-slate-600 mb-4 uppercase tracking-widest">Display_Huge</p>
              <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] uppercase">BIG_DATA</h1>
            </div>
            <div>
              <p className="text-[10px] text-slate-600 mb-4 uppercase tracking-widest">Mono_Spec</p>
              <p className="font-mono text-2xl text-accent uppercase tracking-tighter">System_Registry_v2.0_Stable</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

function PaletteColor({ color, label, value, isDark = false }: any) {
  return (
    <div className="p-4 border border-white/10 rounded bg-white/[0.02]">
      <div className={`w-full h-24 mb-4 rounded border border-white/10 ${color}`}></div>     
      <p className={`font-mono text-[10px] uppercase font-bold ${isDark ? 'text-slate-950 bg-white inline-block px-1' : 'text-white'}`}>
        {label}
      </p>
      <p className="font-mono text-[8px] text-slate-600 mt-1">{value}</p>
    </div>
  );
}

function LayoutPreview({ icon, title, desc }: any) {
  return (
    <div className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl hover:border-accent/30 transition-colors group">
      <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed uppercase font-bold tracking-widest text-[10px]">{desc}</p>
    </div>
  );
}

export default DesignSystem;