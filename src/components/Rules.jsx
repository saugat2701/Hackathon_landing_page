import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RULES = [
  {
    emoji: '👥',
    title: 'Team Size',
    desc: 'Teams can consist of 1 to 4 members. You can go solo or party up to face the Ender Dragon (aka the deadline) together!',
  },
  {
    emoji: '🎓',
    title: 'Eligibility',
    desc: "Open to all students, professionals, and coding enthusiasts. If you can type code, you're welcome here!",
  },
  {
    emoji: '⏱️',
    title: 'Fresh Code',
    desc: 'All projects must be started from scratch during the hackathon. No pre-existing code allowed (except boilerplate and open-source libraries).',
  },
  {
    emoji: '⚖️',
    title: 'Code of Conduct',
    desc: "Be respectful, collaborate effectively, and don't grief other teams' workspaces. Play fair!",
  },
  {
    emoji: '🔧',
    title: 'Tech Stack',
    desc: 'Use any technology, framework, or language. Web, mobile, hardware, AI — all domains are welcome.',
  },
  {
    emoji: '📝',
    title: 'Submission',
    desc: 'Submit your project via DevPost before the deadline. Include a demo video, README, and source code.',
  },
];

export default function Rules() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

      gsap.from('.rule-card', {
        x: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.rules-scroll',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId;
    const speed = 0.8;

    const autoScroll = () => {
      if (!isHovered) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="py-12 sm:py-24 bg-mc-stone block-pattern-stone border-b-8 border-black overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="rules-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          Rules & Eligibility
        </h2>

        <div
          ref={scrollRef}
          className="rules-scroll flex overflow-x-auto pb-6 sm:pb-8 gap-4 sm:gap-8 hide-scrollbar scroll-pl-4 sm:scroll-pl-6 snap-x snap-mandatory"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
        >
          {RULES.map((rule, i) => (
            <div
              key={i}
              className="rule-card mc-panel min-w-[260px] sm:min-w-[300px] md:min-w-[400px] p-4 sm:p-6 shrink-0 snap-start hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4 border-b-4 border-gray-400 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl">{rule.emoji}</div>
                <h3 className="font-pixel text-sm sm:text-lg text-gray-800">{rule.title}</h3>
              </div>
              <p className="text-gray-700 text-lg sm:text-2xl font-pixel-body">{rule.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-3 sm:mt-4">
          <span className="text-gray-300 font-pixel text-[10px] sm:text-xs animate-pulse">
            ⟵ Swipe to explore ⟶
          </span>
        </div>
      </div>
    </section>
  );
}
