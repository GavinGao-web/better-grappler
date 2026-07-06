'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type GamePlan = {
  verdict: string;
  advantage: 'my' | 'opponent' | 'even';
  attackPlan: string[];
  avoidList: string[];
  openingStrategy: string;
  ifYoureWinning: string;
  ifYoureLosing: string;
  keyTechniques: string[];
  mentalNote: string;
};

export default function OpponentResults() {
  const router = useRouter();
  const [plan, setPlan] = useState<GamePlan | null>(null);
  const [opponent, setOpponent] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myProfile = localStorage.getItem('fighterProfile');
    const opp = localStorage.getItem('opponentProfile');
    if (!myProfile || !opp) { router.push('/opponent'); return; }
    const oppData = JSON.parse(opp);
    setOpponent(oppData);

    fetch('/api/analyze-opponent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ myProfile: JSON.parse(myProfile), opponent: oppData }),
    })
      .then(r => r.json())
      .then(data => { setPlan(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⚔️</div>
        <p className="text-gray-400 text-lg">Analyzing the matchup...</p>
      </div>
    </main>
  );

  if (!plan) return null;

  const advantageColor = plan.advantage === 'my' ? 'text-green-400' : plan.advantage === 'opponent' ? 'text-red-400' : 'text-yellow-400';
  const advantageText = plan.advantage === 'my' ? '✅ You have the edge' : plan.advantage === 'opponent' ? '⚠️ Tough matchup' : '⚖️ Even matchup';

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/opponent" className="text-gray-500 hover:text-white text-sm mb-8 flex items-center gap-1">← Edit Opponent</a>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-1">⚔️ Game Plan vs {opponent?.name || 'Opponent'}</h1>
          <div className={`text-lg font-bold mt-2 ${advantageColor}`}>{advantageText}</div>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">{plan.verdict}</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-2">🥊 Opening Strategy</h3>
            <p className="text-gray-200 leading-relaxed">{plan.openingStrategy}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-3">Attack Plan</h3>
            <ol className="flex flex-col gap-2">
              {plan.attackPlan.map((step, i) => (
                <li key={i} className="text-gray-200 text-sm flex items-start gap-3">
                  <span className="text-red-500 font-black text-base leading-tight">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-3">Key Techniques to Use</h3>
            <ul className="flex flex-col gap-2">
              {plan.keyTechniques.map((t, i) => (
                <li key={i} className="text-gray-200 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">▸</span> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-950 border border-red-900 rounded-xl p-5">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-3">⚠️ Danger Zones — Avoid These</h3>
            <ul className="flex flex-col gap-2">
              {plan.avoidList.map((d, i) => (
                <li key={i} className="text-gray-200 text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span> {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-2">If You're Winning</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{plan.ifYoureWinning}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">If You're Losing</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{plan.ifYoureLosing}</p>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h3 className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">💭 Mental Edge</h3>
            <p className="text-white font-semibold">{plan.mentalNote}</p>
          </div>

          <a href="/profile/results" className="w-full py-4 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white transition text-center block">
            ← Back to My Card
          </a>
        </div>
      </div>
    </main>
  );
}
