import React from 'react';
import { motion } from 'framer-motion';

const AmbientHeroMotion: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[-1]">
      {/* Central Breathing Glow behind KRANTHI text */}
      <motion.div
        className="absolute left-[300px] top-[400px] w-[800px] h-[300px] rounded-full mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(224,41,158,0.15) 0%, rgba(224,41,158,0) 70%)" }}
        animate={{ 
          opacity: [0.5, 0.8, 0.5], 
          scale: [0.95, 1.05, 0.95] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Subtle Atmospheric Drift (Cyan) */}
      <motion.div
        className="absolute left-[700px] top-[300px] w-[500px] h-[400px] rounded-full mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0) 70%)" }}
        animate={{ 
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Subtle Atmospheric Drift (Purple) */}
      <motion.div
        className="absolute left-[100px] top-[500px] w-[600px] h-[500px] rounded-full mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.08) 0%, rgba(147,51,234,0) 70%)" }}
        animate={{ 
          x: [30, -30, 30],
          y: [20, -20, 20],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />

      {/* Glass Shimmer passing across the hero section area */}
      <motion.div
        className="absolute left-[-20%] top-[400px] w-[100px] h-[300px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent skew-x-[-20deg]"
        animate={{ 
          x: ['0vw', '150vw'],
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 6, // Occasional shimmer every 6 seconds
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

export default AmbientHeroMotion;
