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
    "I cannot finish the rear naked choke",
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
          placeholder="e.g. I keep getting passed from open guard..."
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
          <div className="flex items-center gap-4 mb-4">
            <img src="/founder.png" alt="Gavin" className="w-16 h-16 rounded-full object-cover border-2 border-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold">来自创始人 Gavin</h3>
              <p className="text-gray-500 text-xs">Better Grappler</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            各位柔友你们好，我是 Better Grappler AI训练产品的创始人Gavin，你们可以叫加文。由衷的感到高兴你们能愿意来玩 Better Grappler，也真心希望产品里的一些功能能够在一定程度上帮助你们成为更优秀的缠斗手！本人当前美本大二在读，在被学业持续拷打的同时也满怀憧憬的在世界各地穷游串馆训练。在高三结束的暑假第一次接触到了MMA，后来在大一开始正式训练摔跤和柔术。在刚入坑柔术的前一年半里我经历无数被军训或者降服，我相信这也是很多白带们的苦恼：缺乏对于柔术整个系统上的认知以及应该如何更切实有效的提升自己。于是我创建了 Better Grappler，希望能帮助到同样也在不断挨打的小伙伴们逐渐找到自己的方法论。你们可以在聊天框输入任何想问的问题（但最好是柔术哈），也可以填写自己的训练背景生成自己的球星卡，如果最近有比赛需求的柔友也可以用它来研究自己的打法以及分析潜在对手。相信在你们不断的反馈和帮助下，Better Grappler的功能会越来越多，也能帮助更多想要练习柔术的朋友！
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-xs">功能建议 / 合作咨询</p>
            <a href="mailto:gwc18758079475@gmail.com" className="text-red-400 hover:text-red-300 text-xs font-medium transition">

cd ~/better-grappler && cat > app/page.tsx << 'PAGEOF'
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
    "I cannot finish the rear naked choke",
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
          placeholder="e.g. I keep getting passed from open guard..."
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
          <div className="flex items-center gap-4 mb-4">
            <img src="/founder.png" alt="Gavin" className="w-16 h-16 rounded-full object-cover border-2 border-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold">来自创始人 Gavin</h3>
              <p className="text-gray-500 text-xs">Better Grappler</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            各位柔友你们好，我是 Better Grappler AI训练产品的创始人Gavin，你们可以叫加文。由衷的感到高兴你们能愿意来玩 Better Grappler，也真心希望产品里的一些功能能够在一定程度上帮助你们成为更优秀的缠斗手！本人当前美本大二在读，在被学业持续拷打的同时也满怀憧憬的在世界各地穷游串馆训练。在高三结束的暑假第一次接触到了MMA，后来在大一开始正式训练摔跤和柔术。在刚入坑柔术的前一年半里我经历无数被军训或者降服，我相信这也是很多白带们的苦恼：缺乏对于柔术整个系统上的认知以及应该如何更切实有效的提升自己。于是我创建了 Better Grappler，希望能帮助到同样也在不断挨打的小伙伴们逐渐找到自己的方法论。你们可以在聊天框输入任何想问的问题（但最好是柔术哈），也可以填写自己的训练背景生成自己的球星卡，如果最近有比赛需求的柔友也可以用它来研究自己的打法以及分析潜在对手。相信在你们不断的反馈和帮助下，Better Grappler的功能会越来越多，也能帮助更多想要练习柔术的朋友！
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-xs">功能建议 / 合作咨询</p>
            <a href="mailto:gwc18758079475@gmail.com" className="text-red-400 hover:text-red-300 text-xs font-medium transition">
              gwc18758079475@gmail.com
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
