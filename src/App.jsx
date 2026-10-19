import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ApprovalInbox from './components/ApprovalInbox';
import VoiceInput from './components/VoiceInput';
import BusinessMemory from './components/BusinessMemory';
import CampaignPlanner from './components/CampaignPlanner';
import ChatAssistant from './components/ChatAssistant';
import SettingsModal from './components/SettingsModal';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { activeTab } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 sm:pb-8">
      <Header onOpenSettings={() => setShowSettings(true)} />

      <main className="max-w-5xl mx-auto px-4 pt-6">
        <Navigation />

        <div className="mt-4">
          {activeTab === 'inbox' && <ApprovalInbox />}
          {activeTab === 'voice' && <VoiceInput />}
          {activeTab === 'memory' && <BusinessMemory />}
          {activeTab === 'planner' && <CampaignPlanner />}
          {activeTab === 'chat' && <ChatAssistant />}
        </div>
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
