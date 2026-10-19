import { PAYMENT_CONFIG } from '../config/payments';

export function processPaymentRedirect(providerKey, amountZAR, userEmail, reference) {
  const provider = PAYMENT_CONFIG.providers[providerKey];
  if (!provider) throw new Error('Unsupported payment gateway selected');

  switch (providerKey) {
    case 'payfast': {
      const params = new URLSearchParams({
        merchant_id: provider.merchantId,
        merchant_key: provider.merchantKey,
        amount: amountZAR.toFixed(2),
        item_name: `Empacer Subscription Ref #${reference}`,
        email_address: userEmail,
        return_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`
      });
      return { type: 'redirect', url: `${provider.sandboxUrl}?${params.toString()}` };
    }

    case 'fnb_direct': {
      return {
        type: 'manual_eft',
        bankDetails: provider,
        reference: `${provider.referencePrefix}${reference}`,
        amount: `R${amountZAR}`
      };
    }

    default:
      return { type: 'gateway_ready', provider: provider.name, amountZAR };
  }
}
