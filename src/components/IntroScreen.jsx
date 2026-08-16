import { useState, useEffect, useCallback, useRef } from 'react';

const HACKCRAFT = 'HACKCRAFT'.split('');
const BLOCK_TYPES = ['grass', 'dirt', 'stone', '', 'diamond', 'grass', 'stone', 'dirt', ''];

const LOADING_MESSAGES = [
  'Building terrain...',
  'Spawning animals...',
  'Generating caves...',
  'Planting trees...',
  'Loading chunks...',
  'Preparing spawn area...',
  'Simulating world...',
];

function playSound(url, volume = 0.5) {
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch (e) { /* silent fail */ }
}

const SOUNDS = {
  click: 'https://www.myinstants.com/media/sounds/minecraft_click.mp3',
  xp: 'https://www.myinstants.com/media/sounds/minecraft_level_up.mp3',
  block: 'https://www.myinstants.com/media/sounds/wood1.mp3',
  portal: 'https://www.myinstants.com/media/sounds/portal_travel.mp3',
  chest: 'https://www.myinstants.com/media/sounds/chestopen.mp3',
};

function Particle({ color, style }) {
  return (
    <div
      className="block-particle"
      style={{
        backgroundColor: color,
        '--px': `${(Math.random() - 0.5) * 40}px`,
        '--py': `${-Math.random() * 30 - 10}px`,
        ...style,
      }}
    />
  );
}

function SteveCharacter({ placing }) {
  return (
    <div className="steve-mini" style={{ animation: 'steveWalk 0.4s ease-in-out infinite' }}>
      <div className="steve-head" />
      <div className="relative">
        <div className="steve-arm steve-arm-left" />
        <div className="steve-body" />
        <div
          className="steve-arm steve-arm-right"
          style={{ animation: placing ? 'pickaxeSwing 0.3s ease-in-out infinite' : 'none' }}
        />
      </div>
      <div className="steve-legs">
        <div className="steve-leg" />
        <div className="steve-leg" />
      </div>
    </div>
  );
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('menu');
  const [progress, setProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [placedBlocks, setPlacedBlocks] = useState([]);
  const [particles, setParticles] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [stevePos, setStevePos] = useState(0);
  const particleIdRef = useRef(0);

  const handleStart = useCallback(() => {
    playSound(SOUNDS.click);
    setTimeout(() => playSound(SOUNDS.xp, 0.6), 100);
    setPhase('loading');
  }, []);

  // Loading phase
  useEffect(() => {
    if (phase !== 'loading') return;

    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 12 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('building'), 600);
      }
      setProgress(Math.min(prog, 100));
      setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 250);

    return () => clearInterval(interval);
  }, [phase]);

  // Building phase
  useEffect(() => {
    if (phase !== 'building') return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < HACKCRAFT.length) {
        const currentIndex = index;
        setStevePos(currentIndex);
        setPlacedBlocks(prev => [...prev, {
          char: HACKCRAFT[currentIndex],
          type: BLOCK_TYPES[currentIndex % BLOCK_TYPES.length],
          index: currentIndex,
        }]);

        // Spawn particles
        const colors = ['#5b9c30', '#7c5334', '#8f6841', '#7d7d7d'];
        const newParticles = Array.from({ length: 4 }, (_, i) => ({
          id: particleIdRef.current++,
          color: colors[Math.floor(Math.random() * colors.length)],
          blockIndex: currentIndex,
        }));
        setParticles(prev => [...prev, ...newParticles]);

        playSound(SOUNDS.block, 0.4);
        index++;
      } else {
        clearInterval(interval);

        // Play completion sounds
        playSound(SOUNDS.xp, 0.7);
        playSound(SOUNDS.chest, 0.5);

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 1000);
        }, 2000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  // Clean up particles after animation
  useEffect(() => {
    if (particles.length === 0) return;
    const timeout = setTimeout(() => {
      setParticles(prev => prev.slice(Math.max(0, prev.length - 20)));
    }, 600);
    return () => clearTimeout(timeout);
  }, [particles]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 block-pattern" />

      {/* === MENU PHASE === */}
      {phase === 'menu' && (
        <div className="flex flex-col items-center gap-4 z-10 px-4">
          {/* MC-style title */}
          <div className="mb-6 sm:mb-10">
            <h1 className="mc-logo text-2xl sm:text-4xl md:text-6xl text-center leading-tight tracking-widest">
              HACKCRAFT
            </h1>
            <p className="font-pixel-body text-xl sm:text-2xl text-gray-400 text-center mt-3">
              Minecraft Hackathon Edition
            </p>
          </div>

          {/* Menu button */}
          <button
            onClick={handleStart}
            className="mc-btn-play font-pixel text-sm sm:text-lg px-8 sm:px-12 py-4 sm:py-5 bg-mc-grass text-white animate-pulse-glow w-64 sm:w-80 text-center"
          >
            ▶ Start Game
          </button>

          <p className="font-pixel text-[8px] sm:text-[10px] text-gray-600 mt-6 sm:mt-10">
            Hackcraft 2026 — Not affiliated with Mojang
          </p>
        </div>
      )}

      {/* === LOADING PHASE === */}
      {phase === 'loading' && (
        <div className="flex flex-col items-center gap-6 z-10 px-4">
          <h2 className="font-pixel text-lg sm:text-2xl text-white animate-pulse text-shadow-lg">
            Loading World...
          </h2>

          {/* Dirt-block progress bar */}
          <div className="w-64 sm:w-96 h-8 sm:h-10 bg-gray-900 border-4 border-gray-600 relative overflow-hidden">
            <div
              className="h-full progress-fill transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-[10px] sm:text-xs text-white text-shadow">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <p className="font-pixel-body text-base sm:text-xl text-gray-500 animate-pulse">
            {loadingMsg}
          </p>
        </div>
      )}

      {/* === BUILDING PHASE === */}
      {phase === 'building' && (
        <div className="flex flex-col items-center gap-6 sm:gap-8 z-10 px-4">
          <p className="font-pixel text-xs sm:text-sm text-gray-400">
            ⛏️ Building Hackcraft...
          </p>

          <div className="relative">
            {/* Block row */}
            <div className="flex gap-1 sm:gap-2 items-end">
              {HACKCRAFT.map((char, i) => {
                const placed = placedBlocks.find(b => b.index === i);
                return (
                  <div key={i} className="relative">
                    <div
                      className={`falling-block ${placed ? `dropped ${BLOCK_TYPES[i % BLOCK_TYPES.length]}` : ''}`}
                    >
                      <span className="text-shadow">{char}</span>
                    </div>
                    {/* Particles */}
                    {particles
                      .filter(p => p.blockIndex === i)
                      .map(p => (
                        <Particle key={p.id} color={p.color} style={{ top: '50%', left: '50%' }} />
                      ))}
                  </div>
                );
              })}
            </div>

            {/* Steve character */}
            {placedBlocks.length > 0 && placedBlocks.length < HACKCRAFT.length && (
              <div
                className="absolute -bottom-20 transition-all duration-200"
                style={{
                  left: `${stevePos * (100 / HACKCRAFT.length)}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <SteveCharacter placing={true} />
              </div>
            )}
          </div>

          {/* Completion effect */}
          {placedBlocks.length === HACKCRAFT.length && (
            <div className="flex flex-col items-center gap-3 animate-bounce">
              <p className="font-pixel text-xs sm:text-sm text-mc-gold text-shadow-md">
                ✨ World Ready! ✨
              </p>
              <SteveCharacter placing={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
