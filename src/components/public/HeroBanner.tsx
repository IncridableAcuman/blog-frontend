import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { Sparkles, ArrowRight, Clock, Eye } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { posts, setReadingPost } = useBlog();

  const featured = posts.find((p) => p.featured && p.status === 'Published') || posts[0];

  if (!featured) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#121831] via-[#0d1326] to-[#070913] border border-white/10 shadow-2xl p-6 sm:p-10 mb-10">
      {/* Dynamic glow orbs in background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Featured Text & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Spotlight Story</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
            {featured.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
            {featured.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <div className="flex items-center space-x-2">
              <img
                src={featured.author.avatar}
                alt={featured.author.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-500/40"
              />
              <span className="text-slate-200 font-semibold">{featured.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{featured.readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>{featured.views.toLocaleString()} reads</span>
            </div>
          </div>

          <div className="pt-4 flex items-center space-x-3">
            <button
              onClick={() => setReadingPost(featured)}
              className="flex items-center space-x-2 bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-xl shadow-purple-600/30 transition-all group"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {featured.category}
            </span>
          </div>
        </div>

        {/* Right Column: Visual Cover */}
        <div className="lg:col-span-5">
          <div
            onClick={() => setReadingPost(featured)}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group aspect-16/10"
          >
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#070913]/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                Click to explore reader experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
