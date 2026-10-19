import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Loader2 } from 'lucide-react';
import { VoiceEngine } from '../services/voiceEngine';
import { callGrokAPI } from '../services/grokApi';
import { useAppStore } from '../store/useAppStore';

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEngine, setVoiceEngine] = useState(null);
  
  const { apiKey, businessMemory, addDraft, setActiveTab } = useAppStore();

  const handleStartVoice = () => {
    const engine = new VoiceEngine(
      (text) => setTranscript(text),
      (err) => console.error('Voice error:', err)
    );
    if (engine.start()) {
      setVoiceEngine(engine);
      setIsListening(true);
    }
  };

  const handleStopVoice = () => {
    if (voiceEngine) voiceEngine.stop();
    setIsListening(false);
  };

  const handleProcessInstruction = async () => {
    if (!transcript.trim()) return;
    setIsProcessing(true);

    try {
      const responseText = await callGrokAPI({
        apiKey,
        prompt: `Parse this instruction into an executable draft action (JSON format with keys type, title, target, content, reasoning): "${transcript}"`,
        memoryContext: businessMemory
      });

      let parsed = {};
      try {
        parsed = JSON.parse(responseText);
      } catch (e) {
        parsed = {
          type: 'REPLY',
          title: 'Processed Voice Command',
          target: 'General Action',
          content: responseText,
          reasoning: 'Direct Grok execution'
        };
      }

      addDraft({
        id: 'draft_' + Date.now(),
        type: parsed.type || 'REPLY',
        title: parsed.title || 'Voice Instruction Draft',
        target: parsed.target || 'Auto Dispatch',
        content: parsed.content || responseText,
        status: 'pending',
        created: 'Just now',
        source: parsed.reasoning || 'Extracted from voice instruction'
      });

      setTranscript('');
      setActiveTab('inbox');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Tell Instructions Out Loud</h2>
        <p className="text-xs text-slate-400">Speak naturally. Grok will interpret your intent, pull business memory, and draft actions.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-6">
        <div className="relative inline-block">
          <button
            onClick={isListening ? handleStopVoice : handleStartVoice}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 mx-auto ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                : 'bg-lime-400 text-slate-950 hover:bg-lime-300 shadow-xl shadow-lime-400/20'
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
        </div>

        <p className="text-xs text-slate-400">
          {isListening ? 'Listening... Speak your instruction out loud.' : 'Tap button to start recording voice note.'}
        </p>

        <div className="space-y-3">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="e.g. 'Draft a reply to Sarah asking about logo pricing, and schedule a reminder for tomorrow morning at 9am...'"
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-lime-400 transition"
          />

          <div className="flex items-center space-x-2">
            <button
              onClick={handleProcessInstruction}
              disabled={isProcessing || !transcript.trim()}
              className="flex-1 bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-slate-950 font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Process with Grok AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
