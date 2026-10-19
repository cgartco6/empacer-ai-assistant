import React from 'react';
import { CheckCircle2, Sparkles, Send, Calendar, MessageCircle, Share2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function ApprovalInbox() {
  const { drafts, approveDraft, rejectDraft } = useAppStore();
  const pendingDrafts = drafts.filter((d) => d.status === 'pending');
  const approvedDrafts = drafts.filter((d) => d.status === 'approved');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'REPLY': return <MessageCircle className="w-4 h-4 text-sky-400" />;
      case 'SOCIAL': return <Share2 className="w-4 h-4 text-purple-400" />;
      case 'REMINDER': return <Calendar className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-lime-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Tap-To-Approve Feed
          </h2>
          <p className="text-xs text-slate-400">Review AI actions drafted from your voice notes and customer messages</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          {pendingDrafts.length} pending
        </span>
      </div>

      {pendingDrafts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <CheckCircle2 className="w-12 h-12 text-lime-400 mx-auto mb-3 opacity-80" />
          <h3 className="text-base font-semibold text-white">All caught up!</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Empacer is monitoring incoming messages and voice commands. New drafts requiring your approval will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingDrafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {getTypeIcon(draft.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{draft.title}</h3>
                    <p className="text-xs text-slate-400">{draft.target} • {draft.created}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  {draft.type}
                </span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-200 whitespace-pre-line font-mono mb-4 leading-relaxed">
                {draft.content}
              </div>

              {draft.source && (
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  <span>Reasoning: {draft.source}</span>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => approveDraft(draft.id)}
                  className="flex-1 bg-lime-400 hover:bg-lime-300 text-slate-950 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-lime-400/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Approve & Execute</span>
                </button>
                <button
                  onClick={() => rejectDraft(draft.id)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 text-xs font-medium transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {approvedDrafts.length > 0 && (
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recently Executed</h3>
          <div className="space-y-2 opacity-60">
            {approvedDrafts.map((d) => (
              <div key={d.id} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 line-through">{d.title}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Executed</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
