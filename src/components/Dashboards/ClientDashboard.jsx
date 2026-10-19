import React from 'react';
import ApprovalInbox from '../ApprovalInbox';

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-xs text-sky-300">
        <strong>Client Workspace:</strong> You are viewing your active automated social posts, draft approvals, and business memory.
      </div>
      <ApprovalInbox />
    </div>
  );
}
