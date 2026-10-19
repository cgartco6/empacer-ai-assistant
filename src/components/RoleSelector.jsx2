import React from 'react';
import { ShieldCheck, User, Crown, Unlock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function RoleSelector() {
  const { currentUserRole, setRole, isOwnerBypassActive, toggleOwnerBypass } = useAppStore();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2">
        <span className="text-slate-400 font-semibold">Active Role View:</span>
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setRole('client')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              currentUserRole === 'client' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Client View</span>
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              currentUserRole === 'admin' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => setRole('owner')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              currentUserRole === 'owner' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Owner Master</span>
          </button>
        </div>
      </div>

      {currentUserRole === 'owner' && (
        <button
          onClick={toggleOwnerBypass}
          className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition font-mono ${
            isOwnerBypassActive
              ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
              : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>{isOwnerBypassActive ? 'MASTER BYPASS ACTIVE (UNLIMITED)' : 'Bypass Paused'}</span>
        </button>
      )}
    </div>
  );
}


