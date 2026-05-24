'use client';

import { useEffect, useState } from 'react';

type TrainingPlan = {
  focus: string;
  techniques: string[];
  drills: string[];
  sparringGoals: string[];
  coachNote: string;
  youtubeQuery: string;
};

export default function Results() {
  const [problem, setProblem] = useState('');
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedProblem = localStorage.getItem('currentProblem');
    if (!storedProblem) {
      window.location.href = '/';
      return;
    }
    setProblem(storedProblem);
    fetchPlan(storedProblem);
  }, []);

  const fetchPlan = async (p: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: p }),
      });
      const data = await res.json();
      setPlan(data);
    } catch {
      console.error('Failed to generate plan');
    }
    setLoading(false);
  };

  const saveToLog = () => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.unshift({ id: Date.now().toString(), date: new Date().toISOString(), problem, plan });
    localStorage.setItem('sessions', JSON.stringify(sessions));
    setSaved(true);
  };

  const getYoutubeUrl = (query: string) => {
    return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
  };

  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🥋</div>
        <p className="text-gray-400 text-lg">Generating your training plan...</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/" onClick={() => localStorage.removeItem('currentProblem')} className="text-gray-500 hover:text-white text-sm mb-8 flex items-center gap-1">
          Back to Home
        </a>

        <h2 className="text-xl text-gray-400 mb-1 mt-4">Your problem:</h2>
        <p className="text-white text-lg font-semibold mb-8 bg-gray-900 rounded-xl px-4 py-3">"{problem}"</p>

        {plan && (
          <div className="flex flex-col gap-6">
            <div className="bg-red-950 border border-red-800 rounded-xl p-5">
              <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">Focus Area</h3>
              <p className="text-white text-xl font-bold">{plan.focus}</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Coach Note</h3>
              <p className="text-gray-200 leading-relaxed">{plan.coachNote}</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Techniques to Study</h3>
              <ul className="flex flex-col gap-2">
                {plan.techniques.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-white">
                    <span className="text-red-500 font-bold">{i + 1}.</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Drills</h3>
              <ul className="flex flex-col gap-2">
                {plan.drills.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-white">
                    <span className="text-red-500">▸</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Sparring Goals</h3>
              <ul className="flex flex-col gap-2">
                {plan.sparringGoals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-white">
                    <span className="text-green-500">✓</span> {g}
                  </li>
                ))}
              </ul>
            </div>

            {plan.youtubeQuery && (
              
                href={getYoutubeUrl(plan.youtubeQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-xl p-5 flex items-center justify-between hover:bg-gray-800 transition"
              >
                <div>
                  <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Recommended Videos</h3>
                  <p className="text-white font-semibold">Search: "{plan.youtubeQuery}"</p>
                  <p className="text-gray-400 text-sm mt-1">Click to find related BJJ tutorials on YouTube</p>
                </div>
                <div className="text-red-500 text-3xl ml-4">▶</div>
              </a>
            )}

            <button
              onClick={saveToLog}
              disabled={saved}
              className={`w-full py-4 rounded-xl font-bold text-lg transition ${saved ? 'bg-green-800 text-green-300 cursor-default' : 'bg-red-600 hover:bg-red-700 text-white'}`}
            >
              {saved ? '✓ Saved to Log' : 'Save to My Log'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}