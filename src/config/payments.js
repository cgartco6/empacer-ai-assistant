export const PAYMENT_CONFIG = {
  defaultCurrency: 'ZAR',
  symbol: 'R',
  tiers: {
    free: { name: 'Free Starter', price: 0, limit: 10 },
    pro: { name: 'Pro Automation', price: 299, limit: 500 }, // ZAR 299/mo
    enterprise: { name: 'Autopilot Unlimited', price: 999, limit: Infinity } // ZAR 999/mo
  },
  providers: {
    payfast: {
      name: 'PayFast (Cards & Instant EFT)',
      merchantId: import.meta.env?.VITE_PAYFAST_MERCHANT_ID || '10000100',
      merchantKey: import.meta.env?.VITE_PAYFAST_MERCHANT_KEY || '46f0cd694581a',
      sandboxUrl: 'https://sandbox.payfast.co.za/eng/process',
      supportedCurrencies: ['ZAR']
    },
    ozow: {
      name: 'Ozow (Instant Smart EFT)',
      siteCode: import.meta.env?.VITE_OZOW_SITE_CODE || 'DEMO-SITE',
      apiKey: import.meta.env?.VITE_OZOW_API_KEY || '',
      baseUrl: 'https://api.ozow.com',
      supportedCurrencies: ['ZAR']
    },
    stitch: {
      name: 'Stitch Money (Direct Bank Pay)',
      clientSecret: import.meta.env?.VITE_STITCH_SECRET || '',
      baseUrl: 'https://api.stitch.money/graphql',
      supportedCurrencies: ['ZAR']
    },
    fnb_direct: {
      name: 'Direct FNB EFT Transfer',
      bankName: 'First National Bank (FNB)',
      accountName: 'Empacer Operations ZA',
      accountNumber: '62889012345',
      branchCode: '250655',
      accountType: 'Current',
      referencePrefix: 'EMP-'
    },
    stripe: {
      name: 'Stripe (Global Credit Card)',
      publicKey: import.meta.env?.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample',
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'ZAR']
    },
    paypal: {
      name: 'PayPal Global',
      clientId: import.meta.env?.VITE_PAYPAL_CLIENT_ID || 'sb',
      supportedCurrencies: ['USD', 'EUR']
    }
  }
};
