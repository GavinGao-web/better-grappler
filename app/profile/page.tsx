'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    years: '',
    weight: '',
    style: '',
    topGame: '',
    bottomGame: '',
    standing: '',
    techniques: '',
  });

  const handleSubmit = () => {
    if (!form.years || !form.style) return;
    localStorage.setItem('fighterProfile', JSON.stringify(form));
    router.push('/profile/results');
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-gray-500 hover:text-white text-sm mb-8 flex items-center gap-1">← Back</a>

        <h1 className="text-3xl font-black mb-1">Fighter <span className="text-red-500">Profile</span></h1>
        <p className="text-gray-400 mb-8">Tell us about your game. We'll generate your fighter analysis.</p>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider">Basic Info</h3>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Name / Nickname (optional)</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                placeholder="e.g. The Rubber Guard" />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Years Training *</label>
              <select value={form.years} onChange={e => set('years', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="less than 1 year">Less than 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-4 years">2-4 years</option>
                <option value="4-7 years">4-7 years</option>
                <option value="7+ years">7+ years</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Weight Class</label>
              <select value={form.weight} onChange={e => set('weight', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Rooster (-57.5kg)">Rooster (-57.5kg)</option>
                <option value="Light Feather (-64kg)">Light Feather (-64kg)</option>
                <option value="Feather (-70kg)">Feather (-70kg)</option>
                <option value="Light (-76kg)">Light (-76kg)</option>
                <option value="Middle (-82.3kg)">Middle (-82.3kg)</option>
                <option value="Medium Heavy (-88.3kg)">Medium Heavy (-88.3kg)</option>
                <option value="Heavy (-97.3kg)">Heavy (-97.3kg)</option>
                <option value="Super Heavy (-107.3kg)">Super Heavy (-107.3kg)</option>
                <option value="Ultra Heavy (+107.3kg)">Ultra Heavy (+107.3kg)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Primary Style *</label>
              <select value={form.style} onChange={e => set('style', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Pure BJJ (Gi)">Pure BJJ (Gi)</option>
                <option value="No-Gi / Submission Wrestling">No-Gi / Submission Wrestling</option>
                <option value="Wrestling base">Wrestling base</option>
                <option value="Judo base">Judo base</option>
                <option value="Mixed (Gi + No-Gi)">Mixed (Gi + No-Gi)</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider">Your Game</h3>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Top Game Strength</label>
              <select value={form.topGame} onChange={e => set('topGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong - I prefer top position">Strong - I prefer top position</option>
                <option value="Average - comfortable but not my best">Average</option>
                <option value="Weak - I struggle on top">Weak - I struggle on top</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Bottom Game Strength</label>
              <select value={form.bottomGame} onChange={e => set('bottomGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong - I have a dangerous guard">Strong - dangerous guard</option>
                <option value="Average - I can hold my own">Average</option>
                <option value="Weak - I get passed easily">Weak - get passed easily</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Standing / Takedowns</label>
              <select value={form.standing} onChange={e => set('standing', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong - I pull takedowns consistently">Strong - consistent takedowns</option>
                <option value="Average - I can get the fight to the ground">Average</option>
                <option value="Weak - I prefer to pull guard">Weak - prefer guard pull</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Signature Techniques (optional)</label>
              <textarea value={form.techniques} onChange={e => set('techniques', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500 resize-none h-20"
                placeholder="e.g. Triangle choke, Berimbolo, Heel hook..." />
            </div>
          </div>

          <button onClick={handleSubmit}
            className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white transition">
            Generate My Fighter Profile →
          </button>
        </div>
      </div>
    </main>
  );
}
