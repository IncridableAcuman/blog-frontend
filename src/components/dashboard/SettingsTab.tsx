import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Settings, Save, Server, ShieldCheck, Globe, Terminal } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { notify } = useBlog();

  const [siteName, setSiteName] = useState('Nexus High-Fidelity Blog Platform');
  const [tagline, setTagline] = useState('Futuristic Insights into Neural UI, React 19 & Edge Systems');
  const [apiUrl, setApiUrl] = useState('http://localhost:5000/api');
  const [allowComments, setAllowComments] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('System configurations and API endpoints successfully saved!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-black text-white flex items-center space-x-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <span>System & Editorial Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure publication identity, backend API connectivity, and discussion moderation rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Publication Identity */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-3">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Publication Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Publication Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Editorial Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Backend & API Connectivity */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-3">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Backend Integration (prompt.txt Sync)</span>
          </h3>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Backend REST API Base URL
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:5000/api"
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Currently running in high-fidelity mock & LocalStorage mode. When your backend from prompt.txt is started, requests will automatically proxy to this endpoint.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-start space-x-3">
            <Terminal className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-cyan-300">Backend Blueprint Synchronized</p>
              <p className="text-slate-400 mt-0.5">
                Full database schemas, JWT authentication, and endpoints are detailed in <span className="font-mono text-white">prompt.txt</span> at the root directory.
              </p>
            </div>
          </div>
        </div>

        {/* Discussion Moderation Rules */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Discussion Governance</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">Allow Public Readers to Comment</p>
                <p className="text-[11px] text-slate-400">Readers can post feedback without mandatory account registration.</p>
              </div>
              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) => setAllowComments(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 bg-[#0a0f1d] border-white/20"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <p className="text-xs font-bold text-slate-200">Auto-Approve Verified Comments</p>
                <p className="text-[11px] text-slate-400">Automatically publish comments that pass heuristic spam filters.</p>
              </div>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 bg-[#0a0f1d] border-white/20"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-6 py-2.5 rounded-2xl text-xs font-bold shadow-xl shadow-purple-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
