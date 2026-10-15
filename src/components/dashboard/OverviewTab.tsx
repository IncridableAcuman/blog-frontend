import React from 'react';
import { useBlog } from '../../context/BlogContext';
import {
  FileText,
  MessageSquare,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Eye,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { posts, comments, stats, setActiveTab, setReadingPost, updateCommentStatus } = useBlog();

  const publishedPosts = posts.filter((p) => p.status === 'Published');
  const recentPosts = posts.slice(0, 4);
  const pendingComments = comments.filter((c) => c.status === 'Pending').slice(0, 3);

  const kpis = [
    {
      title: 'Total Impressions',
      value: stats.totalViews.toLocaleString(),
      change: stats.viewsChange,
      icon: Eye,
      color: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    },
    {
      title: 'Published Stories',
      value: publishedPosts.length.toString(),
      change: stats.postsChange,
      icon: FileText,
      color: 'from-blue-600 to-cyan-500',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    },
    {
      title: 'Reader Feedback',
      value: comments.length.toString(),
      change: stats.commentsChange,
      icon: MessageSquare,
      color: 'from-cyan-500 to-teal-500',
      badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    },
    {
      title: 'Satisfaction Score',
      value: `${stats.satisfactionRate}%`,
      change: stats.satisfactionChange,
      icon: TrendingUp,
      color: 'from-indigo-600 to-rose-500',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl shadow-xl hover:border-purple-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div
                  className={`w-10 h-10 rounded-2xl bg-linear-to-tr ${kpi.color} flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-white">{kpi.value}</h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${kpi.badgeBg}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Futuristic Welcome Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border border-purple-500/30 p-8 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-400 via-purple-600 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Intelligence System Active</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">
            Welcome to Nexus Studio, Mark
          </h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Your recent publication <span className="text-cyan-300 font-semibold">"The Future of Neural UI Design"</span> is leading engagement with 34.8K reads and 96% positive retention this week.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('editor')}
              className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-xl shadow-purple-600/30 transition-all"
            >
              <span>Draft New Publication</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all"
            >
              Manage Catalog ({posts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Feedback Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Views Chart */}
        <div className="lg:col-span-2 bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Traffic & Engagement Velocity</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Live Feed
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily unique readers across all syndicated channels.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
            >
              <span>Detailed Metrics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bar chart representation */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {stats.weeklyViews.map((item, idx) => {
              const maxView = 25000;
              const heightPercent = Math.round((item.views / maxView) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] text-cyan-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {(item.views / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full bg-white/5 rounded-2xl h-40 flex items-end p-1 overflow-hidden">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-linear-to-t from-purple-600 via-indigo-600 to-cyan-400 rounded-xl group-hover:from-purple-500 group-hover:to-cyan-300 transition-all duration-500 shadow-lg shadow-purple-500/20"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reader Sentiment Circle & Category breakdown */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Reader Satisfaction</h3>
            <p className="text-xs text-slate-400">Aggregated from likes, comments and bounce rate.</p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/5"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-cyan-400"
                  fill="transparent"
                  strokeDasharray="377"
                  strokeDashoffset="26"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-white">96.8%</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Top Tier
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Topic Popularity
            </p>
            {stats.categoryDistribution.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-300">{cat.name}</span>
                </div>
                <span className="font-bold text-slate-200">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Posts & Pending Comment Moderation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Recent Stories</span>
            </h3>
            <button
              onClick={() => setActiveTab('posts')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300"
            >
              View All ({posts.length})
            </button>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setReadingPost(post)}
                className="p-3.5 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 cursor-pointer transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-white/10"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                      <span className="text-purple-400 font-medium">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>{post.views.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      post.status === 'Published'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {post.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Moderation Queue */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Moderation Radar</span>
            </h3>
            <button
              onClick={() => setActiveTab('comments')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Full Queue
            </button>
          </div>

          <div className="space-y-3">
            {pendingComments.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
                <p className="text-xs font-medium">All comments moderated! No pending items.</p>
              </div>
            ) : (
              pendingComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3.5 rounded-2xl bg-white/2 border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{comment.authorName}</span>
                    <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{comment.content}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-purple-400 truncate max-w-48">
                      On: {comment.postTitle || 'Article'}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCommentStatus(comment.id, 'Approved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] font-bold transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateCommentStatus(comment.id, 'Spam')}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[10px] font-bold transition-colors"
                      >
                        Mark Spam
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
