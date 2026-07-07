import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  const profile = await req.json();

  const winRate = profile.wins && profile.losses
    ? `${profile.wins}W - ${profile.losses}L (${Math.round(parseInt(profile.wins) / (parseInt(profile.wins) + parseInt(profile.losses)) * 100)}% win rate)`
    : 'No competition record';

  const prompt = `You are a BJJ coach analyzing a fighter's profile. Generate a realistic fighter card analysis.

Fighter Profile:
- Name: ${profile.name || 'Anonymous'}
- Belt: ${profile.belt || 'Not specified'}
- Years Training: ${profile.years}
- Weight: ${profile.weight || 'Not specified'}kg
- Height: ${profile.height || 'Not specified'}cm
- Body Type: ${profile.bodyType || 'Not specified'}
- Style: ${profile.style}
- Top Game: ${profile.topGame || 'Not specified'}
- Bottom Game: ${profile.bottomGame || 'Not specified'}
- Standing/Takedowns: ${profile.standing || 'Not specified'}
- Signature Techniques: ${profile.techniques || 'None specified'}
- Competition Record: ${winRate}
- Competitions Entered: ${profile.competitions || '0'}
- Notes: ${profile.notes || 'None'}

Overall rating guidelines (be realistic, not generous):
- White belt < 1 year: 38-48
- White belt 1-2 years: 45-55
- Blue belt 1-3 years: 52-63
- Purple belt 3-5 years: 62-73
- Brown belt 5-7 years: 70-82
- Black belt 7+ years: 78-95
- Adjust up for strong competition record, down for weak game areas
- Body type and physical attributes can give small bonuses

Respond ONLY with a JSON object, no markdown:
{
  "archetype": "2-3 word archetype (e.g. Guard Wizard, Pressure Passer, Leg Lock Hunter)",
  "description": "2 sentence description of this fighter's style and identity",
  "overall": <realistic number based on guidelines above>,
  "attributes": {
    "topControl": <1-10>,
    "bottomDefense": <1-10>,
    "guardPassing": <1-10>,
    "chokes": <1-10>,
    "legLocks": <1-10>,
    "standing": <1-10>
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "gameplan": "2 sentence recommended gameplan",
  "nextFocus": "Single most important improvement area"
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
