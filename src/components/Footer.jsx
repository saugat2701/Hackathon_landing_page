import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="register"
      className="py-16 sm:py-32 bg-black border-t-8 border-gray-600 text-center relative overflow-hidden"
    >
      {/* Pixel Stars */}
      <div className="absolute inset-0 z-0 opacity-50 block-pattern-stars" />

      <div className="footer-content container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-8 text-shadow-lg">
          Ready to Craft?
        </h2>
        <p className="font-pixel-body text-xl sm:text-3xl text-gray-300 mb-6 sm:mb-12">
          Grab your pickaxe and let&apos;s go.
        </p>

        <a
          href="#hero"
          className="mc-btn-play font-pixel text-base sm:text-2xl md:text-3xl px-8 sm:px-12 py-4 sm:py-6 bg-mc-grass text-white inline-block hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(91,156,48,0.6)]"
        >
          [ REGISTER NOW ]
        </a>

        <p className="font-pixel-body text-base sm:text-xl text-gray-500 mt-8 sm:mt-16">
          © 2026 Hackcraft. Not officially affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  );
}
