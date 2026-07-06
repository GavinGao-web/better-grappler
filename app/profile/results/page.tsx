'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Analysis = {
  archetype: string;
  description: string;
  attributes: {
    topControl: number;
    bottomDefense: number;
    guardPassing: number;
    chokes: number;
    legLocks: number;
    standing: number;
  };
  strengths: string[];
  weaknesses: string[];
  gameplan: string;
  nextFocus: string;
};

const attrLabels: Record<string, string> = {
  topControl: 'Top Control',
  bottomDefense: 'Bottom Defense',
  guardPassing: 'Guard Passing',
  chokes: 'Chokes',
  legLocks: 'Leg Locks',
  standing: 'Standing',
};

export default function ProfileResults() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('fighterProfile');
    if (!stored) { router.push('/profile'); return; }
    const p = JSON.parse(stored);
    setProfile(p);
    fetch('/api/analyze-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
      .then(r => r.json())
      .then(data => { setAnalysis(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🥋</div>
        <p className="text-gray-400 text-lg">Analyzing your fighter profile...</p>
      </div>
    </main>
  );

  if (!analysis) return null;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/profile" className="text-gray-500 hover:text-white text-sm mb-8 flex items-center gap-1">← Edit Profile</a>

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🥋</div>
          <h1 className="text-3xl font-black">{profile?.name || 'Fighter'}</h1>
          <div className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full mt-2">
            {analysis.archetype}
          </div>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">{analysis.description}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">Attribute Ratings</h3>
            <div className="flex flex-col gap-3">
              {Object.entries(analysis.attributes).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{attrLabels[key]}</span>
                    <span className="text-white font-bold">{val}/10</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${val * 10}%`,
                        backgroundColor: val >= 7 ? '#22c55e' : val >= 4 ? '#eab308' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-3">Strengths</h3>
              <ul className="flex flex-col gap-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-gray-200 text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-3">Weaknesses</h3>
              <ul className="flex flex-col gap-2">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i} className="text-gray-200 text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Your Gameplan</h3>
            <p className="text-gray-200 leading-relaxed">{analysis.gameplan}</p>
          </div>

          <div className="bg-red-950 border border-red-800 rounded-xl p-5">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">Next Focus</h3>
            <p className="text-white font-semibold">{analysis.nextFocus}</p>
          </div>

          <a href="/" className="w-full py-4 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white transition text-center block">
            Back to Training Plans
          </a>
        </div>
      </div>
    </main>
  );
}
