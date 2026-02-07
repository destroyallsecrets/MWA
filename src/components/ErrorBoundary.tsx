import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Terminal, RefreshCcw } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[NEXUS_CRASH]: Critical rendering failure:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-12 text-center font-mono">
          <div className="p-8 liquid-glass rounded-2xl border border-red-500/20 max-w-md">   
            <Terminal size={48} className="text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">Registry_Corruption_Detected</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-8 leading-loose">
              An unhandled exception has halted the extraction sequence. Manual reset required to restore system integrity.
            </p>
            <Button
              variant="neo"
              className="w-full gap-2"
              onClick={() => window.location.reload()}
            >
              INITIALIZE_RESET <RefreshCcw size={14} />
            </Button>
            {this.state.error && (
              <div className="mt-8 p-4 bg-black/40 rounded border border-white/5 text-[8px] text-red-400 text-left overflow-hidden">
                ERROR::{this.state.error.message.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
