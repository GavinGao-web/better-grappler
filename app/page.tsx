'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [problem, setProblem] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!problem.trim()) {
      setError('Please describe your training problem first.');
      return;
    }
    setError('');
    localStorage.setItem('currentProblem', problem);
    router.push('/results');
  };

  const examples = [
    "I keep getting my guard passed from open guard",
    "I lose back control after taking the back",
    "I can't finish the rear naked choke",
    "I always get swept from half guard",
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tight mb-3">
            Better <span className="text-red-500">Grappler</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Describe your training problem. Get a structured plan.
          </p>
        </div>

        <textarea
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 resize-none h-36 focus:outline-none focus:border-red-500 transition"
          placeholder="e.g. I keep getting passed from open guard... 或者用中文描述你的问题"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition"
        >
          Generate My Training Plan
        </button>

        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-3">Try an example:</p>
          <div className="flex flex-col gap-2">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setProblem(ex)}
                className="text-left text-sm text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg px-4 py-2 transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3">
          <a href="/log" className="flex flex-col items-center justify-center bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl px-4 py-5 transition text-center">
            <div className="text-2xl mb-1">📋</div>
            <div className="text-white font-semibold text-sm">Training Log</div>
            <div className="text-gray-500 text-xs mt-0.5">View past sessions</div>
          </a>
          <a href="/profile" className="flex flex-col items-center justify-center bg-gray-900 hover:bg-gray-800 border border-red-900 rounded-xl px-4 py-5 transition text-center">
            <div className="text-2xl mb-1">🥋</div>
            <div className="text-white font-semibold text-sm">Fighter Profile</div>
            <div className="text-gray-500 text-xs mt-0.5">Analyze your game</div>
          </a>
        </div>
      </div>
    </main>
  );
}
