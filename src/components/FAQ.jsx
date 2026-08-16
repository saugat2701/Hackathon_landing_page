import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'Is it free to register?',
    a: 'Absolutely! The hackathon is 100% free for all participants. Food, swag, and blocks are on us.',
  },
  {
    q: 'Do I need a team?',
    a: "You can participate solo or in a team of up to 4 members. We'll also have team-building sessions before the event if you're looking for party members!",
  },
  {
    q: 'What should I build?',
    a: 'Anything! Web apps, mobile apps, hardware hacks, or even Minecraft mods. The only limit is your creativity.',
  },
  {
    q: 'Will there be food?',
    a: "Yes! Lots of pizza, energy drinks, and snacks. We'll make sure your hunger bar never depletes.",
  },
  {
    q: 'What if I am a beginner?',
    a: 'All skill levels are welcome! Mentors will be available throughout the 24 hours to help you craft your project.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.faq-card', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-12 sm:py-24 bg-mc-sky relative border-t-8 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="faq-title font-pixel text-xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-16 text-white text-shadow">
          Frequently Asked Questions
        </h2>

        <div className="faq-list space-y-3 sm:space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="faq-card mc-panel">
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-3 sm:p-4 font-pixel text-[10px] sm:text-sm text-gray-900 border-b-4 border-gray-400 focus:outline-none flex justify-between items-center min-h-[48px] cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg sm:text-xl font-bold ml-2">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-3 sm:p-4 text-gray-700 text-lg sm:text-2xl bg-gray-200 font-pixel-body animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
