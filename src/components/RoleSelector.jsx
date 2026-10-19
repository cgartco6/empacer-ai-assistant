import React from 'react';
import { ShieldCheck, User, Crown, Unlock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function RoleSelector() {
  const { currentUserRole, setRole, isOwnerBypassActive, toggleOwnerBypass } = useAppStore();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          View Mode:
        </span>
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setRole('client')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 transition ${
              currentUserRole === 'client' ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Client</span>
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 transition ${
              currentUserRole === 'admin' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => setRole('owner')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 transition ${
              currentUserRole === 'owner' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3 h-3" />
            <span>Owner</span>
          </button>
        </div>
      </div>

      {currentUserRole === 'owner' && (
        <button
          onClick={toggleOwnerBypass}
          className={`w-full py-2 px-3 rounded-xl border text-[11px] font-mono font-semibold flex items-center justify-center space-x-2 transition ${
            isOwnerBypassActive
              ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
              : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>{isOwnerBypassActive ? 'MASTER BYPASS ACTIVE (UNLIMITED)' : 'ENABLE MASTER BYPASS'}</span>
        </button>
      )}
    </div>
  );
}
