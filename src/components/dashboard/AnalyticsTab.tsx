import React from 'react';
import { useBlog } from '../../context/BlogContext';
import {
  BarChart3,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Eye,
  Sparkles
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { posts } = useBlog();

  const sortedPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <span>Audience & Performance Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry, reader retention cohorts and geographic distribution.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-2xl text-emerald-300 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Telemetry Stream Active</span>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Page Views', value: '148,290', change: '+22.4%', icon: Eye, color: 'text-purple-400' },
          { label: 'Avg. Read Duration', value: '5m 12s', change: '+38s', icon: Clock, color: 'text-cyan-400' },
          { label: 'Organic Search Share', value: '68.5%', change: '+5.1%', icon: Globe, color: 'text-emerald-400' },
          { label: 'Social Engagement', value: '12.4K', change: '+18.9%', icon: TrendingUp, color: 'text-rose-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-5 rounded-3xl shadow-xl space-y-2"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{item.value}</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Sources & Devices Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Devices & Browsers</span>
            <Monitor className="w-4 h-4 text-cyan-400" />
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Desktop & Workstations', percent: 64, icon: Monitor, color: 'bg-purple-500' },
              { label: 'Mobile Handhelds', percent: 31, icon: Smartphone, color: 'bg-cyan-400' },
              { label: 'Tablets & Spatial Displays', percent: 5, icon: Tablet, color: 'bg-emerald-400' },
            ].map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{d.label}</span>
                    </div>
                    <span className="font-bold text-white">{d.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-white/2 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Optimization Tip:</strong> Mobile reader engagement grew by 42% following responsive reader mode release.
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="lg:col-span-2 bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Top Publications by Velocity</span>
            </h3>
            <span className="text-[11px] text-slate-400">All-time Reads</span>
          </div>

          <div className="space-y-3">
            {sortedPosts.map((post, idx) => (
              <div
                key={post.id}
                className="p-3 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-6 h-6 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{post.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{post.category} • {post.readTime}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-cyan-300">
                    {post.views.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-400">reads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
