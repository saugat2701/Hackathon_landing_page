import { useEffect, useState, useRef } from 'react';

const PARTICLE_COLORS = [
  '#5b9c30', // Grass green
  '#7c5334', // Dirt brown
  '#7d7d7d', // Stone gray
  '#2ee8cc', // Diamond cyan
  '#ff3b3b', // Redstone red
  '#fcb040', // Gold yellow
  '#9dff00', // XP orb neon green
];

const POPUP_TEXTS = ['+20 XP', 'CRIT! ⚔️', '⛏️ +1 Block', '✨ Level Up', '💎 Rare Drop!'];

export default function ClickEffects({ soundEnabled }) {
  const [particles, setParticles] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const playClickSound = () => {
      if (!soundEnabled) return;
      try {
        const audio = new Audio('https://www.myinstants.com/media/sounds/minecraft_click.mp3');
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch (e) {
        // silent fail
      }
    };

    const handleClick = (e) => {
      // Don't spawn if clicking input/interactive modals specifically wanting plain clicks
      playClickSound();

      const { clientX: x, clientY: y } = e;
      const count = Math.floor(Math.random() * 6) + 8; // 8 to 14 particles
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 6 + 3;
        const size = Math.random() * 8 + 6;
        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

        newParticles.push({
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 3, // Initial upward pop
          size,
          color,
          alpha: 1,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 15,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // 30% chance to show floating retro RPG text
      if (Math.random() > 0.65) {
        const text = POPUP_TEXTS[Math.floor(Math.random() * POPUP_TEXTS.length)];
        const textId = particleIdRef.current++;
        setFloatingTexts((prev) => [
          ...prev,
          {
            id: textId,
            x: x + (Math.random() - 0.5) * 20,
            y: y - 20,
            text,
          },
        ]);

        setTimeout(() => {
          setFloatingTexts((prev) => prev.filter((t) => t.id !== textId));
        }, 1000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [soundEnabled]);

  // Particle Physics Animation Loop
  useEffect(() => {
    if (particles.length === 0) return;

    const gravity = 0.35;
    let animId;

    const updatePhysics = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + gravity,
            alpha: p.alpha - 0.028,
            rotation: p.rotation + p.vRot,
          }))
          .filter((p) => p.alpha > 0)
      );

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [particles.length > 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* Voxel Break Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            border: '1.5px solid rgba(0,0,0,0.6)',
            boxShadow: `0 0 8px ${p.color}`,
            opacity: p.alpha,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            imageRendering: 'pixelated',
          }}
        />
      ))}

      {/* Floating Damage / XP Texts */}
      {floatingTexts.map((t) => (
        <div
          key={t.id}
          className="font-pixel text-xs sm:text-sm text-yellow-300 text-shadow-md select-none animate-floatUp"
          style={{
            position: 'absolute',
            left: `${t.x}px`,
            top: `${t.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
