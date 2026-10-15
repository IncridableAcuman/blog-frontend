import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import {
  X,
  Heart,
  Bookmark,
  Share2,
  Clock,
  MessageSquare,
  Send
} from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const {
    readingPost,
    setReadingPost,
    likePost,
    toggleBookmark,
    bookmarks,
    comments,
    addComment,
    posts,
    notify
  } = useBlog();

  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  if (!readingPost) return null;

  const isBookmarked = bookmarks.includes(readingPost.id);
  const postComments = comments.filter((c) => c.postId === readingPost.id && c.status === 'Approved');
  const relatedPosts = posts
    .filter((p) => p.id !== readingPost.id && p.category === readingPost.category)
    .slice(0, 2);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) return;

    await addComment(readingPost.id, commentText, commentName, commentEmail || 'reader@nexus.io');
    setCommentText('');
    setCommentName('');
    setCommentEmail('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    notify('Article link copied to clipboard! Share anywhere.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0a0e1c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Sticky Header inside modal */}
        <div className="sticky top-0 z-20 bg-[#0a0e1c]/95 backdrop-blur-xl border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {readingPost.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-medium flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingPost.readTime}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => likePost(readingPost.id)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-white/5 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs font-bold">{readingPost.likes}</span>
            </button>

            <button
              onClick={() => toggleBookmark(readingPost.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-white/5 text-slate-300 border-white/5 hover:text-white'
              }`}
              title="Bookmark story"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/5 transition-colors"
              title="Share story"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setReadingPost(null)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {readingPost.title}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {readingPost.excerpt}
            </p>

            {/* Author info & publication date */}
            <div className="flex items-center space-x-4 pt-3 border-t border-white/5">
              <img
                src={readingPost.author.avatar}
                alt={readingPost.author.name}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-purple-500/30"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{readingPost.author.name}</h4>
                <p className="text-xs text-slate-400">
                  {readingPost.author.role} • Published {readingPost.createdAt}
                </p>
              </div>
            </div>
          </div>

          {/* Large Cover Visual */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-21/9 max-h-96">
            <img
              src={readingPost.coverImage}
              alt={readingPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Narrative Body */}
          <div className="max-w-3xl space-y-5 text-slate-200 text-sm sm:text-base leading-relaxed">
            {readingPost.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4">
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-cyan-300 pt-3">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-purple-500 bg-purple-500/5 p-4 rounded-r-2xl italic text-slate-200 text-base"
                  >
                    {block.replace('> ', '')}
                  </blockquote>
                );
              }
              if (block.startsWith('```')) {
                const codeContent = block.replace(/```[a-z]*\n/, '').replace(/```$/, '');
                return (
                  <pre
                    key={idx}
                    className="p-4 rounded-2xl bg-[#05070f] border border-white/10 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner"
                  >
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return <p key={idx} className="text-slate-300">{block}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Tags:</span>
            {readingPost.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Discussion & Comments section */}
          <div className="pt-8 border-t border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Discussion ({postComments.length})</span>
              </h3>
            </div>

            {/* Existing comments */}
            <div className="space-y-4">
              {postComments.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Be the first to share an insight or question regarding this story!
                </p>
              ) : (
                postComments.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs">
                          {c.authorName.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-white">{c.authorName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 pl-9 leading-relaxed">{c.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave a comment form */}
            <form
              onSubmit={handleCommentSubmit}
              className="p-5 rounded-3xl bg-[#070b16] border border-white/8 space-y-3"
            >
              <h4 className="text-xs font-bold text-white">Join the Conversation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-[#0e1426] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="bg-[#0e1426] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder="What are your thoughts on this topic?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-[#0e1426] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Related stories section */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white">More from {readingPost.category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setReadingPost(rel)}
                      className="p-3.5 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 flex items-center space-x-3 cursor-pointer transition-all group"
                    >
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate">
                          {rel.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">{rel.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
