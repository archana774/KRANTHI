import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import '../../styles/glass.css';

interface GlassCapsuleProps {
  text: string;
  width?: number | string;
  height?: number | string;
  left?: number | string;
  top?: number | string;
  className?: string;
  textClassName?: string;
}

const GlassCapsule: React.FC<GlassCapsuleProps> = ({
  text,
  width = 775,
  height = 85,
  left,
  top,
  className = '',
  textClassName = '',
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const glareX = useTransform(x, [-100, 100], [100, -100]);
  const glareY = useTransform(y, [-100, 100], [100, -100]);

  // Magnetic Spring Configuration
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(useTransform(x, (latestX) => latestX * 0.1), springConfig);
  const magneticY = useSpring(useTransform(y, (latestY) => latestY * 0.1), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`glass-capsule-wrapper ${className} cursor-pointer`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        left: typeof left === 'number' ? `${left}px` : left,
        top: typeof top === 'number' ? `${top}px` : top,
        rotateX,
        rotateY,
        x: magneticX,
        y: magneticY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, opacity: { duration: 0.8 } }}
    >
      <div className="glass-capsule-lens relative overflow-hidden">
        <motion.div 
          className="absolute rounded-full w-[150%] h-[150%] bg-[rgba(255,255,255,0.1)] pointer-events-none mix-blend-overlay"
          style={{ 
            x: glareX, 
            y: glareY, 
            filter: 'blur(30px)',
            left: '-25%',
            top: '-25%'
          }} 
        />
      </div>
      <p 
        className={`glass-text-layer font-['Carbon',sans-serif] not-italic text-[#f5f7fa] text-[39px] text-center leading-[normal] whitespace-nowrap m-0 p-0 ${textClassName}`}
        style={{ transform: 'translateZ(20px)' }}
      >
        {text}
      </p>
    </motion.div>
  );
};

export default GlassCapsule;
