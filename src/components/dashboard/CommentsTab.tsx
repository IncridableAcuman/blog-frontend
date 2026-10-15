import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { MessageSquare, Check, Trash2, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const CommentsTab: React.FC = () => {
  const { comments, updateCommentStatus, deleteComment } = useBlog();
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Spam'>('All');

  const filtered = comments.filter((c) => (filter === 'All' ? true : c.status === filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span>Discussion Moderation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Approve genuine community discourse and combat automated spam injections.
          </p>
        </div>

        {/* Status tabs */}
        <div className="flex items-center space-x-1 bg-[#0a0f1d] p-1 rounded-2xl border border-white/10">
          {(['All', 'Approved', 'Pending', 'Spam'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 rounded-3xl shadow-xl overflow-hidden divide-y divide-white/5">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
            <p className="text-xs font-bold text-slate-300">No comments found in this view.</p>
          </div>
        ) : (
          filtered.map((comment) => (
            <div key={comment.id} className="p-5 hover:bg-white/1 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  {comment.authorAvatar ? (
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold text-xs">
                      {comment.authorName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-white">{comment.authorName}</span>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      {comment.authorEmail}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-2">• {comment.createdAt}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      comment.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : comment.status === 'Pending'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {comment.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 pl-12 leading-relaxed">{comment.content}</p>

              <div className="pl-12 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-purple-400 font-medium">
                  On article: <strong className="text-slate-300">{comment.postTitle || 'General Discussion'}</strong>
                </span>

                <div className="flex items-center space-x-2">
                  {comment.status !== 'Approved' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'Approved')}
                      className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  {comment.status !== 'Spam' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'Spam')}
                      className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition-colors"
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>Spam</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="Delete Comment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
