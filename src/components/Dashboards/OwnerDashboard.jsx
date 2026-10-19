import React from 'react';
import { Crown, Zap, Shield, Eye, Users, Server } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function OwnerDashboard() {
  const { drafts, businessMemory, isOwnerBypassActive } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="p-5 bg-amber-400/10 border border-amber-400/30 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Crown className="w-5 h-5" /> Omniscient Owner Control Center
          </h2>
          <span className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-full font-bold text-xs">
            {isOwnerBypassActive ? 'Bypass Active (Unlimited Access)' : 'Standard View'}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          As the owner, you bypass all payment gates, tier limits, rate caps, and operational restrictions across all client accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Managed Drafts</span>
          <span className="text-2xl font-bold text-white font-mono">{drafts.length}</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Global Platform Reach</span>
          <span className="text-2xl font-bold text-lime-400 font-mono">7 Networks</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Compliance Health</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono">100% Verified</span>
        </div>
      </div>
    </div>
  );
}
