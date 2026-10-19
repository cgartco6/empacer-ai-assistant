import React from 'react';
import { Inbox, Mic, Brain, Calendar, MessageSquare } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Navigation() {
  const { activeTab, setActiveTab, drafts } = useAppStore();
  const pendingCount = drafts.filter((d) => d.status === 'pending').length;

  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: pendingCount },
    { id: 'voice', label: 'Voice Command', icon: Mic },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'planner', label: '28-Day Plan', icon: Calendar },
    { id: 'chat', label: 'Grok Chat', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg px-2 py-2 sm:relative sm:border-t-0 sm:bg-transparent sm:py-0 sm:mb-6">
      <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-start sm:space-x-2 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center space-x-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-400/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
              {tab.badge > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-lime-400' : 'bg-lime-400 text-slate-950'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
