import React from 'react';
import { ShieldCheck, Users, Activity, Settings, Database } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function AdminDashboard() {
  const { drafts, businessMemory } = useAppStore();
  const pendingDrafts = drafts.filter((d) => d.status === 'pending');
  const approvedDrafts = drafts.filter((d) => d.status === 'approved');

  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs text-purple-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <span><strong>Admin Workspace:</strong> System monitoring, client management, and API execution stats.</span>
        </div>
        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full font-mono text-[10px]">
          System Status: Operational
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Approvals</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{pendingDrafts.length}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Executed Actions</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{approvedDrafts.length}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Memory Keys</span>
            <Database className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {Object.keys(businessMemory).length}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-lime-400" />
          Administrative System Controls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-semibold text-slate-200">System Logs</span>
            <p className="text-[11px] text-slate-400">View real-time API requests and model responses.</p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-semibold text-slate-200">Compliance Audits</span>
            <p className="text-[11px] text-slate-400">Review platform rules and auto-moderation status.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
