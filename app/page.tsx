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

        <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🥋</div>
            <div>
              <h3 className="text-white font-bold text-sm">来自创始人 Gavin</h3>
              <p className="text-gray-500 text-xs">Better Grappler</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            各位柔友你们好，我是 Better Grappler AI训练产品的创始人，你们可以叫我 Gavin（加文）。由衷的感到高兴你们能愿意来玩 Better Grappler，我也非常希望产品的一些功能能够在一定程度上帮助你们成为更优秀的缠斗手！本人当前美本大二在读，在被学业持续拷打的同时也满怀憧憬的在世界各地穷游串馆训练。从一名摔跤手转型柔术，训练时长接近两年，但总体来说并不算能打。但一切的一切不妨碍我希望在柔术世界里留下一点自己的痕迹 —— 于是我创建了 Better Grappler，希望能帮助到同样也在不断挨打的小伙伴们拥有更具体的训练计划。你们可以在聊天框输入任何想问的问题（但最好是柔术哈），也可以填写自己的训练背景生成自己的"球星卡"，如果最近有比赛需求的柔友也可以用它来研究自己的打法以及分析潜在对手。最后，希望 Better Grappler 能够切实有效地为所有柔友们提供便利！
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-xs">功能建议 / 合作咨询</p>
            <a href="mailto:gwc18758079475@gmail.com" className="text-red-400 hover:text-red-300 text-xs font-medium transition">
              gwc18758079475@gmail.com →
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
