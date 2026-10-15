import React from 'react';
import type { BlogPost } from '../../types/blog';
import { useBlog } from '../../context/BlogContext';
import { Clock, Heart, Bookmark } from 'lucide-react';

interface ArticleCardProps {
  post: BlogPost;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const { setReadingPost, likePost, toggleBookmark, bookmarks } = useBlog();

  const isBookmarked = bookmarks.includes(post.id);

  return (
    <article className="group bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 rounded-3xl overflow-hidden shadow-xl hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image Container */}
        <div
          onClick={() => setReadingPost(post)}
          className="relative aspect-16/9 overflow-hidden cursor-pointer"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as any).src =
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e1426] via-transparent to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0a0f1d]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {post.category}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(post.id);
              }}
              className={`p-1.5 rounded-xl backdrop-blur-md transition-all ${
                isBookmarked
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                  : 'bg-[#0a0f1d]/70 text-slate-300 hover:text-white hover:bg-black/80'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-2.5">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-medium text-purple-400/80 bg-purple-500/5 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h3
            onClick={() => setReadingPost(post)}
            className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {post.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Author & Metrics */}
      <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-500/30"
          />
          <span className="text-slate-300 text-[11px] font-semibold">{post.author.name}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 transition-colors group/btn"
          >
            <Heart className="w-3.5 h-3.5 group-hover/btn:scale-125 transition-transform" />
            <span className="text-[11px]">{post.likes}</span>
          </button>

          <span className="text-slate-600">•</span>

          <div className="flex items-center space-x-1 text-[11px]">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
