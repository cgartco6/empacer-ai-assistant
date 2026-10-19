import React from 'react';
import { Inbox, Mic, Brain, Calendar, MessageSquare, CreditCard } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Navigation() {
  const { activeTab, setActiveTab, drafts } = useAppStore();
  const pendingCount = (drafts || []).filter((d) => d && d.status === 'pending').length;

  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: pendingCount },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'planner', label: '28-Day', icon: Calendar },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'payments', label: 'PayGate', icon: CreditCard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-lime-400 text-slate-950 shadow-lg shadow-lime-400/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] rounded-full font-bold ${
                      isActive ? 'bg-slate-950 text-lime-400' : 'bg-lime-400 text-slate-950'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
