import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { callGrokAPI } from '../services/grokApi';
import { useAppStore } from '../store/useAppStore';

export default function ChatAssistant() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, businessMemory, chatMessages, addChatMessage } = useAppStore();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    addChatMessage({ id: 'msg_' + Date.now(), sender: 'user', text: userText });
    setIsLoading(true);

    try {
      const response = await callGrokAPI({
        apiKey,
        prompt: userText,
        memoryContext: businessMemory
      });

      addChatMessage({ id: 'msg_' + Date.now(), sender: 'assistant', text: response });
    } catch (err) {
      addChatMessage({ id: 'msg_' + Date.now(), sender: 'assistant', text: 'Error connecting to Grok API.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center space-x-2">
        <Bot className="w-5 h-5 text-lime-400" />
        <div>
          <h3 className="font-bold text-sm text-white">Live Grok Assistant</h3>
          <p className="text-[10px] text-slate-400">Grounded in your business memory context</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="p-1.5 rounded-lg bg-lime-400/10 border border-lime-400/20 text-lime-400 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-lime-400 text-slate-950 font-medium'
                  : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-lime-400" />
            <span>Grok is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Grok anything about your business..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-lime-400 transition"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-lime-400 hover:bg-lime-300 text-slate-950 p-2.5 rounded-xl transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
