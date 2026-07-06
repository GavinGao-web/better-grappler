'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Analysis = {
  archetype: string;
  description: string;
  overall: number;
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

function FighterCard({ analysis, profile }: { analysis: Analysis; profile: Record<string, string> }) {
  const attrs = [
    { label: 'TOP', value: analysis.attributes.topControl },
    { label: 'BOT', value: analysis.attributes.bottomDefense },
    { label: 'PASS', value: analysis.attributes.guardPassing },
    { label: 'SUB', value: analysis.attributes.chokes },
    { label: 'LEG', value: analysis.attributes.legLocks },
    { label: 'STD', value: analysis.attributes.standing },
  ];

  const overall = analysis.overall || Math.round(Object.values(analysis.attributes).reduce((a, b) => a + b, 0) / 6 * 10);
  const color = (val: number) => val >= 7 ? '#22c55e' : val >= 4 ? '#eab308' : '#ef4444';
  const overallColor = overall >= 70 ? '#22c55e' : overall >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="relative w-64 mx-auto select-none" style={{ aspectRatio: '0.72' }}>
      <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(145deg, #1a1200 0%, #3d2a00 40%, #1a1200 100%)',
        boxShadow: '0 0 40px rgba(212,160,23,0.4), inset 0 0 60px rgba(0,0,0,0.5)',
        border: '2px solid #c9a227',
      }}>
        <div className="absolute inset-0 opacity-20" style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(212,160,23,0.6) 50%, transparent 60%)',
        }} />
      </div>
      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="flex items-start justify-between mb-1">
          <div className="text-left">
            <div className="font-black text-4xl leading-none" style={{ color: overallColor }}>{overall}</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: '#c9a227' }}>{analysis.archetype}</div>
          </div>
          <div className="text-right">
            <div className="text-xs" style={{ color: '#c9a227' }}>🥋</div>
            <div className="text-xs mt-1" style={{ color: '#c9a227' }}>{profile.style?.split(' ')[0] || 'BJJ'}</div>
          </div>
        </div>
        <div className="flex-1 mx-auto w-full rounded-xl overflow-hidden mb-2 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.3)', maxHeight: '180px' }}>
          {profile.photo ? (
            <img src={profile.photo} alt="Fighter" className="w-full h-full object-cover" />
          ) : (
            <div className="text-7xl py-6">🥋</div>
          )}
        </div>
        <div className="text-center mb-2">
          <div className="font-black text-lg tracking-wider uppercase" style={{ color: '#f5e6c0' }}>
            {profile.name || 'Fighter'}
          </div>
          {profile.belt && (
            <div className="text-xs mt-0.5" style={{ color: '#c9a227' }}>{profile.belt}</div>
          )}
        </div>
        <div className="w-full h-px mb-3" style={{ background: 'linear-gradient(to right, transparent, #c9a227, transparent)' }} />
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {attrs.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: '#c9a227' }}>{label}</span>
              <span className="text-sm font-black" style={{ color: color(value) }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfileResults() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fighterProfile');
    if (!stored) { router.push('/profile'); return; }
    const p = JSON.parse(stored);
    setProfile(p);

    const cachedAnalysis = localStorage.getItem('fighterAnalysis');
    if (cachedAnalysis) {
      setAnalysis(JSON.parse(cachedAnalysis));
      setLoading(false);
      return;
    }

    fetch('/api/analyze-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
      .then(r => r.json())
      .then(data => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveCard = () => {
    if (!analysis || !profile) return;
    const cards = JSON.parse(localStorage.getItem('savedCards') || '[]');
    cards.unshift({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      analysis,
      profile,
    });
    localStorage.setItem('savedCards', JSON.stringify(cards));
    localStorage.setItem('fighterAnalysis', JSON.stringify(analysis));
    setSaved(true);
  };

  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🥋</div>
        <p className="text-gray-400 text-lg">Generating your fighter card...</p>
      </div>
    </main>
  );

  if (!analysis || !profile) return null;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <a href="/profile" className="text-gray-500 hover:text-white text-sm flex items-center gap-1">← Edit Profile</a>
          <button
            onClick={saveCard}
            disabled={saved}
            className={`text-sm font-bold px-4 py-2 rounded-lg transition ${saved ? 'bg-green-800 text-green-300' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
          >
            {saved ? '✓ Saved' : '💾 Save Card'}
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-black mb-1">Your Fighter Card</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">{analysis.description}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center py-4">
            <FighterCard analysis={analysis} profile={profile} />
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

          <a href="/opponent"
            className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white transition text-center block">
            ⚔️ Analyze Opponent →
          </a>

          <a href="/" className="w-full py-4 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white transition text-center block">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
