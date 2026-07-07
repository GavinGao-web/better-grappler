import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  const { problem } = await req.json();

  const isChinese = /[\u4e00-\u9fff]/.test(problem);

  const prompt = isChinese ? `你是一位专业的BJJ（巴西柔术）教练。根据学员描述的训练问题，生成一份结构化的训练计划。

学员问题：${problem}

请只返回JSON格式，不要有任何markdown或额外说明：
{
  "focus": "本次训练的核心重点（简短，10字以内）",
  "techniques": ["技术1", "技术2", "技术3"],
  "drills": ["训练动作1", "训练动作2", "训练动作3"],
  "sparringGoals": ["对练目标1", "对练目标2", "对练目标3"],
  "coachNote": "教练寄语（2-3句话，针对这个问题的具体建议）",
  "youtubeQuery": "YouTube search keywords in English for related BJJ tutorials"
}` : `You are an expert BJJ coach. Based on the student's training problem, generate a structured training plan.

Student problem: ${problem}

Respond ONLY with a JSON object, no markdown, no explanation:
{
  "focus": "Core focus area (short phrase)",
  "techniques": ["technique 1", "technique 2", "technique 3"],
  "drills": ["drill 1", "drill 2", "drill 3"],
  "sparringGoals": ["goal 1", "goal 2", "goal 3"],
  "coachNote": "2-3 sentence coaching note specific to this problem",
  "youtubeQuery": "YouTube search keywords for related BJJ tutorials"
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
