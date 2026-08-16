import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRIZES = [
  {
    place: '1st',
    emoji: '🥇',
    title: 'Diamond Tier',
    amount: '₹50,000',
    perks: ['Trophy & Certificate', 'Full Swag Kit', 'Internship Fast-Track', '1-on-1 Mentorship'],
    colorClass: 'prize-gold',
    hoverGlow: 'hover:shadow-[0_0_50px_rgba(252,176,64,0.6)]',
    badgeBg: 'bg-yellow-400 text-black',
    borderColor: '#fcb040',
  },
  {
    place: '2nd',
    emoji: '🥈',
    title: 'Emerald Tier',
    amount: '₹30,000',
    perks: ['Trophy & Certificate', 'Full Swag Kit', 'Premium Tool Subscriptions'],
    colorClass: 'prize-diamond',
    hoverGlow: 'hover:shadow-[0_0_50px_rgba(46,232,204,0.6)]',
    badgeBg: 'bg-emerald-400 text-black',
    borderColor: '#2ee8cc',
  },
  {
    place: '3rd',
    emoji: '🥉',
    title: 'Redstone Tier',
    amount: '₹20,000',
    perks: ['Trophy & Certificate', 'Full Swag Kit', 'Cloud Credits Bundle'],
    colorClass: 'prize-redstone',
    hoverGlow: 'hover:shadow-[0_0_50px_rgba(255,59,59,0.6)]',
    badgeBg: 'bg-red-400 text-black',
    borderColor: '#ff3b3b',
  },
];

export default function Prizes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prizes-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.prize-card', {
        y: 80,
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.prizes-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="py-12 sm:py-24 relative border-b-8 border-black overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1d1029 0%, #0f0f1a 100%)' }}
    >
      {/* Star background */}
      <div className="absolute inset-0 opacity-30 block-pattern-stars" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="prizes-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-8 text-white text-shadow">
          Prizes & Loot
        </h2>
        <p className="font-pixel-body text-xl sm:text-2xl text-gray-400 text-center mb-8 sm:mb-16">
          Over ₹1,00,000 worth of treasure awaits the bravest crafters
        </p>

        <div className="prizes-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {PRIZES.map((prize, i) => (
            <div
              key={i}
              className={`prize-card group mc-panel ${prize.colorClass} ${prize.hoverGlow} p-6 sm:p-8 text-center transition-all duration-300 transform hover:-translate-y-4 hover:scale-105 cursor-pointer relative overflow-hidden`}
            >
              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Animated Floating Emoji */}
              <div className="text-6xl sm:text-7xl mb-4 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 inline-block drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                {prize.emoji}
              </div>

              <h3 className="font-pixel text-base sm:text-xl text-gray-900 mb-2 group-hover:text-black transition-colors">
                {prize.place} Place
              </h3>

              <p
                className="font-pixel text-xs sm:text-sm mb-2 uppercase tracking-wider font-bold"
                style={{ color: prize.borderColor }}
              >
                {prize.title}
              </p>

              {/* Amount badge */}
              <div className="my-4 inline-block px-4 py-2 bg-black/80 border-2 border-white/40 group-hover:border-white transition-colors">
                <p
                  className="font-pixel text-xl sm:text-3xl text-shadow group-hover:scale-110 transition-transform duration-200"
                  style={{ color: prize.borderColor }}
                >
                  {prize.amount}
                </p>
              </div>

              <ul className="space-y-2 mt-4 text-left border-t-2 border-gray-400/40 pt-4">
                {prize.perks.map((perk, j) => (
                  <li
                    key={j}
                    className="font-pixel-body text-lg sm:text-xl text-gray-800 group-hover:text-black group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-2"
                  >
                    <span className="text-sm">✦</span> {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Extra prizes */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="font-pixel text-xs sm:text-sm text-yellow-300 text-shadow mb-4 animate-pulse">
            ✨ Special Category Rewards ✨
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {['Best UI/UX 🎨', 'Most Creative 💡', 'Best Use of AI 🤖', 'Community Choice 👑'].map(
              (cat, i) => (
                <span
                  key={i}
                  className="mc-btn font-pixel text-[9px] sm:text-xs px-4 sm:px-5 py-3 bg-mc-obsidian text-gray-200 hover:text-white hover:bg-mc-dark hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  {cat}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
