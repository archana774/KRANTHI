import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticElement: React.FC<MagneticElementProps> = ({ children, className = '', strength = 0.15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Only apply magnetism if cursor is reasonably close to center (within 100px of bounds)
      if (Math.abs(distanceX) < rect.width / 2 + 100 && Math.abs(distanceY) < rect.height / 2 + 100) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      x.set(0);
      y.set(0);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement;
