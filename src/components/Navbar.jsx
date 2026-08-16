import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const next = !prev;
      document.body.classList.toggle('nav-open', next);
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.classList.remove('nav-open');
  }, []);

  // Active section tracking + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b-4 border-mc-stone'
            : 'bg-black/50 backdrop-blur-sm border-b-4 border-mc-stone/50'
        }`}
      >
        <a href="#hero" className="font-pixel text-mc-grass text-xs sm:text-sm md:text-base text-shadow hover:text-mc-grass-light transition-colors">
          Hackcraft
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 font-pixel text-xs">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors text-shadow hover:text-mc-grass ${
                activeSection === link.href.slice(1) ? 'text-mc-grass' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="mc-btn font-pixel text-[10px] sm:text-xs px-3 sm:px-4 py-2 bg-mc-grass text-white hidden sm:inline-block"
          >
            Register
          </a>

          {/* Hamburger */}
          <button
            onClick={toggleMobile}
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none ${
              mobileOpen ? 'hamburger-open' : ''
            }`}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0 mobile-nav-open' : 'translate-x-full'
        }`}
      >
        <button
          onClick={closeMobile}
          className="absolute top-4 right-4 font-pixel text-white text-2xl w-12 h-12 flex items-center justify-center mc-btn bg-red-700 hover:bg-red-600"
          aria-label="Close menu"
        >
          ✕
        </button>

        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMobile}
            className="mobile-nav-link font-pixel text-xl text-white hover:text-mc-grass transition-colors text-shadow"
          >
            {link.label}
          </a>
        ))}

        <a
          href="#register"
          onClick={closeMobile}
          className="mc-btn-play font-pixel text-lg px-8 py-4 bg-mc-grass text-white mt-4"
        >
          Register
        </a>
      </div>
    </>
  );
}
