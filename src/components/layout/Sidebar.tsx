import React from 'react';
import { useBlog } from '../../context/BlogContext';
import type { ActiveTabType } from '../../context/BlogContext';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  FolderTree,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  X,
  Sparkles,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, posts, comments, notify } = useBlog();

  const pendingCommentsCount = comments.filter((c) => c.status === 'Pending').length;

  const navItems: { id: ActiveTabType; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'posts', label: 'All Articles', icon: FileText, badge: posts.length },
    { id: 'editor', label: 'Write Story', icon: PenTool },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { 
      id: 'comments', 
      label: 'Comments', 
      icon: MessageSquare, 
      badge: pendingCommentsCount > 0 ? `${pendingCommentsCount} new` : undefined 
    },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Authors & Roles', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0e1c]/95 backdrop-blur-2xl border-r border-white/8 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-md shadow-purple-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-wide text-white">NEXUS STUDIO</span>
              <p className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">Editorial CMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">
            Workspace Hub
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-purple-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Backend spec indicator box */}
        <div className="p-4 m-3 rounded-2xl bg-linear-to-br from-[#121933] to-[#0d1429] border border-cyan-500/20 relative overflow-hidden">
          <div className="flex items-center space-x-2 text-cyan-400 mb-2">
            <Terminal className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wide">prompt.txt Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            Full REST API spec & backend tasks are synchronized for server deployment.
          </p>
          <button
            onClick={() => notify('API Blueprint prompt.txt is configured in root workspace.')}
            className="w-full flex items-center justify-center space-x-1 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-300 text-[11px] font-bold transition-all"
          >
            <span>Inspect Spec</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </aside>
    </>
  );
};
