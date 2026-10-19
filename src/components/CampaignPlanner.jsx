import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { callGrokAPI } from '../services/grokApi';
import { useAppStore } from '../store/useAppStore';

export default function CampaignPlanner() {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const { apiKey, businessMemory } = useAppStore();

  const roadmapDays = [
    { day: 1, text: "Tell Grok about your business" },
    { day: 2, text: "Grok learns your prices & hours" },
    { day: 3, text: "Grok learns your brand tone" },
    { day: 5, text: "First customer replies auto-drafted" },
    { day: 7, text: "Social post drafted from photos" },
    { day: 14, text: "Morning prep & reminders ready" },
    { day: 28, text: "Full operational autopilot active" },
  ];

  const handleGeneratePlan = async () => {
    if (!goal.trim()) return;
    setIsGenerating(true);

    try {
      const response = await callGrokAPI({
        apiKey,
        prompt: `Generate a 4-week marketing and operational plan for goal: "${goal}". Provide 4 week milestones with actionable steps.`,
        memoryContext: businessMemory
      });

      setPlan(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">28-Day Autonomous Roadmap</h2>
        <p className="text-xs text-slate-400">Empacer continuously adapts over 28 days to automate your daily busywork.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Progress Timeline</h3>
        <div className="relative border-l border-slate-800 ml-3 space-y-4 pl-4">
          {roadmapDays.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-lime-400 border-2 border-slate-950" />
              <div className="text-xs">
                <span className="font-mono text-lime-400 font-semibold">DAY {item.day}: </span>
                <span className="text-slate-300">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-lime-400" />
          Generate Custom Marketing Campaign
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Launch new summer package & get 10 client bookings"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-lime-400 transition"
          />
          <button
            onClick={handleGeneratePlan}
            disabled={isGenerating || !goal.trim()}
            className="w-full bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-slate-950 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
          >
            <span>{isGenerating ? 'Drafting Strategy...' : 'Generate 28-Day Plan'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {plan && (
          <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 whitespace-pre-line font-mono">
            {plan}
          </div>
        )}
      </div>
    </div>
  );
}
