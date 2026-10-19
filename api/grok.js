export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, memoryContext } = req.body;
  const apiKey = process.env.VITE_GROK_API_KEY || req.headers.authorization?.replace('Bearer ', '');

  if (!apiKey) {
    return res.status(400).json({ error: 'Grok API Key required' });
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          { role: 'system', content: 'You are Empacer, an autonomous business assistant.' },
          { role: 'user', content: `Context: ${JSON.stringify(memoryContext)}\n\nUser Prompt: ${prompt}` }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
