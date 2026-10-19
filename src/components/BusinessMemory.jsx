import React from 'react';
import { Brain, DollarSign, Clock, MessageSquare, Briefcase, HelpCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function BusinessMemory() {
  const { businessMemory, updateMemory } = useAppStore();

  const fields = [
    { key: 'name', label: 'Business Name', icon: Briefcase, placeholder: 'e.g. Acme Agency' },
    { key: 'hours', label: 'Operating Hours', icon: Clock, placeholder: 'e.g. Mon-Fri 9am-5pm' },
    { key: 'prices', label: 'Services & Pricing', icon: DollarSign, placeholder: 'e.g. Consulting $150/hr' },
    { key: 'tone', label: 'Brand Tone & Style', icon: MessageSquare, placeholder: 'e.g. Friendly, concise' },
    { key: 'services', label: 'Main Offerings', icon: Briefcase, placeholder: 'e.g. Web Design, Coaching' },
    { key: 'faqs', label: 'Key Policies / FAQs', icon: HelpCircle, placeholder: 'e.g. 50% deposit required' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-lime-400" />
          Business Memory Base
        </h2>
        <p className="text-xs text-slate-400">Grok uses this active context to draft accurate customer responses and content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-2">
                <Icon className="w-3.5 h-3.5 text-lime-400" />
                <span>{field.label}</span>
              </label>
              <textarea
                value={businessMemory[field.key] || ''}
                onChange={(e) => updateMemory(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full h-20 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-lime-400 transition resize-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
