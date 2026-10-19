import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  apiKey: localStorage.getItem('empacer_grok_key') || '',
  activeTab: 'inbox',
  
  businessMemory: {
    name: 'Aura Creative Studio',
    hours: 'Mon-Fri 9:00 AM - 6:00 PM',
    prices: 'Logo Design $250, Full Brand $500, Web Design $1,200',
    tone: 'Friendly, modern, energetic, professional',
    services: 'Branding, UI/UX Design, Social Media Management',
    faqs: 'Turnaround time is 5-7 business days. 50% deposit required.'
  },

  drafts: [
    {
      id: 'd1',
      type: 'REPLY',
      title: 'Reply to Instagram Inquiry',
      target: 'DM from @alex_crafts',
      content: 'Hi Alex! Thanks for reaching out. Our Logo Design package is $250 and turnaround is 5-7 business days. Would you like me to send over our quick intake form?',
      status: 'pending',
      created: '10 mins ago',
      source: 'Auto-drafted from incoming DM'
    },
    {
      id: 'd2',
      type: 'REMINDER',
      title: 'Daily Operations Prep',
      target: 'Tomorrow morning 8:30 AM',
      content: '• Confirm 10 AM call with Jordan\n• Send invoice #104 ($500)\n• Post workshop preview photo to Instagram',
      status: 'pending',
      created: '25 mins ago',
      source: 'Extracted from voice note'
    },
    {
      id: 'd3',
      type: 'SOCIAL',
      title: 'New Project Showcase Post',
      target: 'Instagram & LinkedIn',
      content: 'Fresh client project drop! 🚀 Worked with @luna_cafe to rebuild their visual identity. What do you think of this color palette?',
      status: 'pending',
      created: '1 hour ago',
      source: 'Generated from photo upload'
    }
  ],

  campaigns: [],
  chatMessages: [
    { id: 'm1', sender: 'assistant', text: 'Hello! I am Empacer, your Grok-powered business assistant. Tell me what you need done today or record a voice note!' }
  ],

  setApiKey: (key) => {
    localStorage.setItem('empacer_grok_key', key);
    set({ apiKey: key });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  updateMemory: (field, value) => set((state) => ({
    businessMemory: { ...state.businessMemory, [field]: value }
  })),

  approveDraft: (id) => set((state) => ({
    drafts: state.drafts.map((d) => d.id === id ? { ...d, status: 'approved' } : d)
  })),

  rejectDraft: (id) => set((state) => ({
    drafts: state.drafts.filter((d) => d.id !== id)
  })),

  addDraft: (draft) => set((state) => ({
    drafts: [draft, ...state.drafts]
  })),

  addChatMessage: (msg) => set((state) => ({
    chatMessages: [...state.chatMessages, msg]
  }))
}));
