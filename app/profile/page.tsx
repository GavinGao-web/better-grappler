'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const defaultForm = {
  name: '', years: '', weight: '', style: '',
  topGame: '', bottomGame: '', standing: '', techniques: '',
};

export default function Profile() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [photo, setPhoto] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('fighterProfileSaved');
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed.form || defaultForm);
      setPhoto(parsed.photo || null);
      setHasSaved(true);
    }
  }, []);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem('fighterProfileSaved', JSON.stringify({ form, photo }));
    setHasSaved(true);
    alert('Profile saved!');
  };

  const clearProfile = () => {
    localStorage.removeItem('fighterProfileSaved');
    setForm(defaultForm);
    setPhoto(null);
    setHasSaved(false);
  };

  const handleSubmit = () => {
    localStorage.setItem('fighterProfile', JSON.stringify({ ...form, photo }));
    router.push('/profile/results');
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-xl mx-auto">
        <a href="/" className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1">← Back to Home</a>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Fighter Profile</h1>
          <div className="flex gap-2">
            {hasSaved && (
              <span className="text-green-400 text-xs flex items-center gap-1 bg-green-950 px-3 py-1 rounded-full border border-green-800">
                ✓ Saved
              </span>
            )}
            <button onClick={saveProfile} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition">
              Save Profile
            </button>
            {hasSaved && (
              <button onClick={clearProfile} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-lg transition">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-gray-900 rounded-xl p-5 mb-6 flex items-center gap-5">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-full border-2 border-dashed border-gray-600 hover:border-red-500 flex items-center justify-center cursor-pointer overflow-hidden transition flex-shrink-0"
          >
            {photo ? (
              <img src={photo} alt="Fighter" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">🥋</span>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Profile Photo</p>
            <p className="text-gray-400 text-xs mt-0.5">Optional — click to upload</p>
            <button onClick={() => fileRef.current?.click()} className="mt-2 text-xs text-red-400 hover:text-red-300 transition">
              {photo ? 'Change photo' : 'Upload photo'}
            </button>
            {photo && (
              <button onClick={() => setPhoto(null)} className="ml-3 text-xs text-gray-500 hover:text-gray-400 transition">
                Remove
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Basic Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Name / Nickname</label>
                <input value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                  placeholder="e.g. The Wizard" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Years Training</label>
                <input value={form.years} onChange={e => set('years', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                  placeholder="e.g. 2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Weight Class</label>
                <input value={form.weight} onChange={e => set('weight', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500"
                  placeholder="e.g. 75kg / Middleweight" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Style</label>
                <select value={form.style} onChange={e => set('style', e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                  <option value="">Select...</option>
                  <option value="Gi BJJ">Gi BJJ</option>
                  <option value="No-Gi / Submission Wrestling">No-Gi / Submission Wrestling</option>
                  <option value="Wrestling base">Wrestling base</option>
                  <option value="Judo base">Judo base</option>
                  <option value="Mixed (Gi + No-Gi)">Mixed (Gi + No-Gi)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider">Your Game</h3>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Top Game Strength</label>
              <select value={form.topGame} onChange={e => set('topGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong – I prefer top position">Strong – I prefer top position</option>
                <option value="Average – comfortable but not my best">Average</option>
                <option value="Weak – I struggle on top">Weak – I struggle on top</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Bottom Game Strength</label>
              <select value={form.bottomGame} onChange={e => set('bottomGame', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong – I have a dangerous guard">Strong – dangerous guard</option>
                <option value="Average – I can hold my own">Average</option>
                <option value="Weak – I get passed easily">Weak – get passed easily</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Standing / Takedowns</label>
              <select value={form.standing} onChange={e => set('standing', e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white outline-none border border-gray-700 focus:border-red-500">
                <option value="">Select...</option>
                <option value="Strong – I pull takedowns consistently">Strong – consistent takedowns</option>
                <option value="Average – I can get the fight to the ground">Average</option>
                <option value="Weak – I prefer to pull guard">Weak – prefer guard pull</option>
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
