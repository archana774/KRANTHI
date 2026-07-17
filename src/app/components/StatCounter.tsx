import React, { useEffect, useState } from 'react';
import { useInView, motion } from 'framer-motion';

interface StatCounterProps {
  end: number;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          setCount(end);
          setIsDone(true);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime === 0 ? 10 : stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <motion.span 
      ref={ref}
      animate={{ 
        textShadow: isDone ? '0px 0px 20px rgba(0,255,255,0.8), 0px 0px 40px rgba(224,41,158,0.5)' : '0px 0px 0px rgba(0,0,0,0)'
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {count}{suffix}
    </motion.span>
  );
};

export default StatCounter;
