import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  const variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)',
      scale: 0.95,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0, 
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0 
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      scale: 1,
      y: 0, 
      x: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay } 
    }
  };
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
