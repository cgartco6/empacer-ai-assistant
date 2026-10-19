import React, { useState } from 'react';
import { CreditCard, Landmark, DollarSign, CheckCircle, Zap } from 'lucide-react';
import { PAYMENT_CONFIG } from '../config/payments';
import { processPaymentRedirect } from '../services/paymentEngine';

export default function PaymentPortal() {
  const [selectedProvider, setSelectedProvider] = useState('payfast');
  const [amount, setAmount] = useState(299);
  const [result, setResult] = useState(null);

  const handleCheckout = () => {
    const res = processPaymentRedirect(selectedProvider, amount, 'client@business.co.za', Date.now());
    if (res.type === 'redirect') {
      window.location.href = res.url;
    } else {
      setResult(res);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-lime-400" /> South African & Global Payment Gateways
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-lime-400/10 text-lime-400 font-mono">Default: ZAR (R)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.keys(PAYMENT_CONFIG.providers).map((key) => {
          const p = PAYMENT_CONFIG.providers[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedProvider(key)}
              className={`p-3 rounded-xl border text-left flex items-start justify-between transition ${
                selectedProvider === key
                  ? 'border-lime-400 bg-lime-400/10 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="font-semibold text-xs text-slate-200">{p.name}</div>
                <div className="text-[10px] text-slate-500">{p.supportedCurrencies?.join(', ') || 'ZAR'}</div>
              </div>
              {selectedProvider === key && <Zap className="w-4 h-4 text-lime-400" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <span className="text-xs text-slate-400">Total Payment Amount:</span>
        <span className="text-lg font-bold text-lime-400 font-mono">R{amount} ZAR</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg shadow-lime-400/20"
      >
        Proceed to Checkout via {PAYMENT_CONFIG.providers[selectedProvider]?.name}
      </button>

      {result?.type === 'manual_eft' && (
        <div className="p-4 bg-slate-950 border border-amber-400/30 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <Landmark className="w-4 h-4" /> Direct FNB Bank Transfer Instructions
          </div>
          <div className="text-slate-300 font-mono space-y-1 text-[11px]">
            <p>Bank: {result.bankDetails.bankName}</p>
            <p>Account Name: {result.bankDetails.accountName}</p>
            <p>Account Number: {result.bankDetails.accountNumber}</p>
            <p>Branch Code: {result.bankDetails.branchCode}</p>
            <p className="text-lime-400 font-bold">Reference: {result.reference}</p>
          </div>
        </div>
      )}
    </div>
  );
}
