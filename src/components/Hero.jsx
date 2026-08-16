import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const cloudsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered hero entrance
      gsap.from('.hero-title', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-panel', {
        y: 60,
        opacity: 0,
        rotation: -3,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.from('.hero-prize', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'back.out(1.7)',
      });
      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.9,
        ease: 'power3.out',
      });

      // Parallax clouds on mouse move
      const handleMouseMove = (e) => {
        if (!cloudsRef.current) return;
        const clouds = cloudsRef.current.querySelectorAll('.cloud');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        clouds.forEach((cloud, i) => {
          const speed = (i + 1) * 15;
          const xOffset = (0.5 - x) * speed;
          const yOffset = (0.5 - y) * speed * 0.5;
          gsap.to(cloud, {
            x: xOffset,
            y: yOffset,
            duration: 1.2,
            ease: 'power2.out',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center pt-16 sm:pt-20 pb-24 sm:pb-32 z-10 px-4"
    >
      {/* Floating Clouds */}
      <div ref={cloudsRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="cloud w-32 h-16 bg-white opacity-80 absolute top-10 left-[-100px] animate-drift" style={{ animationDuration: '25s' }} />
        <div className="cloud w-48 h-20 bg-white opacity-80 absolute top-40 left-[-200px] animate-drift" style={{ animationDuration: '35s', animationDelay: '5s' }} />
        <div className="cloud w-24 h-12 bg-white opacity-80 absolute top-24 left-[-150px] animate-drift" style={{ animationDuration: '20s', animationDelay: '12s' }} />
        <div className="cloud w-36 h-14 bg-white opacity-70 absolute top-56 left-[-180px] animate-drift" style={{ animationDuration: '30s', animationDelay: '8s' }} />
        <div className="cloud w-20 h-10 bg-white opacity-60 absolute top-72 left-[-120px] animate-drift" style={{ animationDuration: '22s', animationDelay: '15s' }} />
      </div>

      {/* Voxel Terrain */}
      <div className="absolute bottom-0 w-full h-32 sm:h-48 bg-mc-dirt border-t-8 border-mc-grass block-pattern z-[-1]" />

      <div className="text-center max-w-4xl mx-auto floating-block">
        <h1 className="hero-title mc-logo text-center mb-4 sm:mb-6 leading-tight tracking-widest relative inline-block">
          <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl">HACKCRAFT</span>
          <span className="block font-pixel-body font-bold text-2xl sm:text-3xl md:text-4xl mt-2 text-white text-shadow-md">2026</span>
        </h1>

        <div className="hero-panel mc-panel p-4 sm:p-6 inline-block mb-6 sm:mb-8 rotate-1">
          <p className="font-pixel-body text-xl sm:text-2xl md:text-3xl text-gray-800 font-bold">
            Theme: <span className="text-mc-wood">Minecraft</span>
          </p>
          <p className="font-pixel-body text-lg sm:text-xl md:text-2xl text-gray-700 mt-1 sm:mt-2">
            October 12–13, 2026 | 24 Hours
          </p>
        </div>

        <div className="hero-prize text-lg sm:text-2xl md:text-3xl font-pixel text-yellow-300 text-shadow-md mb-6 sm:mb-10 animate-pulse">
          🏆 ₹1,00,000+ in rewards
        </div>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href="#register"
            className="mc-btn-play font-pixel text-base sm:text-xl px-8 sm:px-10 py-4 sm:py-5 bg-mc-grass text-white inline-block"
          >
            ▶ PLAY NOW
          </a>
          <a
            href="#about"
            className="mc-btn font-pixel text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4 bg-mc-stone text-white inline-block"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-white rotate-45" />
      </div>
    </section>
  );
}
