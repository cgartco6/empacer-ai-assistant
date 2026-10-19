import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import RoleSelector from './components/RoleSelector';
import ApprovalInbox from './components/ApprovalInbox';
import VoiceInput from './components/VoiceInput';
import BusinessMemory from './components/BusinessMemory';
import CampaignPlanner from './components/CampaignPlanner';
import ChatAssistant from './components/ChatAssistant';
import PaymentPortal from './components/PaymentPortal';
import SettingsModal from './components/SettingsModal';
import ClientDashboard from './components/Dashboards/ClientDashboard';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import OwnerDashboard from './components/Dashboards/OwnerDashboard';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { activeTab, currentUserRole } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 sm:pb-8">
      {/* Top Bar */}
      <Header onOpenSettings={() => setShowSettings(true)} />

      <main className="max-w-5xl mx-auto px-4 pt-4">
        {/* Role Control Selector (Client / Admin / Owner) */}
        <RoleSelector />

        {/* Tab Navigation */}
        <Navigation />

        {/* Active Main View Area */}
        <div className="mt-4">
          {activeTab === 'inbox' && (
            <>
              {currentUserRole === 'client' && <ClientDashboard />}
              {currentUserRole === 'admin' && <AdminDashboard />}
              {currentUserRole === 'owner' && <OwnerDashboard />}
              <div className="mt-6">
                <ApprovalInbox />
              </div>
            </>
          )}

          {activeTab === 'voice' && <VoiceInput />}
          {activeTab === 'memory' && <BusinessMemory />}
          {activeTab === 'planner' && <CampaignPlanner />}
          {activeTab === 'chat' && <ChatAssistant />}
          {activeTab === 'payments' && <PaymentPortal />}
        </div>
      </main>

      {/* Settings Modal Overlay */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
