import React, { useState, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import type { BlogPost, PostStatus } from '../../types/blog';
import {
  Sparkles,
  Image as ImageIcon,
  Send,
  Eye,
  Tag
} from 'lucide-react';

export const PostEditorTab: React.FC = () => {
  const { editingPost, setEditingPost, createPost, updatePost, categories, setActiveTab } = useBlog();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Neural UI & UX');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<PostStatus>('Published');
  const [featured, setFeatured] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setCoverImage(editingPost.coverImage);
      setCategory(editingPost.category);
      setTagsInput(editingPost.tags.join(', '));
      setStatus(editingPost.status);
      setFeatured(Boolean(editingPost.featured));
    } else {
      // Clear form
      setTitle('');
      setExcerpt('');
      setContent('');
      setCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
      setCategory(categories[0]?.name || 'Neural UI & UX');
      setTagsInput('Tech, Innovation');
      setStatus('Published');
      setFeatured(false);
    }
  }, [editingPost, categories]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const postPayload: Partial<BlogPost> = {
      title,
      excerpt: excerpt || title.slice(0, 120),
      content,
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      category,
      tags: tags.length ? tags : ['General'],
      status,
      featured,
      readTime: estimatedReadTime,
    };

    if (editingPost) {
      await updatePost(editingPost.id, postPayload);
    } else {
      await createPost(postPayload);
    }

    setEditingPost(null);
    setActiveTab('posts');
  };

  const handleCancel = () => {
    setEditingPost(null);
    setActiveTab('posts');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Editor Header Banner */}
      <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{editingPost ? 'Article Revision Mode' : 'New Article Draft'}</span>
          </div>
          <h2 className="text-xl font-black text-white">
            {editingPost ? `Editing: ${editingPost.title}` : 'Draft Futuristic Story'}
          </h2>
          <p className="text-xs text-slate-400">
            Write using Markdown syntax. Live preview accurately mimics reader portal typography.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              showPreview
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showPreview ? 'Exit Preview' : 'Split Preview'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area: Title, Excerpt, Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Next-Gen Reactive State Architecture in 2026..."
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white font-bold placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Short Excerpt / Meta Description
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling one or two sentence teaser for the article card and search engines..."
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
            </div>

            {/* Content Editor & Live Preview */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Story Content (Markdown Supported)
                </label>
                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-semibold">{estimatedReadTime}</span>
                </div>
              </div>

              {showPreview ? (
                <div className="min-h-80 max-h-120 overflow-y-auto p-4 rounded-2xl bg-[#080c18] border border-white/5 text-slate-200 space-y-3 leading-relaxed text-xs">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    Live Render Preview
                  </div>
                  {content.split('\n\n').map((para, i) => {
                    if (para.startsWith('## ')) {
                      return <h2 key={i} className="text-base font-bold text-white mt-4">{para.replace('## ', '')}</h2>;
                    }
                    if (para.startsWith('### ')) {
                      return <h3 key={i} className="text-sm font-bold text-purple-300 mt-3">{para.replace('### ', '')}</h3>;
                    }
                    if (para.startsWith('> ')) {
                      return (
                        <blockquote key={i} className="border-l-2 border-purple-500 pl-3 italic text-slate-300 my-2">
                          {para.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return <p key={i} className="text-slate-300">{para}</p>;
                  })}
                </div>
              ) : (
                <textarea
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## Section Heading&#10;&#10;Write the narrative here. Use markdown for lists, code snippets and quotes..."
                  className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all leading-relaxed"
                />
              )}
            </div>
          </div>

          {/* Right Sidebar: Meta, Category, Cover, Tags */}
          <div className="space-y-5">
            {/* Publishing Settings */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
                Publishing Controls
              </h4>

              {/* Status */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Workflow Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PostStatus)}
                  className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/60"
                >
                  <option value="Published">Published (Live to public)</option>
                  <option value="Draft">Draft (Private)</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/60"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-300 font-medium">Spotlight Featured</span>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 bg-[#0a0f1d] border-white/20 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 flex items-center justify-between">
                <span>Cover Visual</span>
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              </h4>

              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/60"
              />

              {coverImage && (
                <div className="relative rounded-2xl overflow-hidden h-32 border border-white/10">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src =
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white/80 font-mono truncate">Cover Preview</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tags Input */}
            <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 flex items-center justify-between">
                <span>Article Tags</span>
                <Tag className="w-3.5 h-3.5 text-purple-400" />
              </h4>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="UI/UX, React 19, TypeScript"
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/60"
              />
              <p className="text-[10px] text-slate-500">Comma-separated tags for SEO & discovery.</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-7 py-2.5 rounded-2xl text-xs font-bold shadow-xl shadow-purple-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{editingPost ? 'Save Updates' : 'Publish Story'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
