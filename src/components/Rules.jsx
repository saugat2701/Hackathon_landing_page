import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RULES = [
  {
    emoji: '👥',
    title: 'Team Size',
    desc: 'Teams can consist of 1 to 4 members. You can go solo or party up to face the Ender Dragon (aka the deadline) together!',
    tag: '1-4 Crafters',
  },
  {
    emoji: '🎓',
    title: 'Eligibility',
    desc: "Open to all students, professionals, and coding enthusiasts worldwide. If you can type code, you're welcome here!",
    tag: 'All Skill Levels',
  },
  {
    emoji: '⏱️',
    title: 'Fresh Code',
    desc: 'All projects must be started from scratch during the hackathon. No pre-existing code allowed (except boilerplate and open-source libraries).',
    tag: '100% Original',
  },
  {
    emoji: '⚖️',
    title: 'Code of Conduct',
    desc: "Be respectful, collaborate effectively, and don't grief other teams' workspaces. Play fair and support your fellow miners!",
    tag: 'No Griefing',
  },
  {
    emoji: '🔧',
    title: 'Tech Stack',
    desc: 'Use any technology, framework, or language. Web, mobile, hardware, AI, game dev — all domains are welcome.',
    tag: 'Any Stack',
  },
  {
    emoji: '📝',
    title: 'Submission',
    desc: 'Submit your project via DevPost before the 24-hour deadline. Include a working demo video, README, and source repo.',
    tag: 'DevPost Portal',
  },
];

export default function Rules() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1.2);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rules-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Continuous Seamless Auto-Scroll Engine
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId;

    const scrollStep = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;

        // When half of the duplicated list has scrolled past, seamlessly reset back to start
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        } else if (container.scrollLeft <= 0 && scrollSpeed < 0) {
          container.scrollLeft = maxScroll;
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, scrollSpeed]);

  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction * 350,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate cards for infinite loop
  const displayRules = [...RULES, ...RULES];

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="py-16 sm:py-24 bg-mc-stone block-pattern-stone border-b-8 border-black overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="rules-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-3 sm:mb-4 text-white text-shadow">
          Rules & Eligibility
        </h2>
        <p className="font-pixel-body text-xl sm:text-2xl text-gray-300 text-center mb-8 sm:mb-12">
          Master the rules of the realm before stepping into the crafting arena
        </p>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={() => handleManualScroll(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 mc-btn w-10 h-10 sm:w-12 sm:h-12 bg-black/80 text-white font-pixel text-lg flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all shadow-xl"
            aria-label="Scroll left"
          >
            ◀
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleManualScroll(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 mc-btn w-10 h-10 sm:w-12 sm:h-12 bg-black/80 text-white font-pixel text-lg flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all shadow-xl"
            aria-label="Scroll right"
          >
            ▶
          </button>

          {/* Auto-scrolling Track */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden pb-6 sm:pb-8 gap-5 sm:gap-8 hide-scrollbar cursor-grab active:cursor-grabbing select-none"
            style={{ scrollBehavior: 'auto' }}
          >
            {displayRules.map((rule, i) => (
              <div
                key={i}
                className="rule-card mc-panel min-w-[280px] sm:min-w-[340px] md:min-w-[380px] p-5 sm:p-6 shrink-0 transition-all duration-300 transform hover:-translate-y-3 hover:scale-102 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b-4 border-gray-400 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl filter drop-shadow">{rule.emoji}</span>
                    <h3 className="font-pixel text-sm sm:text-base text-gray-900 font-bold">
                      {rule.title}
                    </h3>
                  </div>
                  <span className="font-pixel text-[8px] sm:text-[9px] px-2 py-1 bg-black/80 text-yellow-300 border border-yellow-500">
                    {rule.tag}
                  </span>
                </div>

                <p className="text-gray-800 text-lg sm:text-2xl font-pixel-body leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Status / Controls Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <span className="text-yellow-300 font-pixel text-[10px] sm:text-xs animate-pulse bg-black/60 px-3 py-1.5 border border-yellow-500">
            {isPaused ? '⏸️ Auto-Scroll Paused (Hovering)' : '⚡ Auto-Scrolling Active'}
          </span>
          <button
            onClick={() => setScrollSpeed((s) => (s === 1.2 ? 2.5 : s === 2.5 ? -1.2 : 1.2))}
            className="mc-btn font-pixel text-[9px] sm:text-xs px-3 py-1.5 bg-gray-800 text-gray-200 hover:text-white"
          >
            Speed / Reverse 🔄
          </button>
        </div>
      </div>
    </section>
  );
}
