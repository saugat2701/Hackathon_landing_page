import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPONSORS = [
  { name: 'TechCorp', emoji: '🏢', tier: 'Title Partner' },
  { name: 'Voxel Industries', emoji: '🧊', tier: 'Gold Partner' },
  { name: 'CloudBlocks', emoji: '☁️', tier: 'Cloud Partner' },
  { name: 'Redstone API', emoji: '🔴', tier: 'API Partner' },
];

const JUDGES = [
  {
    name: 'Steve Coder',
    role: 'Lead Developer, Mojang',
    avatarClass: 'avatar-pixel-1 bg-mc-stone',
    badge: 'Redstone Expert',
  },
  {
    name: 'Alex Builder',
    role: 'UX Architect',
    avatarClass: 'avatar-pixel-2 bg-mc-grass',
    badge: 'Design Guru',
  },
  {
    name: 'Ender Dev',
    role: 'Backend Engineer',
    avatarClass: 'avatar-pixel-3 bg-purple-600',
    badge: 'Systems Architect',
  },
];

export default function Sponsors() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sponsors-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.sponsor-card', {
        rotateX: 90,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sponsors-grid',
          start: 'top 80%',
        },
      });

      gsap.from('.judges-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.judges-title',
          start: 'top 85%',
        },
      });

      gsap.from('.judge-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.judges-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="py-12 sm:py-24 bg-mc-dirt border-t-8 border-mc-grass relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Sponsors */}
        <h2 className="sponsors-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          Our Sponsors
        </h2>

        <div className="sponsors-grid grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {SPONSORS.map((sponsor, i) => (
            <div
              key={i}
              className="sponsor-card group mc-panel aspect-square flex flex-col items-center justify-center p-4 hover:-translate-y-3 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer gap-2 relative overflow-hidden hover:shadow-[0_0_30px_rgba(91,156,48,0.5)] border-4 border-black"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="text-4xl sm:text-5xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
                {sponsor.emoji}
              </span>
              <h3 className="font-pixel text-[11px] sm:text-sm text-gray-900 text-center font-bold mt-2">
                {sponsor.name}
              </h3>
              <span className="font-pixel text-[8px] sm:text-[10px] text-gray-600 group-hover:text-mc-grass-dark transition-colors">
                {sponsor.tier}
              </span>
            </div>
          ))}
        </div>

        {/* Judges */}
        <h2 className="judges-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          Judges & Mentors
        </h2>

        <div className="judges-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {JUDGES.map((judge, i) => (
            <div
              key={i}
              className="judge-card group mc-panel flex flex-col items-center p-6 text-center hover:-translate-y-3 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden"
            >
              <div
                className={`w-20 h-20 sm:w-28 sm:h-28 mb-4 border-4 border-black shadow-inner group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300 ${judge.avatarClass}`}
              />
              <h3 className="font-pixel text-sm sm:text-base text-black mb-1 group-hover:text-mc-grass-dark transition-colors">
                {judge.name}
              </h3>
              <p className="text-gray-700 text-xl sm:text-2xl font-pixel-body font-bold mb-2">
                {judge.role}
              </p>
              <span className="font-pixel text-[8px] sm:text-[10px] px-3 py-1 bg-black/80 text-yellow-300 border border-yellow-500">
                {judge.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
