import React, { useEffect, useState } from 'react';

// Randomly scattered glowing glass orbs to create parallax depth
const particles = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  left: Math.random() * 100,
  top: Math.random() * 100,
  speedX: (Math.random() - 0.5) * 0.05,
  speedY: (Math.random() - 0.5) * 0.05,
  delay: Math.random() * 2,
}));

const HeroParticles: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(8px) saturate(150%)',
            boxShadow: 'inset 0 0 10px rgba(0,255,255,0.2), 0 0 20px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            transform: `translate(${mousePos.x * (p.size / 30)}px, ${mousePos.y * (p.size / 30)}px)`,
            transition: 'transform 0.1s linear',
            animation: `float ${10 + p.id * 2}s infinite alternate ease-in-out`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default HeroParticles;
