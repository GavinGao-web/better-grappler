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

function FighterSVG({ attributes }: { attributes: Analysis['attributes'] }) {
  const color = (val: number) => val >= 7 ? '#22c55e' : val >= 4 ? '#eab308' : '#ef4444';
  const opacity = (val: number) => 0.3 + (val / 10) * 0.7;

  return (
    <svg viewBox="0 0 200 320" className="w-48 mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="30" r="22" fill={color(attributes.chokes)} opacity={opacity(attributes.chokes)} />
      <circle cx="100" cy="30" r="22" fill="none" stroke={color(attributes.chokes)} strokeWidth="2" />
      <text x="100" y="34" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">CHOKE</text>

      {/* Neck / Upper body */}
      <rect x="78" y="52" width="44" height="10" rx="4" fill={color(attributes.standing)} opacity={opacity(attributes.standing)} />

      {/* Torso - standing zone */}
      <rect x="68" y="62" width="64" height="60" rx="8" fill={color(attributes.standing)} opacity={opacity(attributes.standing)} />
      <rect x="68" y="62" width="64" height="60" rx="8" fill="none" stroke={color(attributes.standing)} strokeWidth="2" />
      <text x="100" y="88" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">STANDING</text>
      <text x="100" y="100" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">{attributes.standing}/10</text>

      {/* Left arm - top control */}
      <rect x="30" y="65" width="36" height="22" rx="6" fill={color(attributes.topControl)} opacity={opacity(attributes.topControl)} />
      <rect x="30" y="65" width="36" height="22" rx="6" fill="none" stroke={color(attributes.topControl)} strokeWidth="1.5" />
      <text x="48" y="79" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">TOP</text>

      {/* Right arm - guard passing */}
      <rect x="134" y="65" width="36" height="22" rx="6" fill={color(attributes.guardPassing)} opacity={opacity(attributes.guardPassing)} />
      <rect x="134" y="65" width="36" height="22" rx="6" fill="none" stroke={color(attributes.guardPassing)} strokeWidth="1.5" />
      <text x="152" y="79" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">PASS</text>

      {/* Hips - bottom defense */}
      <rect x="72" y="122" width="56" height="40" rx="6" fill={color(attributes.bottomDefense)} opacity={opacity(attributes.bottomDefense)} />
      <rect x="72" y="122" width="56" height="40" rx="6" fill="none" stroke={color(attributes.bottomDefense)} strokeWidth="2" />
      <text x="100" y="139" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">BOTTOM</text>
      <text x="100" y="151" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">{attributes.bottomDefense}/10</text>

      {/* Left leg - leg locks */}
      <rect x="58" y="162" width="36" height="80" rx="8" fill={color(attributes.legLocks)} opacity={opacity(attributes.legLocks)} />
      <rect x="58" y="162" width="36" height="80" rx="8" fill="none" stroke={color(attributes.legLocks)} strokeWidth="1.5" />
      <text x="76" y="200" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold">LEG</text>
      <text x="76" y="210" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold">LOCKS</text>

      {/* Right leg - leg locks */}
      <rect x="106" y="162" width="36" height="80" rx="8" fill={color(attributes.legLocks)} opacity={opacity(attributes.legLocks)} />
      <rect x="106" y="162" width="36" height="80" rx="8" fill="none" stroke={color(attributes.legLocks)} strokeWidth="1.5" />
      <text x="124" y="200" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold">LEG</text>
      <text x="124" y="210" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold">LOCKS</text>
    </svg>
  );
}

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
          <h1 className="text-3xl font-black">{profile?.name || 'Fighter'}</h1>
          <div className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full mt-2">
            {analysis.archetype}
          </div>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">{analysis.description}</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Fighter SVG + Legend */}
          <div className="bg-gray-900 rounded-xl p-5">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4 text-center">Fighter Map</h3>
            <FighterSVG attributes={analysis.attributes} />
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"/><span className="text-gray-400">Strong (7-10)</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"/><span className="text-gray-400">Average (4-6)</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"/><span className="text-gray-400">Weak (1-3)</span></div>
            </div>
          </div>

          {/* Attribute Bars */}
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
                    <div className="h-2 rounded-full transition-all" style={{
                      width: `${val * 10}%`,
                      backgroundColor: val >= 7 ? '#22c55e' : val >= 4 ? '#eab308' : '#ef4444'
                    }} />
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
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
