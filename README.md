# Empacer AI - Complete Vercel & Cross-Platform Production Repository

Empacer is an AI-powered autonomous business assistant designed for small business owners, micro-entrepreneurs, and freelancers. It automates customer replies, social media content creation, daily schedule reminders, and marketing campaigns using the xAI Grok API (`grok-2-1212` / `grok-beta`) or OpenRouter endpoints.

## Features
- **Multi-Gateway Payment Engine**: PayFast, Ozow, Stitch, Direct FNB EFT, Stripe, and PayPal with default ZAR (R) pricing and currency conversion.
- **Owner Master Mode**: Owner bypasses all paywalls, rate limits, tier restrictions, and feature locks.
- **Role-Based Dashboards**: Separate tailored workflows for Clients, Admins, and the Omniscient Owner.
- **Impulse Buyer AI Engine**: Automated urgency-driven marketing copy designed to convert prospects instantly across social media.
- **Platform Compliance Inspector**: Automated pre-post rules checker enforcing platform restrictions and character limits for YouTube, TikTok, Facebook, Instagram, X, WhatsApp, and Truth Social.
- **Global & Local Legal Compliance**: Built-in guardrails adhering to POPIA (South Africa) and GDPR (Global) privacy standards.
- **Visual Asset Integration**: Camera snapshot capture and photo upload integration for product-focused social posts.
- **Voice & Text Command Center**: Hands-free voice instructions via Web Speech API.
- **Dynamic Business Memory (RAG Context)**: Remembers your business details, prices, operating hours, FAQs, and brand voice.
- **Tap-To-Approve Operational Feed**: AI drafts actions for one-tap approval.

## Directory Structure
```text
empacer-ai-assistant/
├── package.json
├── vercel.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── capacitor.config.json
├── api/
│   └── grok.js
├── electron/
│   ├── main.js
│   ├── preload.js
│   └── builder.json
├── android/
│   └── app/src/main/AndroidManifest.xml
├── ios/
│   └── App/App/Info.plist
├── tauri/
│   ├── tauri.conf.json
│   └── src/main.rs
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── config/
│   │   ├── grok.js
│   │   ├── payments.js
│   │   └── complianceRules.js
│   ├── services/
│   │   ├── grokApi.js
│   │   ├── voiceEngine.js
│   │   ├── paymentEngine.js
│   │   ├── complianceCheck.js
│   │   └── impulseAi.js
│   ├── store/
│   │   └── useAppStore.js
│   └── components/
│       ├── Header.jsx
│       ├── RoleSelector.jsx
│       ├── MediaUploader.jsx
│       ├── PaymentPortal.jsx
│       ├── Navigation.jsx
│       ├── ApprovalInbox.jsx
│       ├── VoiceInput.jsx
│       ├── BusinessMemory.jsx
│       ├── CampaignPlanner.jsx
│       ├── ChatAssistant.jsx
│       ├── SettingsModal.jsx
│       └── Dashboards/
│           ├── ClientDashboard.jsx
│           ├── AdminDashboard.jsx
│           └── OwnerDashboard.jsx
