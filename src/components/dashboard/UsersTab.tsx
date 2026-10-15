import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Users, UserPlus, Mail } from 'lucide-react';

export const UsersTab: React.FC = () => {
  const { users, notify } = useBlog();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Editor' | 'Author'>('Author');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    notify(`Invitation sent to ${inviteEmail} as ${inviteRole}!`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Editorial Team & Permissions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-based access control (RBAC): Administrators, Editors, and Contributing Authors.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center space-x-2 bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <form
          onSubmit={handleInvite}
          className="bg-[#0e1426]/90 backdrop-blur-xl border border-purple-500/30 p-6 rounded-3xl shadow-xl space-y-4 max-w-lg animate-in fade-in slide-in-from-top duration-200"
        >
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Send Author / Editor Invitation</span>
          </h3>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Colleague Email Address *
            </label>
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="e.g. colleague@nexusblog.io"
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Role Assignment
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Author">Author (Create & draft stories)</option>
              <option value="Editor">Editor (Review, publish & moderate)</option>
              <option value="Admin">Administrator (Full operational control)</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
            >
              Send Invite
            </button>
          </div>
        </form>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#0e1426]/90 backdrop-blur-xl border border-white/8 p-6 rounded-3xl shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/30"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{user.name}</h3>
                  <span
                    className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mt-1 ${
                      user.role === 'Admin'
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                        : user.role === 'Editor'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">{user.bio}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>{user.articlesCount} Articles</span>
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
