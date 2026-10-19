import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // User & Access Control
  currentUserRole: 'owner', // 'client' | 'admin' | 'owner'
  userTier: 'free', // 'free' | 'pro' | 'enterprise'
  isOwnerBypassActive: true, // Master bypass active

  // Active Business Memory
  businessMemory: {
    name: 'Aura Creative Studio',
    hours: 'Mon-Fri 9:00 AM - 6:00 PM',
    prices: 'Logo Design R2,500 | Full Brand R5,000 | Web Package R12,000',
    tone: 'High-energy, direct, professional, urgency-driven',
    services: 'Branding, UI/UX, Automated Social Marketing',
    faqs: 'Instant EFT via PayFast/Ozow accepted. 50% deposit required.'
  },

  // Operational Drafts Feed
  drafts: [
    {
      id: 'd101',
      type: 'IMPULSE_OFFER',
      title: 'Flash Sale: 2 Brand Kits Left',
      platform: 'instagram',
      target: 'Instagram & WhatsApp Status',
      content: '🔥 FLASH SALE: Getting 5 new clients today only! Full Brand Identity Package dropped from R5,000 to R2,999 ZAR. Tap link to secure via Instant EFT!',
      status: 'pending',
      created: '5 mins ago',
      source: 'Impulse AI Engine',
      attachedPhoto: null
    }
  ],

  // Action Methods
  setRole: (role) => set({ 
    currentUserRole: role,
    isOwnerBypassActive: role === 'owner'
  }),

  toggleOwnerBypass: () => set((state) => ({ 
    isOwnerBypassActive: !state.isOwnerBypassActive 
  })),

  addDraft: (draft) => set((state) => ({
    drafts: [draft, ...state.drafts]
  })),

  approveDraft: (id) => set((state) => ({
    drafts: state.drafts.map((d) => d.id === id ? { ...d, status: 'approved' } : d)
  })),

  rejectDraft: (id) => set((state) => ({
    drafts: state.drafts.filter((d) => d.id !== id)
  }))
}));
