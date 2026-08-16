import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DESKTOP = [
  { emoji: '👋', label: 'Opening (10 AM)', desc: 'Kickoff and team matching' },
  { emoji: '💻', label: 'Hacking Begins (11 AM)', desc: 'Servers open & hacking starts' },
  { emoji: '🍕', label: 'Midnight Pizza (12 AM)', desc: 'Refuel hunger with hot slices' },
  { emoji: '☕', label: 'Morning Coffee (8 AM)', desc: 'Speed Potion II brewing' },
  { emoji: '🛑', label: 'Hacking Ends (11 AM)', desc: 'Git freeze and DevPost lock' },
  { emoji: '🎤', label: 'Pitches (1 PM)', desc: 'Live demos to judges' },
  { emoji: '🏆', label: 'Awards (4 PM)', desc: 'Loot distribution & closing' },
  { emoji: null, label: null },
  { emoji: null, label: null },
];

const TIMELINE_MOBILE = [
  { emoji: '👋', time: '10:00 AM', label: 'Opening Ceremony' },
  { emoji: '💻', time: '11:00 AM', label: 'Hacking Begins' },
  { emoji: '🍕', time: '12:00 AM', label: 'Midnight Pizza' },
  { emoji: '☕', time: '8:00 AM', label: 'Morning Coffee' },
  { emoji: '🛑', time: '11:00 AM', label: 'Hacking Ends' },
  { emoji: '🎤', time: '1:00 PM', label: 'Pitches' },
  { emoji: '🏆', time: '4:00 PM', label: 'Awards Ceremony' },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const [craftedNotice, setCraftedNotice] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.crafting-table', {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.crafting-table',
          start: 'top 80%',
        },
      });

      gsap.from('.craft-cell', {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.crafting-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSlotClick = (item, index) => {
    if (!item?.label) return;
    setActiveSlot(index);
    setCraftedNotice(`Selected: ${item.label}`);
    setTimeout(() => setActiveSlot(null), 400);
  };

  const handleCraftDiamond = () => {
    setCraftedNotice('🎉 EPIC CRAFT: 24h Hackathon Project Built! 💎');
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="py-12 sm:py-24 bg-mc-wood block-pattern-wood border-b-8 border-black relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="timeline-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          Crafting Timeline
        </h2>

        <div className="crafting-table max-w-4xl mx-auto bg-mc-panel p-3 sm:p-4 md:p-8 border-4 sm:border-8 border-gray-300 shadow-[inset_-8px_-8px_0px_0px_rgba(0,0,0,0.2)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 border-b-4 border-gray-400 pb-3 sm:pb-4">
            <h3 className="font-pixel text-[10px] sm:text-sm text-gray-700">
              Recipe: <span className="text-black">Hackathon Project (3x3)</span>
            </h3>
            <div className="px-2 sm:px-3 py-1 bg-gray-300 text-gray-800 font-pixel text-[10px] sm:text-xs border-2 border-white border-b-gray-500 border-r-gray-500">
              24H DURATION
            </div>
          </div>

          {/* Interactive Notice */}
          {craftedNotice && (
            <div className="mb-4 p-2 bg-black/80 border-2 border-mc-diamond text-center font-pixel text-xs text-mc-diamond animate-bounce">
              {craftedNotice}
            </div>
          )}

          {/* Desktop: 3x3 Grid */}
          <div className="hidden sm:flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="crafting-grid grid grid-cols-3 gap-2.5 bg-gray-400 p-3 border-4 border-gray-500 border-t-gray-300 border-l-gray-300 shadow-inner">
              {TIMELINE_DESKTOP.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSlotClick(item, i)}
                  className={`craft-cell w-16 h-16 md:w-20 md:h-20 bg-gray-300 border-4 border-gray-500 border-t-gray-200 border-l-gray-200 transition-all cursor-pointer group relative flex items-center justify-center ${
                    activeSlot === i ? 'scale-90 bg-yellow-200 border-yellow-500' : 'hover:scale-105'
                  }`}
                >
                  {item.emoji && (
                    <>
                      <div className="text-3xl group-hover:scale-125 transition-transform">
                        {item.emoji}
                      </div>
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/95 text-white text-base px-3 py-1.5 hidden group-hover:block whitespace-nowrap z-30 border-2 border-mc-diamond shadow-2xl font-pixel-body">
                        <span className="font-pixel text-xs text-yellow-300 block">{item.label}</span>
                        <span className="text-gray-300 text-sm">{item.desc}</span>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Arrow */}
            <div className="text-4xl md:text-6xl text-gray-500 font-pixel animate-pulse">➔</div>

            {/* Output */}
            <button
              onClick={handleCraftDiamond}
              className="craft-cell w-24 h-24 md:w-32 md:h-32 bg-gray-300 border-4 border-gray-500 border-t-gray-200 border-l-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all group relative cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
            >
              <div className="text-5xl md:text-6xl group-hover:scale-125 transition-transform animate-pulse">
                💎
              </div>
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-lg px-3 py-1.5 hidden group-hover:block whitespace-nowrap z-30 border-2 border-yellow-400 font-pixel-body">
                <span className="text-mc-diamond font-pixel text-xs block">Grand Prize Project!</span>
                <span className="text-gray-300 text-sm">Click to Craft</span>
              </div>
            </button>
          </div>

          {/* Mobile: Timeline List */}
          <div className="timeline-mobile-list flex sm:hidden flex-col gap-3">
            {TIMELINE_MOBILE.map((item, i) => (
              <div
                key={i}
                className="timeline-mobile-item flex items-center gap-3 bg-gray-200 border-2 border-gray-400 p-3"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="font-pixel-body text-lg text-gray-800 font-bold">
                  {item.time} — {item.label}
                </div>
              </div>
            ))}
            <button
              onClick={handleCraftDiamond}
              className="flex items-center justify-center gap-3 bg-gray-300 border-4 border-gray-500 p-4 mt-2 active:scale-95"
            >
              <span className="text-3xl animate-pulse">💎</span>
              <div className="font-pixel text-xs text-gray-800">Tap to Craft Epic Project!</div>
            </button>
          </div>

          <p className="text-center font-pixel-body text-base sm:text-xl text-gray-600 mt-4 sm:mt-8">
            Click the ingredients or result box to inspect and craft your submission!
          </p>
        </div>
      </div>
    </section>
  );
}
