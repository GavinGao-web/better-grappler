import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { problem } = await req.json();

  // 假数据模拟 AI 回复
  const plan = {
    focus: "Open Guard Retention & Recovery",
    techniques: [
      "De La Riva guard — controlling the sleeve and collar",
      "Lasso guard to sweep combinations",
      "Sit-up guard to single leg takedown",
      "Spider guard to triangle transition",
    ],
    drills: [
      "Shrimp and replace guard 3x10 reps each side",
      "De La Riva hook entry from standing partner — 5 min",
      "Guard recovery from knee slice position — 3x5 reps",
      "Sweep flow drill: De La Riva → lasso → sit-up — 10 min",
    ],
    sparringGoals: [
      "Focus only on guard retention — don't worry about sweeping yet",
      "Every time guard is passed, immediately work back to guard",
      "Track how many times guard is passed per round",
    ],
    coachNote: `Your problem with "${problem}" is very common at the intermediate level. The key is learning to create frames and recover guard position before your opponent can establish pressure. Focus on your hip movement and early reactions rather than waiting until you're already being passed.`,
  };

  // 模拟 AI 延迟
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json(plan);
}