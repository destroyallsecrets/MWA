import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-[#ccc] font-mono selection:bg-[#333]">
        <div className="min-h-screen border-x border-[#1a1a1a] max-w-5xl mx-auto">
          <header className="p-6 border-b border-[#1a1a1a] flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-white">FUSION//CLOUD</h1>
              <p className="text-[10px] text-[#666]">OUTSIDE WE STAND ETERNALLY // SECURITY LEDGER</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-[#666]">SYS_LINK_ACTIVE</span>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
