export const PROVIDER_CONFIGS = {
  grok: {
    name: 'xAI Grok (Official)',
    baseUrl: 'https://api.x.ai/v1',
    defaultModel: 'grok-2-1212',
    models: ['grok-2-1212', 'grok-beta']
  },
  openrouter: {
    name: 'OpenRouter (Free / Multi-LLM)',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'x-ai/grok-2-1212',
    models: ['x-ai/grok-2-1212', 'openrouter/free', 'google/gemma-4-31b-it:free']
  }
};

export const DEFAULT_SYSTEM_PROMPT = `You are Empacer, an elite autonomous AI business operations assistant.
Your goal is to parse natural language voice instructions, business context, customer inquiries, and photos into clear, executable actions.
Always format output strictly as required (e.g. JSON action plans or concise professional responses).`;
