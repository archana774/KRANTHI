import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { speakers } from '../data/speakers';

interface SpeakersCoverflowProps {
  children?: React.ReactNode;
}

const SpeakersCoverflow: React.FC<SpeakersCoverflowProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = speakers.length;
  
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const isScrollLocked = useRef(false);
  const scrollLockTimeout = useRef<any>(null);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const offsetThreshold = 50;
    const velocityThreshold = 400;

    if (info.offset.x < -offsetThreshold || info.velocity.x < -velocityThreshold) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > offsetThreshold || info.velocity.x > velocityThreshold) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Intercept if there is any noticeable horizontal swipe action (deltaX)
    // or if the user holds shift while scrolling vertically (browser mapping for horizontal scroll)
    const hasHorizontalDelta = Math.abs(e.deltaX) > 4;
    const isShiftVertical = e.shiftKey && Math.abs(e.deltaY) > 4;
    
    if (!hasHorizontalDelta && !isShiftVertical) return; // Allow normal vertical page scroll
    
    // Prevent browser default actions (such as horizontal navigation or page scroll)
    if (e.cancelable) {
      e.preventDefault();
    }
    
    const delta = hasHorizontalDelta ? e.deltaX : e.deltaY;
    const now = Date.now();

    // If locked, we reject any new scroll changes but reset the timeout so we wait for the swipe to fully stop.
    if (isScrollLocked.current) {
      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
      scrollLockTimeout.current = setTimeout(() => {
        isScrollLocked.current = false;
        scrollAccumulator.current = 0; // Clear accumulator too
      }, 150); // 150ms of quiet time unlocks the scroll
      lastScrollTime.current = now;
      return;
    }

    // Reset accumulator if the user stopped swiping for more than 300ms
    if (now - lastScrollTime.current > 300) {
      scrollAccumulator.current = 0;
    }
    lastScrollTime.current = now;
    
    scrollAccumulator.current += delta;
    
    const THRESHOLD = 60; // Total accumulated scroll distance before card change
    
    if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
      if (scrollAccumulator.current > 0) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
      
      // Instantly lock scrolling and reset accumulator until swipe gestures cease
      isScrollLocked.current = true;
      scrollAccumulator.current = 0;
      
      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
      scrollLockTimeout.current = setTimeout(() => {
        isScrollLocked.current = false;
      }, 150);
    }
  };

  const visibleRange = count <= 5 
    ? [-2, -1, 0, 1, 2] 
    : [-3, -2, -1, 0, 1, 2, 3];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute left-[30px] top-[2600px] w-[1380px] h-[380px] flex items-center justify-center perspective-[2000px] z-30 overflow-visible"
      onWheel={handleWheel}
    >
      {[...Array(count === 1 ? 1 : 5)].map((_, i) => {
        const offset = count === 1 ? 0 : i - 2;
        const index = activeIndex + offset;
        const childIndex = ((index % count) + count) % count;
        
        const isActive = offset === 0;

        let rotateY = 0;
        let scale = 1;
        let translateX = 0;
        let translateZ = 0;
        let opacity = 1;
        let filter = 'brightness(1) blur(0px)';
        let zIndex = 50 - Math.abs(offset) * 10;

        // Premium 3D Arc Math
        if (Math.abs(offset) === 0) {
          scale = 1.15;
          rotateY = 0;
          translateX = 0;
          translateZ = 120;
          opacity = 1;
          filter = 'brightness(1.1) drop-shadow(0 0 20px rgba(224,41,158,0.3)) blur(0px)';
        } else if (Math.abs(offset) === 1) {
          scale = 0.9;
          rotateY = offset < 0 ? 35 : -35;
          translateX = offset < 0 ? -260 : 260;
          translateZ = -60;
          opacity = 0.85;
          filter = 'brightness(0.65) blur(1.5px)';
        } else if (Math.abs(offset) === 2) {
          scale = 0.72;
          rotateY = offset < 0 ? 55 : -55;
          translateX = offset < 0 ? -480 : 480;
          translateZ = -220;
          opacity = 0.5;
          filter = 'brightness(0.4) blur(4px)';
        } else if (Math.abs(offset) >= 3) {
          scale = 0.5;
          rotateY = offset < 0 ? 75 : -75;
          translateX = offset < 0 ? -620 : 620;
          translateZ = -450;
          opacity = 0;
          filter = 'brightness(0.2) blur(8px)';
        }

        const speaker = speakers[childIndex];

        return (
          <motion.div
            key={activeIndex + offset}
            className="absolute flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={false}
            whileHover={{ 
              scale: scale * 1.05, 
              y: isActive ? -15 : -8,
              rotateX: isActive ? 5 : 0,
              filter: 'brightness(1.3) blur(0px)', 
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
            animate={{
              rotateY,
              x: translateX,
              z: translateZ,
              scale,
              zIndex,
              opacity,
              filter,
              y: 0,
              rotateX: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 28,
              mass: 0.9,
              velocity: 2
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            onClick={() => setActiveIndex(activeIndex + offset)}
          >
            {/* Expandable Glassmorphism Card */}
            <div 
              className={`relative w-[180px] flex flex-col items-center justify-start rounded-[24px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(54,232,224,0.2)]' : 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]'}`}
              style={{
                height: isActive ? '280px' : '200px',
                border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                background: isActive 
                  ? 'linear-gradient(160deg, rgba(35,25,65,0.85), rgba(60,30,90,0.85))' 
                  : 'rgba(9, 9, 20, 0.4)',
                backdropFilter: 'blur(20px) saturate(160%)',
              }}
            >
              {/* Speaker Image */}
              <div 
                className="w-full shrink-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ height: '200px' }}
              >
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top pointer-events-none"
                />
              </div>

              {/* Expandable Info Panel */}
              <div 
                className={`w-full flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'h-[80px] opacity-100' : 'h-0 opacity-0'}`}
                style={{ background: 'linear-gradient(180deg, rgba(9,9,20,0) 0%, rgba(9,9,20,0.9) 100%)' }}
              >
                <span className="font-['Orbitron',sans-serif] font-bold uppercase text-[12px] text-white tracking-[1.5px] mt-1 px-2 text-center line-clamp-1 w-full leading-tight">
                  {speaker.name}
                </span>
                <span className="font-['Orbitron',sans-serif] tracking-[2px] uppercase text-[7px] text-[#ef8ff6] mt-1 px-4 text-center line-clamp-2 leading-snug">
                  {speaker.position}
                </span>
              </div>

              {/* Dynamic Sweeping Reflection */}
              {isActive && (
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-[rgba(255,255,255,0.15)] via-transparent to-[rgba(54,232,224,0.05)] pointer-events-none mix-blend-overlay" />
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SpeakersCoverflow;
