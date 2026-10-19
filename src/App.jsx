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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-lime-400 selection:text-slate-950">
      {/* Top Header */}
      <Header onOpenSettings={() => setShowSettings(true)} />

      {/* Main Content Area with bottom padding to prevent nav overlap */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-4 pb-28">
        {/* Responsive Compact Role Selector */}
        <RoleSelector />

        {/* Tab Views */}
        <div className="mt-4">
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              {currentUserRole === 'client' && <ClientDashboard />}
              {currentUserRole === 'admin' && <AdminDashboard />}
              {currentUserRole === 'owner' && <OwnerDashboard />}
              <ApprovalInbox />
            </div>
          )}

          {activeTab === 'voice' && <VoiceInput />}
          {activeTab === 'memory' && <BusinessMemory />}
          {activeTab === 'planner' && <CampaignPlanner />}
          {activeTab === 'chat' && <ChatAssistant />}
          {activeTab === 'payments' && <PaymentPortal />}
        </div>
      </main>

      {/* Floating Mobile Navigation Bar */}
      <Navigation />

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
