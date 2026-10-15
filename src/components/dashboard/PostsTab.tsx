import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import type { BlogPost, PostStatus } from '../../types/blog';
import {
  FileText,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Archive,
  ChevronDown
} from 'lucide-react';

export const PostsTab: React.FC = () => {
  const {
    posts,
    categories,
    deletePost,
    setEditingPost,
    setActiveTab,
    setReadingPost
  } = useBlog();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PostStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter logic
  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setActiveTab('editor');
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deletePost(id);
    }
  };

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case 'Published':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Published</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            <span>Under Review</span>
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-300 border border-slate-500/20">
            <AlertCircle className="w-3 h-3" />
            <span>Draft</span>
          </span>
        );
      case 'Archived':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Archive className="w-3 h-3" />
            <span>Archived</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Articles & Publications</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your content pipeline, status approvals and multi-channel publication.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPost(null);
            setActiveTab('editor');
          }}
          className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-4 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#0a0f1d] border border-white/10 text-slate-300 text-xs rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:border-purple-500/60 transition-all cursor-pointer appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Archived">Archived</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#0a0f1d] border border-white/10 text-slate-300 text-xs rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:border-purple-500/60 transition-all cursor-pointer appearance-none"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/8 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white/2">
                <th className="py-4 px-6">Article & Author</th>
                <th className="py-4 px-4">Category & Tags</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Performance</th>
                <th className="py-4 px-4">Published Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No articles found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-white/2 transition-colors group">
                    {/* Title & Author */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3 max-w-md">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-white/10"
                        />
                        <div className="min-w-0">
                          <button
                            onClick={() => setReadingPost(post)}
                            className="text-left font-bold text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-1 text-xs"
                          >
                            {post.title}
                          </button>
                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-0.5">
                            <span>by {post.author.name}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Tags */}
                    <td className="py-4 px-4">
                      <span className="text-purple-400 font-semibold block">{post.category}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white/5 text-slate-300 px-1.5 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">{getStatusBadge(post.status)}</td>

                    {/* Views & Likes */}
                    <td className="py-4 px-4">
                      <div className="text-slate-200 font-semibold">{post.views.toLocaleString()} views</div>
                      <div className="text-[11px] text-slate-400">{post.likes.toLocaleString()} likes</div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-400 font-medium">{post.createdAt}</td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setReadingPost(post)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                          title="Preview Article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-purple-500/20 text-purple-400 transition-colors"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
