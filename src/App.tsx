import { useState } from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { PostsTab } from './components/dashboard/PostsTab';
import { PostEditorTab } from './components/dashboard/PostEditorTab';
import { CategoriesTab } from './components/dashboard/CategoriesTab';
import { CommentsTab } from './components/dashboard/CommentsTab';
import { AnalyticsTab } from './components/dashboard/AnalyticsTab';
import { UsersTab } from './components/dashboard/UsersTab';
import { SettingsTab } from './components/dashboard/SettingsTab';
import { PublicPortal } from './components/public/PublicPortal';
import { ArticleModal } from './components/public/ArticleModal';

function BlogApp() {
  const { mode, activeTab } = useBlog();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden relative selection:bg-purple-600 selection:text-white">
      {/* Background ambient futuristic lighting */}
      <div className="fixed top-0 left-0 w-120 h-120 bg-linear-to-br from-purple-900/15 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-0 w-120 h-120 bg-linear-to-bl from-cyan-600/10 via-purple-900/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Universal Top Header */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Area depending on active mode (Admin Studio vs Public Portal) */}
      {mode === 'admin' ? (
        <div className="flex-1 flex">
          {/* Admin Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Admin Content Container */}
          <main className="flex-1 md:ml-64 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
            {activeTab === 'dashboard' && <OverviewTab />}
            {activeTab === 'posts' && <PostsTab />}
            {activeTab === 'editor' && <PostEditorTab />}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'comments' && <CommentsTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </main>
        </div>
      ) : (
        /* Public Portal Container */
        <main className="flex-1">
          <PublicPortal />
        </main>
      )}

      {/* Article Reader Modal (Works everywhere) */}
      <ArticleModal />

      {/* Global Toast Stack */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <BlogApp />
    </BlogProvider>
  );
}