import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  const profile = await req.json();

  const prompt = `You are a BJJ coach analyzing a fighter's profile. Based on this information, generate a detailed fighter analysis.

Fighter Profile:
- Name: ${profile.name || 'Anonymous'}
- Years Training: ${profile.years}
- Weight Class: ${profile.weight || 'Not specified'}
- Style: ${profile.style}
- Top Game: ${profile.topGame || 'Not specified'}
- Bottom Game: ${profile.bottomGame || 'Not specified'}
- Standing/Takedowns: ${profile.standing || 'Not specified'}
- Signature Techniques: ${profile.techniques || 'Not specified'}

Respond ONLY with a JSON object, no markdown, no explanation:
{
  "archetype": "2-3 word fighter archetype name (e.g. Guard Wizard, Pressure Passer)",
  "description": "2 sentence description of this fighter's style",
  "attributes": {
    "topControl": <number 1-10>,
    "bottomDefense": <number 1-10>,
    "guardPassing": <number 1-10>,
    "chokes": <number 1-10>,
    "legLocks": <number 1-10>,
    "standing": <number 1-10>
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "gameplan": "2 sentence recommended gameplan for this fighter",
  "nextFocus": "The single most important thing this fighter should work on"
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const clean = text.replace(/```json|```/g, '').trim();
  const data = JSON.parse(clean);

  return Response.json(data);
}
