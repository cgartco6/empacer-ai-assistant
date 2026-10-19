import React from 'react';
import { Zap, Settings, Cpu } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Header({ onOpenSettings }) {
  const { apiKey } = useAppStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-lime-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-lime-400/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              Empacer <span className="text-xs px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">Grok OS</span>
            </h1>
            <p className="text-xs text-slate-400">Autonomous Business Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-lime-400" />
            <span>Engine: <strong className="text-slate-200">Grok-2</strong></span>
            {apiKey ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1" title="Connected"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400 ml-1" title="Demo Mode"></span>
            )}
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Settings & API Key"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
