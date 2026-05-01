import React from 'react';
import { motion } from 'framer-motion';

const GlassBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Primary Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.05)_0%,_transparent_50%)]" />
      
      {/* Animated Floating Circles */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full" 
      />
      
      <motion.div 
        animate={{ 
          x: [0, -150, 0], 
          y: [0, 80, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-400/5 blur-[150px] rounded-full" 
      />

      <motion.div 
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-sky-400/5 blur-[100px] rounded-full" 
      />

      {/* Grid Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default GlassBackground;
