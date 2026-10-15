import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { HeroBanner } from './HeroBanner';
import { ArticleCard } from './ArticleCard';
import { Newsletter } from './Newsletter';
import { Compass, Bookmark, Layers } from 'lucide-react';

export const PublicPortal: React.FC = () => {
  const {
    posts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    bookmarks
  } = useBlog();

  const [onlySaved, setOnlySaved] = useState(false);

  // Filter published posts based on category, search, and bookmarks
  const published = posts.filter((p) => p.status === 'Published');

  const filtered = published.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesBookmark = !onlySaved || bookmarks.includes(post.id);

    return matchesSearch && matchesCat && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Banner only shown when not filtering by search or bookmarks */}
      {!searchQuery && !onlySaved && selectedCategory === 'All' && <HeroBanner />}

      {/* Navigation & Category Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-black text-white">
              {onlySaved ? 'Saved Reading Matrix' : 'Explore Technical Publications'}
            </h2>
          </div>

          {/* Bookmarks Toggle button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold border transition-all ${
                onlySaved
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                  : 'bg-[#0e1426] text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Saved Stories ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setOnlySaved(false);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'All' && !onlySaved
                ? 'bg-linear-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-600/25'
                : 'bg-[#0e1426] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Topics ({published.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setOnlySaved(false);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat.name && !onlySaved
                  ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25'
                  : 'bg-[#0e1426] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="bg-[#0e1426]/60 border border-white/5 rounded-3xl p-16 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No publications matched your search</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, removing active filters, or write a new article from the management dashboard.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlySaved(false);
            }}
            className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Newsletter Block */}
      <Newsletter />
    </div>
  );
};
