import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface GalleryCoverflowProps {
  images: string[];
}

const GalleryCoverflow: React.FC<GalleryCoverflowProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;
  
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const isScrollLocked = useRef(false);
  const scrollLockTimeout = useRef<any>(null);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const offsetThreshold = 50;
    const velocityThreshold = 400;

    if (info.offset.x < -offsetThreshold || info.velocity.x < -velocityThreshold) {
      setActiveIndex((prev) => (prev + 1) % count);
    } else if (info.offset.x > offsetThreshold || info.velocity.x > velocityThreshold) {
      setActiveIndex((prev) => (prev - 1 + count) % count);
    }
  };

  const visibleRange = [-2, -1, 0, 1, 2];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute left-0 top-[3784px] w-[1440px] h-[440px] flex items-center justify-center perspective-[2000px] z-30 overflow-visible"
      onWheel={(e) => {
        // Evaluate delta locally in the event handler to bypass lexical scope limits
        const hasHorizontalDelta = Math.abs(e.deltaX) > 4;
        const isShiftVertical = e.shiftKey && Math.abs(e.deltaY) > 4;
        
        if (!hasHorizontalDelta && !isShiftVertical) return;
        
        if (e.cancelable) {
          e.preventDefault();
        }

        const now = Date.now();

        if (isScrollLocked.current) {
          if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
          scrollLockTimeout.current = setTimeout(() => {
            isScrollLocked.current = false;
            scrollAccumulator.current = 0;
          }, 150);
          lastScrollTime.current = now;
          return;
        }

        if (now - lastScrollTime.current > 300) {
          scrollAccumulator.current = 0;
        }
        lastScrollTime.current = now;
        
        const wheelDelta = hasHorizontalDelta ? e.deltaX : e.deltaY;
        scrollAccumulator.current += wheelDelta;
        
        const THRESHOLD = 60;
        
        if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
          if (scrollAccumulator.current > 0) {
            setActiveIndex((prev) => (prev + 1) % count);
          } else {
            setActiveIndex((prev) => (prev - 1 + count) % count);
          }
          
          isScrollLocked.current = true;
          scrollAccumulator.current = 0;
          
          if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
          scrollLockTimeout.current = setTimeout(() => {
            isScrollLocked.current = false;
          }, 150);
        }
      }}
    >
      {visibleRange.map((offset) => {
        let childIndex = (activeIndex + offset) % count;
        if (childIndex < 0) childIndex += count;
        
        const imageSrc = images[childIndex];
        const isActive = offset === 0;

        let rotateY = 0;
        let scale = 1;
        let translateX = 0;
        let translateZ = 0;
        let opacity = 1;
        let filter = 'brightness(1) blur(0px)';
        let zIndex = 50 - Math.abs(offset) * 10;

        // Coverflow mathematical position values matching the layout mockup
        if (offset === 0) {
          scale = 1.0;
          rotateY = 0;
          translateX = 0;
          translateZ = 120;
          opacity = 1;
          filter = 'brightness(1) blur(0px)';
        } else if (offset === -1) {
          scale = 0.85;
          rotateY = 25;
          translateX = -380;
          translateZ = -80;
          opacity = 0.65;
          filter = 'brightness(0.55) blur(2px)';
        } else if (offset === 1) {
          scale = 0.85;
          rotateY = -25;
          translateX = 380;
          translateZ = -80;
          opacity = 0.65;
          filter = 'brightness(0.55) blur(2px)';
        } else if (offset === -2) {
          scale = 0.7;
          rotateY = 35;
          translateX = -620;
          translateZ = -250;
          opacity = 0.3;
          filter = 'brightness(0.3) blur(4px)';
        } else if (offset === 2) {
          scale = 0.7;
          rotateY = -35;
          translateX = 620;
          translateZ = -250;
          opacity = 0.3;
          filter = 'brightness(0.3) blur(4px)';
        }

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
              scale: scale * 1.03,
              filter: 'brightness(1.1) blur(0px)', 
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
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 28,
              mass: 0.9,
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            onClick={() => setActiveIndex(childIndex)}
          >
            {/* Viewfinder-style photo card container */}
            <div 
              className={`relative w-[503px] h-[386px] overflow-hidden transition-all duration-500 rounded-[12px] ${isActive ? 'shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border-4 border-white' : 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] border border-white/20'}`}
            >
              <img 
                loading="lazy"
                src={imageSrc} 
                alt={`Kranthi Gallery Event ${childIndex}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              
              {isActive && (
                <>
                  {/* High-tech viewfinder overlay (inset crop corners) */}
                  <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white pointer-events-none" />
                  <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-white pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-white pointer-events-none" />
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default GalleryCoverflow;
