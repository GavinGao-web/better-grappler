'use client';

import { useEffect, useState } from 'react';

type TrainingPlan = {
  focus: string;
  techniques: string[];
  drills: string[];
  sparringGoals: string[];
  coachNote: string;
};

type Session = {
  id: string;
  date: string;
  problem: string;
  plan: TrainingPlan;
};

export default function Log() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sessions') || '[]');
    setSessions(saved);
  }, []);

  const deleteSession = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    localStorage.setItem('sessions', JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-gray-500 hover:text-white text-sm mb-8 flex items-center gap-1">
          ← Back to Home
        </a>
        <h1 className="text-3xl font-black mt-4 mb-2">Training <span className="text-red-500">Log</span></h1>
        <p className="text-gray-400 mb-8">Your saved training sessions.</p>

        {sessions.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">No sessions saved yet.</p>
            <a href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition">
              Generate Your First Plan
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-gray-900 rounded-xl overflow-hidden">
                <div
                  className="p-5 cursor-pointer flex justify-between items-start"
                  onClick={() => setExpanded(expanded === session.id ? null : session.id)}
                >
                  <div>
                    <p className="text-white font-semibold mb-1">"{session.problem}"</p>
                    <p className="text-gray-500 text-sm">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-gray-400 text-lg">{expanded === session.id ? '▲' : '▼'}</span>
                </div>

                {expanded === session.id && session.plan && (
                  <div className="px-5 pb-5 flex flex-col gap-4 border-t border-gray-800 pt-4">
                    <div className="bg-red-950 border border-red-800 rounded-xl p-4">
                      <h3 className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Focus Area</h3>
                      <p className="text-white font-bold">{session.plan.focus}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Techniques</h3>
                      <ul className="flex flex-col gap-1">
                        {session.plan.techniques.map((t, i) => (
                          <li key={i} className="text-gray-200 text-sm flex gap-2">
                            <span className="text-red-500">{i + 1}.</span> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Drills</h3>
                      <ul className="flex flex-col gap-1">
                        {session.plan.drills.map((d, i) => (
                          <li key={i} className="text-gray-200 text-sm flex gap-2">
                            <span className="text-red-500">▸</span> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Sparring Goals</h3>
                      <ul className="flex flex-col gap-1">
                        {session.plan.sparringGoals.map((g, i) => (
                          <li key={i} className="text-gray-200 text-sm flex gap-2">
                            <span className="text-green-500">✓</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-red-400 hover:text-red-300 text-sm text-left transition"
                    >
                      Delete this session
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}