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
  const glow = (val: number) => val >= 7 ? '#22c55e' : val >= 4 ? '#eab308' : '#ef4444';

  return (
    <svg viewBox="0 0 300 420" className="w-64 mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* HEAD */}
      <circle cx="150" cy="45" r="32" fill="#1f2937" stroke={color(attributes.chokes)} strokeWidth="3" filter="url(#glow)" />
      <circle cx="150" cy="45" r="32" fill={color(attributes.chokes)} opacity="0.15" />
      {/* Face */}
      <circle cx="138" cy="40" r="4" fill={color(attributes.chokes)} opacity="0.8"/>
      <circle cx="162" cy="40" r="4" fill={color(attributes.chokes)} opacity="0.8"/>
      <path d="M138 55 Q150 63 162 55" stroke={color(attributes.chokes)} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Choke label */}
      <text x="150" y="90" textAnchor="middle" fontSize="9" fill={color(attributes.chokes)} fontWeight="bold" opacity="0.9">CHOKES {attributes.chokes}/10</text>

      {/* NECK */}
      <rect x="140" y="77" width="20" height="16" rx="4" fill="#1f2937" stroke={color(attributes.standing)} strokeWidth="1.5"/>

      {/* TORSO */}
      <rect x="100" y="93" width="100" height="90" rx="14" fill="#1f2937" stroke={color(attributes.standing)} strokeWidth="3" filter="url(#glow)"/>
      <rect x="100" y="93" width="100" height="90" rx="14" fill={color(attributes.standing)} opacity="0.1"/>
      {/* Belt line */}
      <rect x="100" y="155" width="100" height="12" rx="0" fill={color(attributes.standing)} opacity="0.3"/>
      <text x="150" y="130" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">STANDING</text>
      <text x="150" y="148" textAnchor="middle" fontSize="18" fill={color(attributes.standing)} fontWeight="black">{attributes.standing}</text>

      {/* LEFT ARM - Top Control */}
      <rect x="52" y="93" width="42" height="28" rx="10" fill="#1f2937" stroke={color(attributes.topControl)} strokeWidth="2.5" filter="url(#glow)"/>
      <rect x="52" y="93" width="42" height="28" rx="10" fill={color(attributes.topControl)} opacity="0.2"/>
      <rect x="44" y="121" width="30" height="50" rx="10" fill="#1f2937" stroke={color(attributes.topControl)} strokeWidth="2"/>
      <rect x="44" y="121" width="30" height="50" rx="10" fill={color(attributes.topControl)} opacity="0.15"/>
      <text x="73" y="112" textAnchor="middle" fontSize="7.5" fill={color(attributes.topControl)} fontWeight="bold">TOP</text>
      <text x="73" y="122" textAnchor="middle" fontSize="7.5" fill={color(attributes.topControl)} fontWeight="bold">{attributes.topControl}/10</text>

      {/* RIGHT ARM - Guard Passing */}
      <rect x="206" y="93" width="42" height="28" rx="10" fill="#1f2937" stroke={color(attributes.guardPassing)} strokeWidth="2.5" filter="url(#glow)"/>
      <rect x="206" y="93" width="42" height="28" rx="10" fill={color(attributes.guardPassing)} opacity="0.2"/>
      <rect x="226" y="121" width="30" height="50" rx="10" fill="#1f2937" stroke={color(attributes.guardPassing)} strokeWidth="2"/>
      <rect x="226" y="121" width="30" height="50" rx="10" fill={color(attributes.guardPassing)} opacity="0.15"/>
      <text x="227" y="112" textAnchor="middle" fontSize="7.5" fill={color(attributes.guardPassing)} fontWeight="bold">PASS</text>
      <text x="227" y="122" textAnchor="middle" fontSize="7.5" fill={color(attributes.guardPassing)} fontWeight="bold">{attributes.guardPassing}/10</text>

      {/* HIPS - Bottom Defense */}
      <rect x="105" y="183" width="90" height="45" rx="10" fill="#1f2937" stroke={color(attributes.bottomDefense)} strokeWidth="3" filter="url(#glow)"/>
      <rect x="105" y="183" width="90" height="45" rx="10" fill={color(attributes.bottomDefense)} opacity="0.15"/>
      <text x="150" y="202" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">BOTTOM</text>
      <text x="150" y="220" textAnchor="middle" fontSize="16" fill={color(attributes.bottomDefense)} fontWeight="black">{attributes.bottomDefense}</text>

      {/* LEFT LEG - Leg Locks */}
      <rect x="107" y="228" width="38" height="90" rx="12" fill="#1f2937" stroke={color(attributes.legLocks)} strokeWidth="2.5" filter="url(#glow)"/>
      <rect x="107" y="228" width="38" height="90" rx="12" fill={color(attributes.legLocks)} opacity="0.15"/>
      <rect x="103" y="308" width="44" height="22" rx="8" fill="#1f2937" stroke={color(attributes.legLocks)} strokeWidth="2"/>
      <rect x="103" y="308" width="44" height="22" rx="8" fill={color(attributes.legLocks)} opacity="0.2"/>
      <text x="126" y="270" textAnchor="middle" fontSize="8" fill={color(attributes.legLocks)} fontWeight="bold">LEG</text>
      <text x="126" y="282" textAnchor="middle" fontSize="8" fill={color(attributes.legLocks)} fontWeight="bold">LOCKS</text>
      <text x="126" y="294" textAnchor="middle" fontSize="8" fill={color(attributes.legLocks)} fontWeight="bold">{attributes.legLocks}/10</text>

      {/* RIGHT LEG - Leg Locks */}
      <rect x="155" y="228" width="38" height="90" rx="12" fill="#1f2937" stroke={color(attributes.legLocks)} strokeWidth="2.5" filter="url(#glow)"/>
      <rect x="155" y="228" width="38" height="90" rx="12" fill={color(attributes.legLocks)} opacity="0.15"/>
      <rect x="153" y="308" width="44" height="22" rx="8" fill="#1f2937" stroke={color(attributes.legLocks)} strokeWidth="2"/>
      <rect x="153" y="308" width="44" height="22" rx="8" fill={color(attributes.legLocks)} opacity="0.2"/>
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
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-5 text-center">Fighter Map</h3>
            <FighterSVG attributes={analysis.attributes} />
            <div className="flex justify-center gap-6 mt-5 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"/><span className="text-gray-400">Strong (7-10)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-500"/><span className="text-gray-400">Average (4-6)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"/><span className="text-gray-400">Weak (1-3)</span></div>
            </div>
          </div>

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
