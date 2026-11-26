import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-white/[0.04] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-400 origin-left shadow-[0_0_12px_rgba(16,185,129,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
};
