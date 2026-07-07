
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 24 * 60 * 60 * 1000 });
    return true;
  }
  if (limit.count >= 20) return false;
  limit.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Daily limit reached. Try again tomorrow.' }, { status: 429 });
  }

  const { myProfile, opponent } = await req.json();

  const prompt = `You are an elite BJJ competition coach. Analyze the matchup and generate a detailed game plan.

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
  "verdict": "One sentence matchup verdict",
  "advantage": "my" or "opponent" or "even",
  "attackPlan": ["step 1", "step 2", "step 3"],
  "avoidList": ["danger 1", "danger 2"],
  "openingStrategy": "2 sentence opening strategy",
  "ifYoureWinning": "What to do when ahead",
  "ifYoureLosing": "What to do when behind",
  "keyTechniques": ["technique 1", "technique 2", "technique 3"],
  "mentalNote": "One sentence mental edge"
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
