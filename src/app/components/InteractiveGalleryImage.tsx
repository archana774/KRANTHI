import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveGalleryImageProps {
  src: string;
  className?: string;
  imgClassName?: string;
}

const InteractiveGalleryImage: React.FC<InteractiveGalleryImageProps> = ({ src, className = '', imgClassName = '' }) => {
  return (
    <motion.div 
      className={`${className} cursor-pointer`}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 50,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img 
        alt="" 
        className={imgClassName} 
        src={src} 
        initial={{ opacity: 0.5, filter: 'grayscale(20%)' }}
        whileHover={{ opacity: 1, filter: 'grayscale(0%)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(224,41,158,0.3)' }}
      />
    </motion.div>
  );
};

export default InteractiveGalleryImage;
