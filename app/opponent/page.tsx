'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Opponent() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', belt: '', years: '', style: '',
    topGame: '', bottomGame: '', standing: '',
    knownTechniques: '', notes: '',
  });

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    localStorage.setItem('opponentProfile', JSON.stringify(form));
    router.push('/opponent/results');
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-xl mx-auto">
        <a href="/profile/results" className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1">← Back to My Card</a>

        <h1 className="text-2xl font-black mb-1">⚔️ Opponent Analysis</h1>
        <p className="text-gray-400 text-sm mb-6">Enter what you know about your opponent. AI will generate a game plan to beat them.</p>

        <div className="flex flex-col gap-5">
          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider">Opponent Info</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Name (optional)</label>
                <input value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                  placeholder="e.g. John" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Belt</label>
                <select value={form.belt} onChange={e => set('belt', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                  <option value="">Select...</option>
                  <option value="White belt">⬜ White</option>
                  <option value="Blue belt">🔵 Blue</option>
                  <option value="Purple belt">🟣 Purple</option>
                  <option value="Brown belt">🟤 Brown</option>
                  <option value="Black belt">⬛ Black</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Years Training</label>
                <input value={form.years} onChange={e => set('years', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                  placeholder="e.g. 4" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Style</label>
                <select value={form.style} onChange={e => set('style', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                  <option value="">Select...</option>
                  <option value="Gi BJJ">Gi BJJ</option>
                  <option value="No-Gi">No-Gi</option>
                  <option value="Wrestling base">Wrestling base</option>
                  <option value="Judo base">Judo base</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider">Their Game</h3>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Top Game</label>
              <select value={form.topGame} onChange={e => set('topGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong top game">Strong top game</option>
                <option value="Average top game">Average</option>
                <option value="Weak top game">Weak top game</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Bottom Game / Guard</label>
              <select value={form.bottomGame} onChange={e => set('bottomGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Dangerous guard">Dangerous guard</option>
                <option value="Average guard">Average guard</option>
                <option value="Weak guard">Weak guard</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Standing / Takedowns</label>
              <select value={form.standing} onChange={e => set('standing', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong takedowns">Strong takedowns</option>
                <option value="Average standing">Average standing</option>
                <option value="Prefers guard pull">Prefers guard pull</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Known Techniques / Danger Zones</label>
              <textarea value={form.knownTechniques} onChange={e => set('knownTechniques', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500 resize-none h-20"
                placeholder="e.g. Very good at heel hooks, likes to berimbolo..." />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Additional Notes</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500 resize-none h-20"
                placeholder="Anything else you know about them..." />
            </div>
          </div>

          <button onClick={handleSubmit}
            className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white transition">
            Generate Game Plan →
          </button>
        </div>
      </div>
    </main>
  );
}
