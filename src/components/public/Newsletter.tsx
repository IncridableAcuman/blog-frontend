import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Mail, Sparkles, Send, ShieldCheck } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { notify } = useBlog();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    notify(`Thank you! ${email} has been subscribed to the Nexus Editorial Dispatch.`);
    setEmail('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-purple-950/60 via-[#0e1426] to-cyan-950/40 border border-purple-500/30 p-8 sm:p-12 shadow-2xl my-12">
      <div className="absolute right-0 top-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold text-purple-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Weekly Dispatch</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Stay Ahead of the Engineering Curve
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Join over 48,000 lead architects, designers, and systems engineers receiving our Sunday deep dives on React 19, neural interfaces, and distributed WASM.
        </p>

        <form onSubmit={handleSubscribe} className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email address..."
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-6 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Subscribe</span>
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero spam. Direct technical signal. Unsubscribe at any time.</span>
        </div>
      </div>
    </div>
  );
};
