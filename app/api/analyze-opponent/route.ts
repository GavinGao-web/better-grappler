export const runtime = 'edge';

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  const { myProfile, opponent } = await req.json();

  const prompt = `You are an elite BJJ competition coach. Analyze the matchup between my fighter and their opponent, then generate a detailed game plan.

MY FIGHTER:
- Name: ${myProfile.name || 'My Fighter'}
- Belt: ${myProfile.belt || 'Not specified'}
- Years Training: ${myProfile.years}
- Style: ${myProfile.style}
- Top Game: ${myProfile.topGame}
- Bottom Game: ${myProfile.bottomGame}
- Standing: ${myProfile.standing}
- Signature Techniques: ${myProfile.techniques || 'None'}

OPPONENT:
- Name: ${opponent.name || 'Opponent'}
- Belt: ${opponent.belt || 'Unknown'}
- Years Training: ${opponent.years || 'Unknown'}
- Style: ${opponent.style || 'Unknown'}
- Top Game: ${opponent.topGame || 'Unknown'}
- Bottom Game: ${opponent.bottomGame || 'Unknown'}
- Standing: ${opponent.standing || 'Unknown'}
- Known Techniques: ${opponent.knownTechniques || 'None known'}
- Notes: ${opponent.notes || 'None'}

Respond ONLY with a JSON object, no markdown:
{
  "verdict": "One sentence overall matchup verdict (e.g. 'Favorable matchup if you control the standup')",
  "advantage": "my" or "opponent" or "even",
  "attackPlan": ["attack step 1", "attack step 2", "attack step 3"],
  "avoidList": ["danger to avoid 1", "danger to avoid 2"],
  "openingStrategy": "2 sentence strategy for the first 30 seconds of the match",
  "ifYoureWinning": "What to do when you have the lead",
  "ifYoureLosing": "What to do when you are behind",
  "keyTechniques": ["technique to use 1", "technique to use 2", "technique to use 3"],
  "mentalNote": "One sentence mental/psychological edge to keep in mind"
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
