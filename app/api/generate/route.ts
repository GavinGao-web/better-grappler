import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { problem } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an expert Brazilian Jiu-Jitsu coach. A student has this training problem: "${problem}"

Respond ONLY with a JSON object, no extra text:
{
  "focus": "short focus area title",
  "techniques": ["technique 1", "technique 2", "technique 3", "technique 4"],
  "drills": ["drill 1", "drill 2", "drill 3", "drill 4"],
  "sparringGoals": ["goal 1", "goal 2", "goal 3"],
  "coachNote": "2-3 sentence coaching insight about this specific problem",
  "youtubeQuery": "3-5 word YouTube search query for BJJ videos related to this problem"
}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json|```/g, '').trim();
  const plan = JSON.parse(clean);

  return NextResponse.json(plan);
}