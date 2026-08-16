import { useState } from 'react';

const QUEST_TRACKS = [
  {
    title: 'Redstone AI Assistant 🤖',
    category: 'Artificial Intelligence',
    prompt: 'Build an autonomous agent or tool that solves complex workflows using Redstone-like logic chains.',
    reward: '💎 Diamond Loot Box',
    difficulty: 'Hard (Obsidian Level)',
  },
  {
    title: 'Nether Realm Web3 / Crypto 🔮',
    category: 'Decentralized Apps',
    prompt: 'Craft a dApp or smart contract protocol styled like a portal between Web2 and Web3 realms.',
    reward: '🌟 Nether Star Certificate',
    difficulty: 'Insane (Ender Dragon Level)',
  },
  {
    title: 'Overworld Health & Wellness 🌿',
    category: 'Healthcare & Gamification',
    prompt: 'Develop a app tracking real-life habit streaks, displaying progress as Minecraft heart bars & stamina.',
    reward: '🍎 Golden Apple Swag',
    difficulty: 'Medium (Iron Level)',
  },
  {
    title: 'Village Economy & Fintech 🪙',
    category: 'Fintech & Payments',
    prompt: 'Build a seamless emerald-trading style payment system for micro-transactions or peer sharing.',
    reward: '🟢 Emerald Chest',
    difficulty: 'Medium (Gold Level)',
  },
  {
    title: 'Bedrock Security & DevTools 🛡️',
    category: 'Cybersecurity & Infrastructure',
    prompt: 'Craft developer tools, linters, or security monitors that shield codebases from griefers.',
    reward: '🛡️ Bedrock Armor Badge',
    difficulty: 'Hard (Diamond Level)',
  },
];

export default function QuestGenerator() {
  const [currentQuest, setCurrentQuest] = useState(QUEST_TRACKS[0]);
  const [isRolling, setIsRolling] = useState(false);

  const rollQuest = () => {
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const random = QUEST_TRACKS[Math.floor(Math.random() * QUEST_TRACKS.length)];
      setCurrentQuest(random);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <section
      id="quests"
      className="py-16 sm:py-24 bg-mc-dark relative border-y-8 border-black overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #181124 0%, #0a0710 100%)' }}
    >
      {/* Floating Glyph Magic background */}
      <div className="absolute inset-0 opacity-20 block-pattern-stars" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
        <div className="inline-block px-4 py-1 bg-purple-900/80 border-2 border-purple-500 font-pixel text-xs text-purple-300 mb-4 animate-pulse">
          ✨ Enchanting Table Project Generator ✨
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-white text-shadow mb-4">
          Need A Project Idea?
        </h2>
        <p className="font-pixel-body text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Spin the enchanting altar to discover your hackathon quest & challenge track!
        </p>

        {/* Quest Scroll Card */}
        <div className="mc-panel p-6 sm:p-10 border-4 border-purple-600 bg-gray-900/90 text-left relative shadow-[0_0_50px_rgba(138,43,226,0.4)] mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-4 border-purple-800 pb-4 mb-6">
            <span className="font-pixel text-xs text-purple-400 uppercase tracking-widest">
              {currentQuest.category}
            </span>
            <span className="font-pixel text-[10px] px-3 py-1 bg-purple-950 text-yellow-300 border border-yellow-500">
              Difficulty: {currentQuest.difficulty}
            </span>
          </div>

          <h3 className="font-pixel text-lg sm:text-2xl text-yellow-300 mb-4 flex items-center gap-3">
            {currentQuest.title}
          </h3>

          <p className="font-pixel-body text-xl sm:text-3xl text-gray-200 leading-relaxed mb-6">
            &quot;{currentQuest.prompt}&quot;
          </p>

          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-800 font-pixel text-xs text-mc-diamond">
            <span>Quest Bounty: {currentQuest.reward}</span>
            <span className="text-gray-500 hidden sm:inline">Ranked Track</span>
          </div>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollQuest}
          disabled={isRolling}
          className={`mc-btn-play font-pixel text-sm sm:text-xl px-8 sm:px-12 py-4 bg-purple-700 hover:bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] ${
            isRolling ? 'animate-bounce opacity-70' : 'hover:scale-105'
          }`}
        >
          {isRolling ? '🔮 Enchanting Quest...' : '🎲 Spin Random Quest'}
        </button>
      </div>
    </section>
  );
}
