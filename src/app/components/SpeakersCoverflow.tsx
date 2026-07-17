import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface SpeakersCoverflowProps {
  children?: React.ReactNode;
}

const placeholderSpeakers = [
  { name: "NAME", role: "POSITION", icon: "👨‍💻" },
  { name: "NAME", role: "POSITION", icon: "🤖" },
  { name: "NAME", role: "POSITION", icon: "🎨" },
  { name: "NAME", role: "POSITION", icon: "🛡️" },
  { name: "NAME", role: "POSITION", icon: "🚀" },
];

const SpeakersCoverflow: React.FC<SpeakersCoverflowProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const hasChildren = childrenArray.length > 0;
  const count = hasChildren ? childrenArray.length : placeholderSpeakers.length;
  
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
      className="absolute left-[30px] top-[2920px] w-[1380px] h-[380px] flex items-center justify-center perspective-[2000px] z-30 overflow-visible"
      onWheel={handleWheel}
    >
      {visibleRange.map((offset) => {
        let childIndex = (activeIndex + offset) % count;
        if (childIndex < 0) childIndex += count;
        
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

        if (hasChildren) {
          const child = childrenArray[childIndex];
          const clonedChild = React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                className: "relative w-[237px] h-[196px]"
              })
            : child;

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
              <div 
                className={`relative w-[237px] h-[196px] rounded-[24px] overflow-hidden transition-all duration-500 ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(54,232,224,0.2)]' : 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]'}`}
                style={{
                  border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(9, 9, 20, 0.4)'
                }}
              >
                {clonedChild}
              </div>
            </motion.div>
          );
        }

        const speaker = placeholderSpeakers[childIndex];

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
            {/* KRANTHI Styled Glassmorphism Card */}
            <div 
              className={`relative w-[200px] h-[270px] rounded-[24px] flex flex-col items-center justify-center gap-[0.8rem] transition-all duration-500 overflow-hidden ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(54,232,224,0.2)]' : 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]'}`}
              style={{
                background: isActive 
                  ? 'linear-gradient(160deg, rgba(35,25,65,0.85), rgba(60,30,90,0.85))' 
                  : 'linear-gradient(160deg, rgba(20,15,40,0.6), rgba(40,20,60,0.6))',
                backdropFilter: 'blur(20px) saturate(160%)',
                border: isActive 
                  ? '1px solid rgba(255,255,255,0.25)' 
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isActive 
                  ? 'inset 0 0 25px rgba(54,232,224,0.3), inset 0 0 15px rgba(224,41,158,0.3)' 
                  : 'inset 0 0 10px rgba(255,255,255,0.02)',
              }}
            >
              {/* Avatar */}
              <div className={`w-[90px] h-[90px] rounded-full flex items-center justify-center text-[2.5rem] transition-all duration-500 ${isActive ? 'shadow-[0_0_0_4px_rgba(255,255,255,0.15),0_0_30px_rgba(54,232,224,0.4)]' : 'shadow-[0_0_0_3px_rgba(255,255,255,0.05)]'}`}
                   style={{ background: 'radial-gradient(circle at 35% 30%, rgba(224,41,158,0.9), rgba(54,232,224,0.7))' }}>
                {speaker.icon}
              </div>
              
              {/* Info */}
              <div className="flex flex-col items-center justify-center px-4 text-center z-10">
                <div className={`font-['Orbitron',sans-serif] font-[800] tracking-[0.05em] uppercase transition-all duration-300 ${isActive ? 'text-[1.05rem] text-white' : 'text-[0.85rem] text-gray-300'}`}>
                  {speaker.name}
                </div>
                <div className={`font-['Orbitron',sans-serif] tracking-[0.08em] uppercase mt-1 transition-all duration-300 ${isActive ? 'text-[0.75rem] text-[#36e8e0]' : 'text-[0.65rem] text-[rgba(54,232,224,0.6)]'}`}>
                  {speaker.role}
                </div>
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
