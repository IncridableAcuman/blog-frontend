import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  FolderKanban, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight, 
  Send,
  Bookmark,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft' | 'Under Review';
  views: number;
  likes: number;
  date: string;
  author: string;
}

type ActiveTableType='dashboard' | 'posts' | 'new-post' | 'categories' | 'comments' | 'analytics' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTableType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Blog posts state
  const [posts, setPosts] = useState<BlogPost[]>([
    { id: '1', title: 'The Future of Neural UI Design in 2026', category: 'UI/UX', status: 'Published', views: 24500, likes: 1240, date: 'May 12, 2026', author: 'Mark Johnson' },
    { id: '2', title: 'Mastering React 19 Concurrent Features', category: 'Development', status: 'Published', views: 18200, likes: 980, date: 'May 10, 2026', author: 'Mark Johnson' },
    { id: '3', title: 'Building Immersive Glassmorphism Dashboards', category: 'Design', status: 'Under Review', views: 5400, likes: 310, date: 'May 08, 2026', author: 'Sarah Connor' },
    { id: '4', title: 'TypeScript 5.8 Advanced Pattern Matching', category: 'Development', status: 'Draft', views: 0, likes: 0, date: 'May 05, 2026', author: 'Mark Johnson' },
    { id: '5', title: 'Optimizing Web Performance with WASM', category: 'Engineering', status: 'Published', views: 32100, likes: 2150, date: 'May 01, 2026', author: 'Alex Rivers' },
  ]);

  // New post form state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Development');
  const [newPostContent, setNewPostContent] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      category: newPostCategory,
      status: 'Published',
      views: 120,
      likes: 12,
      date: 'Just now',
      author: 'Mark Johnson'
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    showNotification('Blog post successfully published!');
    setActiveTab('posts');
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    showNotification('Post deleted successfully.');
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#060919] text-white font-sans antialiased overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Background glow effects matching reference style */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-linear-to-br from-purple-900/20 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-100 h-100 bg-linear-to-bl from-cyan-600/10 via-purple-800/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#1a1f37]/90 border border-purple-500/50 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl shadow-purple-500/20 flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="flex h-screen overflow-hidden">
        
        {}
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b0f19]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-linear-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">NEXUS BLOG</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Management</p>
            <nav className="space-y-1.5">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'posts', label: 'All Posts', icon: FileText, badge: posts.length },
                { id: 'new-post', label: 'Add New Post', icon: PlusCircle },
                { id: 'categories', label: 'Categories', icon: FolderKanban },
                { id: 'comments', label: 'Comments', icon: MessageSquare, badge: '12' },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as ActiveTableType); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive 
                        ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 font-medium' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-purple-900/50 text-purple-300 border border-purple-500/20'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Help Card inside sidebar */}
          <div className="mt-auto p-4 m-4 rounded-2xl bg-linear-to-br from-purple-900/40 to-blue-900/20 border border-purple-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/25 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-purple-600/40 border border-purple-400/30 flex items-center justify-center mb-3 text-purple-300">
                <Bookmark className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Need Pro Support?</h4>
              <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">Check our advanced SEO & AI publishing docs.</p>
              <button onClick={() => showNotification('Opening documentation guide...')} className="w-full py-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-500/25 transition-all">
                Documentation
              </button>
            </div>
          </div>
        </aside>

        {}
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-64 h-screen overflow-y-auto">
          
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-[#060919]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <span>Pages</span>
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span className="text-purple-400 capitalize">{activeTab.replace('-', ' ')}</span>
                </div>
                <h1 className="text-lg font-bold text-white capitalize">{activeTab.replace('-', ' ')} Overview</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111629] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 w-64 transition-all"
                />
              </div>

              <button onClick={() => showNotification('No new notifications')} className="relative p-2.5 rounded-2xl bg-[#111629] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40 transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400"></span>
              </button>

              <button onClick={() => setActiveTab('new-post')} className="hidden sm:flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-2xl text-sm font-medium shadow-lg shadow-purple-500/25 transition-all">
                <PlusCircle className="w-4 h-4" />
                <span>Create Post</span>
              </button>

              <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
                <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/30">
                  MJ
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-white">Mark Johnson</div>
                  <div className="text-[10px] text-gray-400">Lead Editor</div>
                </div>
              </div>
            </div>
          </header>

          {}
          {/* Dynamic Content Views */}
          <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
            
            {/* VIEW 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <>
                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { title: 'Total Blog Posts', value: '142', change: '+12%', icon: FileText, color: 'from-purple-600 to-blue-600' },
                    { title: 'Active Readers', value: '48.5K', change: '+24%', icon: Users, color: 'from-purple-600 to-cyan-500' },
                    { title: 'Total Comments', value: '1,892', change: '+8%', icon: MessageSquare, color: 'from-blue-600 to-cyan-400' },
                    { title: 'Engagement Rate', value: '94.2%', change: '+5.4%', icon: TrendingUp, color: 'from-indigo-600 to-purple-600' },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-xl hover:border-purple-500/40 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-gray-400">{stat.title}</span>
                          <div className={`w-10 h-10 rounded-2xl bg-linear-to-tr ${stat.color} flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                          <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-xl border border-cyan-400/20">{stat.change}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Welcome Hero Banner inspired by reference image */}
                <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-purple-950/80 via-indigo-950/80 to-blue-950/80 border border-purple-500/30 p-8 shadow-2xl">
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent pointer-events-none"></div>
                  <div className="relative z-10 max-w-xl">
                    <span className="text-xs font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">Welcome back, Editor</span>
                    <h2 className="text-3xl font-extrabold text-white mt-3 mb-2">Mark Johnson</h2>
                    <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                      Your recent article <span className="text-cyan-300 font-semibold">"The Future of Neural UI Design"</span> reached 24.5K views today. Keep up the amazing work!
                    </p>
                    <button onClick={() => setActiveTab('new-post')} className="flex items-center space-x-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-2xl font-semibold text-sm shadow-xl transition-all group">
                      <span>Publish New Story</span>
                      <ChevronRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Analytics & Satisfaction Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Reader Satisfaction Card */}
                  <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Reader Satisfaction</h3>
                      <p className="text-xs text-gray-400">Based on article feedback & likes</p>
                    </div>
                    <div className="py-8 flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" className="text-white/5" fill="transparent" />
                          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" className="text-cyan-400" fill="transparent" strokeDasharray="440" strokeDashoffset="44" strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-bold text-white">95%</span>
                          <span className="text-[11px] text-cyan-400 font-medium">Positive Rating</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-950/40 border border-purple-500/20 rounded-2xl p-4 text-center">
                      <p className="text-xs text-gray-300">🎉 Top 5% performing publisher in UI/UX category this month.</p>
                    </div>
                  </div>

                  {/* Recent Activity / Performance Chart */}
                  <div className="lg:col-span-2 bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white">Views Overview</h3>
                        <p className="text-xs text-gray-400"><span className="text-cyan-400 font-semibold">(+18%) more</span> than last week</p>
                      </div>
                      <button onClick={() => setActiveTab('analytics')} className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1">
                        <span>Full Report</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Simulated Bar Chart */}
                    <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
                      {[35, 65, 45, 80, 95, 60, 85, 100, 75, 90, 82, 98].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full bg-white/5 rounded-t-xl h-full flex items-end overflow-hidden">
                            <div 
                              style={{ height: `${val}%` }} 
                              className="w-full bg-linear-to-t from-purple-600 to-cyan-400 rounded-t-xl group-hover:from-purple-500 group-hover:to-cyan-300 transition-all duration-500 shadow-lg shadow-purple-500/20"
                            />
                          </div>
                          <span className="text-[10px] text-gray-500">M{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* VIEW 2: ALL POSTS TABLE */}
            {activeTab === 'posts' && (
              <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">All Blog Posts</h3>
                    <p className="text-xs text-gray-400">Manage and oversee all published and draft articles.</p>
                  </div>
                  <button onClick={() => setActiveTab('new-post')} className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 text-white px-4 py-2.5 rounded-2xl text-sm font-medium shadow-lg shadow-purple-500/25">
                    <PlusCircle className="w-4 h-4" />
                    <span>Create New Post</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-white/1">
                        <th className="py-4 px-6">Title & Category</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Views</th>
                        <th className="py-4 px-6">Likes</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-white/2 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">{post.title}</div>
                            <div className="text-xs text-purple-400/80 font-medium mt-0.5">{post.category}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                              post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              post.status === 'Under Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            }`}>
                              {post.status === 'Published' && <CheckCircle2 className="w-3 h-3" />}
                              {post.status === 'Under Review' && <Clock className="w-3 h-3" />}
                              {post.status === 'Draft' && <AlertCircle className="w-3 h-3" />}
                              <span>{post.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-300 font-medium">{post.views.toLocaleString()}</td>
                          <td className="py-4 px-6 text-gray-300 font-medium">{post.likes.toLocaleString()}</td>
                          <td className="py-4 px-6 text-xs text-gray-400">{post.date}</td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button onClick={() => showNotification(`Editing post: ${post.title}`)} className="p-2 rounded-xl bg-white/5 hover:bg-purple-600/20 text-purple-400 transition-all">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeletePost(post.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 3: ADD NEW POST */}
            {activeTab === 'new-post' && (
              <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
                <div className="mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>Create New Blog Post</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Draft and publish your article to the Nexus network instantly.</p>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Post Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., The Future of Quantum AI..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                        className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="UI/UX">UI/UX Design</option>
                        <option value="Development">Development</option>
                        <option value="Engineering">Engineering</option>
                        <option value="AI & ML">AI & Machine Learning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Author</label>
                      <input
                        type="text"
                        disabled
                        value="Mark Johnson"
                        className="w-full bg-[#0b0f19]/50 border border-white/5 rounded-2xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Article Content / Markdown</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Write your amazing blog post content here..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setActiveTab('posts')}
                      className="px-6 py-3 rounded-2xl text-sm font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-8 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-purple-500/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publish Article</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VIEW 4: CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'UI/UX Design', count: 42, color: 'from-purple-600 to-indigo-600', desc: 'Design systems, accessibility and futuristic visual trends.' },
                  { name: 'Development', count: 68, color: 'from-blue-600 to-cyan-500', desc: 'React, TypeScript, Next.js and high performance web architecture.' },
                  { name: 'Engineering', count: 32, color: 'from-indigo-600 to-purple-600', desc: 'Backend systems, cloud infrastructure and database scaling.' },
                ].map((cat, idx) => (
                  <div key={idx} className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl hover:border-purple-500/40 transition-all group">
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${cat.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform`}>
                      <FolderKanban className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">{cat.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs font-semibold text-purple-400">{cat.count} Articles</span>
                      <button onClick={() => showNotification(`Viewing ${cat.name} category`)} className="text-xs text-cyan-400 hover:underline">Explore</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 5: COMMENTS */}
            {activeTab === 'comments' && (
              <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-bold text-white">Recent Comments</h3>
                  <p className="text-xs text-gray-400">Moderate and reply to reader discussions.</p>
                </div>
                {[
                  { user: 'Elena Rostova', comment: 'Amazing breakdown of React 19 concurrent features! Helped me refactor our codebase.', post: 'Mastering React 19', time: '2 hours ago' },
                  { user: 'Marcus Vance', comment: 'The dark glassmorphism aesthetic in this tutorial is top notch.', post: 'The Future of Neural UI Design', time: '5 hours ago' },
                  { user: 'Sophia Lee', comment: 'Looking forward to Part 2 of the WASM optimization guide.', post: 'Optimizing Web Performance', time: '1 day ago' },
                ].map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-white">{c.user}</span>
                        <span className="text-[10px] text-gray-500">• {c.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{c.comment}</p>
                      <span className="text-[11px] text-purple-400 font-medium">On: {c.post}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => showNotification('Comment approved')} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all">Approve</button>
                      <button onClick={() => showNotification('Comment deleted')} className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 6: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2">Total Impressions</h4>
                    <div className="text-3xl font-bold text-white mb-1">142.8K</div>
                    <span className="text-xs text-cyan-400">+14.2% this week</span>
                  </div>
                  <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2">Avg. Reading Time</h4>
                    <div className="text-3xl font-bold text-white mb-1">4m 32s</div>
                    <span className="text-xs text-purple-400">+32s vs last month</span>
                  </div>
                  <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2">Subscriber Conversion</h4>
                    <div className="text-3xl font-bold text-white mb-1">8.4%</div>
                    <span className="text-xs text-emerald-400">+1.2% growth</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 7: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-[#111629]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-bold text-white">Dashboard Settings</h3>
                  <p className="text-xs text-gray-400">Configure your author profile and blog preferences.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Display Name</label>
                    <input type="text" defaultValue="Mark Johnson" className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" defaultValue="mark.johnson@nexusblog.io" className="w-full bg-[#0b0f19] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => showNotification('Settings saved successfully!')} className="bg-linear-to-r from-purple-600 to-cyan-500 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-purple-500/25">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>

          {/* Footer */}
          <footer className="mt-auto py-6 px-6 text-center text-xs text-gray-500 border-t border-white/5">
            © 2026 Nexus Blog Management Dashboard. Inspired by Vision UI futuristic glassmorphism style.
          </footer>
        </div>

      </div>
    </div>
  );
}