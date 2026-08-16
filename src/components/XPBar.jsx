import { useEffect, useState } from 'react';

export default function XPBar({ soundEnabled }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [level, setLevel] = useState(1);
  const [hasDinged, setHasDinged] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setScrollPercent(progress);

      // Scale level from 1 to 26 based on scroll progress
      const currentLevel = Math.max(1, Math.floor((progress / 100) * 26));
      setLevel(currentLevel);

      if (progress >= 95 && !hasDinged) {
        setHasDinged(true);
        if (soundEnabled) {
          try {
            const audio = new Audio('https://www.myinstants.com/media/sounds/minecraft_level_up.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
          } catch (e) {}
        }
      } else if (progress < 80) {
        setHasDinged(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasDinged, soundEnabled]);

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-md pointer-events-none select-none">
      {/* Level Number */}
      <div className="text-center font-pixel text-xs sm:text-sm text-mc-emerald font-bold text-shadow drop-shadow-[0_0_8px_rgba(23,221,98,0.8)] mb-1 animate-pulse">
        {level}
      </div>

      {/* Minecraft XP Bar */}
      <div className="w-full h-3 bg-gray-900 border-2 border-black relative overflow-hidden shadow-[0_0_12px_rgba(0,0,0,0.8)]">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollPercent}%`,
            background: 'repeating-linear-gradient(90deg, #55ff55 0px, #55ff55 10px, #22aa22 10px, #22aa22 12px)',
            boxShadow: '0 0 10px #55ff55',
          }}
        />
      </div>
    </div>
  );
}
