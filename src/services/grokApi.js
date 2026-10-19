import { PROVIDER_CONFIGS, DEFAULT_SYSTEM_PROMPT } from '../config/grok';

export async function callGrokAPI({ prompt, systemPrompt, memoryContext = {} }) {
  // Retrieve user settings from LocalStorage
  const providerKey = localStorage.getItem('empacer_provider') || 'grok';
  const apiKey = localStorage.getItem('empacer_api_key') || '';
  const selectedModel = localStorage.getItem('empacer_selected_model') || PROVIDER_CONFIGS[providerKey].defaultModel;

  const provider = PROVIDER_CONFIGS[providerKey] || PROVIDER_CONFIGS.grok;

  const contextMessage = `
BUSINESS CONTEXT:
- Business Name: ${memoryContext.name || 'My Business'}
- Hours: ${memoryContext.hours || '9 AM - 6 PM'}
- Prices: ${memoryContext.prices || 'Custom quote'}
- Tone: ${memoryContext.tone || 'Friendly & Professional'}
- Services: ${memoryContext.services || 'Consulting'}
- FAQs: ${memoryContext.faqs || 'N/A'}
`;

  // Fallback simulation mode if no key is provided
  if (!apiKey && selectedModel !== 'openrouter/free') {
    await new Promise((res) => setTimeout(res, 1000));
    return generateMockGrokResponse(prompt);
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Add OpenRouter-specific HTTP Referer headers
  if (providerKey === 'openrouter') {
    headers['HTTP-Referer'] = 'https://empacer.app';
    headers['X-Title'] = 'Empacer AI Assistant';
  }

  try {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: `${systemPrompt || DEFAULT_SYSTEM_PROMPT}\n\n${contextMessage}` },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated.';
  } catch (err) {
    console.warn('API call failed, falling back to mock response:', err.message);
    return generateMockGrokResponse(prompt);
  }
}

function generateMockGrokResponse(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('reply') || p.includes('customer') || p.includes('inquiry')) {
    return JSON.stringify({
      type: 'REPLY',
      title: 'Customer Inquiry Draft',
      target: 'Instagram DM @sarah_design',
      content: 'Hi Sarah! Thanks for asking. Our full branding package starts at $450 and includes logo, brand book, and social media templates.',
      reasoning: 'Matched customer pricing inquiry against business memory context.'
    });
  }
  return JSON.stringify({
    type: 'REMINDER',
    title: 'Daily Operation Plan Ready',
    target: 'Internal Task List',
    content: '1. Follow up with 2 pending client quotes.\n2. Confirm tomorrow 10:00 AM consultation.',
    reasoning: 'Extracted key daily priorities from voice note.'
  });
}
