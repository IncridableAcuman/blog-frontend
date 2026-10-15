import React from 'react';
import { Sparkles, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#05070f]/90 py-8 px-6 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-lg bg-linear-to-tr from-purple-600 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-slate-200">NEXUS Blog Platform</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
            React 19 • Tailwind v4 • Vite
          </span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">Backend Ready:</span>
            <span className="font-mono text-cyan-400">prompt.txt</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for high-performance journalism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
