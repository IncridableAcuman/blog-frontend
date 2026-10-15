import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { FolderTree, Plus, Trash2, Sparkles, Layers } from 'lucide-react';

export const CategoriesTab: React.FC = () => {
  const { categories, createCategory, deleteCategory } = useBlog();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colorGradient, setColorGradient] = useState('from-purple-500 to-indigo-600');
  const [showAddForm, setShowAddForm] = useState(false);

  const gradientOptions = [
    { label: 'Purple Indigo', value: 'from-purple-500 to-indigo-600' },
    { label: 'Blue Cyan', value: 'from-blue-500 to-cyan-500' },
    { label: 'Emerald Teal', value: 'from-emerald-500 to-teal-500' },
    { label: 'Amber Orange', value: 'from-amber-500 to-orange-500' },
    { label: 'Rose Pink', value: 'from-rose-500 to-pink-600' },
    { label: 'Violet Fuchsia', value: 'from-violet-600 to-fuchsia-600' },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

    await createCategory({
      name,
      slug,
      description: description || 'Collection of curated insights and technical deep dives.',
      color: colorGradient,
      iconName: 'Folder',
    });

    setName('');
    setDescription('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"? This will not delete articles in it.`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <FolderTree className="w-5 h-5 text-purple-400" />
            <span>Category Taxonomy</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize content domains and visual navigational hierarchies.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'New Category'}</span>
        </button>
      </div>

      {/* Add New Category Card */}
      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="bg-[#0e1426]/90 backdrop-blur-xl border border-purple-500/30 p-6 rounded-3xl shadow-xl space-y-4 max-w-2xl animate-in fade-in slide-in-from-top duration-300"
        >
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Define New Topic Category</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Consensus"
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Theme Gradient
              </label>
              <select
                value={colorGradient}
                onChange={(e) => setColorGradient(e.target.value)}
                className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {gradientOptions.map((g, idx) => (
                  <option key={idx} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of articles in this category..."
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${cat.color} flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform`}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.description}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-purple-400 font-semibold">{cat.postCount} Stories</span>
              <span className="text-slate-400 font-mono text-[10px]">/{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
