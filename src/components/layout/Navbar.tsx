import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  Globe, 
  LayoutDashboard, 
  Bell, 
  Menu,
  Bookmark
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { 
    mode, 
    setMode, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    bookmarks,
    notify 
  } = useBlog();

  return (
    <header className="sticky top-0 z-40 bg-[#070913]/80 backdrop-blur-2xl border-b border-white/8 px-6 py-3.5 flex items-center justify-between transition-all">
      {/* Left: Mobile menu & Logo / Breadcrumb */}
      <div className="flex items-center space-x-4">
        {mode === 'admin' && onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div 
          onClick={() => {
            if (mode === 'admin') setActiveTab('dashboard');
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-purple-300 text-base">
                NEXUS
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                CMS v2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              {mode === 'admin' ? 'Editorial Operations Console' : 'Creative Dev & Design Journal'}
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Universal Search */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={mode === 'admin' ? "Search articles, tags, authors..." : "Search topics, tutorials, insights..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1222]/90 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right: Mode Switcher, Actions & Profile */}
      <div className="flex items-center space-x-3">
        {/* Toggle Mode Button: Admin vs Public Portal */}
        <div className="bg-[#0e1424] p-1 rounded-2xl border border-white/10 flex items-center">
          <button
            onClick={() => setMode('public')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'public'
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public View</span>
          </button>
          <button
            onClick={() => setMode('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'admin'
                ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>

        {/* Quick Create Post button (Admin) */}
        {mode === 'admin' && (
          <button
            onClick={() => {
              setActiveTab('editor');
            }}
            className="flex items-center space-x-1.5 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-3.5 py-2 rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden lg:inline">New Post</span>
          </button>
        )}

        {/* Public portal: Bookmarks badge */}
        {mode === 'public' && (
          <button
            onClick={() => notify(`You have ${bookmarks.length} articles saved in your reading list.`)}
            className="relative p-2 rounded-2xl bg-[#0e1424] border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 transition-all"
            title="Saved Stories"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>
        )}

        {/* Notifications Icon */}
        <button
          onClick={() => notify('Nexus Sync: All local updates are synced with local state.')}
          className="relative p-2 rounded-2xl bg-[#0e1424] border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#070913] animate-pulse"></span>
        </button>

        {/* User Mini Profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-white/10">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Mark Johnson"
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-purple-500/30"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-200 leading-tight">Mark Johnson</p>
            <p className="text-[10px] text-cyan-400 font-medium">Lead Architect</p>
          </div>
        </div>
      </div>
    </header>
  );
};
