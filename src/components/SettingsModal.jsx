import React, { useState } from 'react';
import { X, Key, Check, Shield, Cpu } from 'lucide-react';
import { PROVIDER_CONFIGS } from '../config/grok';

export default function SettingsModal({ onClose }) {
  const [provider, setProvider] = useState(localStorage.getItem('empacer_provider') || 'grok');
  const [apiKey, setApiKey] = useState(localStorage.getItem('empacer_api_key') || '');
  const [model, setModel] = useState(
    localStorage.getItem('empacer_selected_model') || PROVIDER_CONFIGS[provider].defaultModel
  );
  const [saved, setSaved] = useState(false);

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    setModel(PROVIDER_CONFIGS[newProvider].defaultModel);
  };

  const handleSave = () => {
    localStorage.setItem('empacer_provider', provider);
    localStorage.setItem('empacer_api_key', apiKey.trim());
    localStorage.setItem('empacer_selected_model', model);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-lime-400" />
            AI Provider & Model Settings
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Select AI Provider
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(PROVIDER_CONFIGS).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleProviderChange(key)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${
                    provider === key
                      ? 'border-lime-400 bg-lime-400/10 text-lime-400'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {PROVIDER_CONFIGS[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              Active Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-lime-400 transition"
            >
              {PROVIDER_CONFIGS[provider].models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* API Key Input */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              {provider === 'grok' ? 'xAI Grok API Key' : 'OpenRouter API Key'}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={provider === 'grok' ? 'xai-xxxxxxxxxxxx' : 'sk-or-v1-xxxxxxxxxxxx'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-lime-400 font-mono transition"
            />
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start space-x-2 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Keys are saved locally in your browser context. Use <strong>openrouter/free</strong> or <strong>google/gemma-4-31b-it:free</strong> for completely free API usage.
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-lime-400 hover:bg-lime-300 text-slate-950 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Saved!' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
