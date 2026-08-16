import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.about-panel', {
        x: -120,
        opacity: 0,
        rotation: -5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-panel',
          start: 'top 80%',
        },
      });

      gsap.from('.about-block', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.about-blocks',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 sm:py-24 bg-mc-stone block-pattern-stone relative border-y-8 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="about-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          About The Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="about-panel mc-panel p-5 sm:p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h3 className="font-pixel text-sm sm:text-xl text-gray-800 mb-3 sm:mb-4 border-b-4 border-gray-400 pb-2">
              Build, Craft, Innovate
            </h3>
            <p className="text-gray-700 text-lg sm:text-2xl leading-relaxed font-pixel-body">
              Just like in Minecraft, the only limit is your imagination. Gather your resources
              (APIs, frameworks, logic), craft your tools, and build something extraordinary in
              this 24-hour coding marathon.
            </p>
            <p className="text-gray-700 text-lg sm:text-2xl mt-3 sm:mt-4 leading-relaxed font-pixel-body">
              Whether you are a Redstone engineer building complex backend logic, or a builder
              focused on stunning frontend aesthetics, there is a place for you here.
            </p>
          </div>

          <div className="about-blocks grid grid-cols-2 gap-3 sm:gap-4">
            <div className="about-block mc-block dirt animate-float" style={{ animationDelay: '0s' }} />
            <div className="about-block mc-block grass animate-float" style={{ animationDelay: '1s' }} />
            <div className="about-block mc-block stone animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="about-block mc-block wood animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
