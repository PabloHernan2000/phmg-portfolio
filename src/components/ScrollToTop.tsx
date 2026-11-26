import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          title="Volver arriba (Top)"
          className="tactile-btn fixed bottom-24 right-5 z-40 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0d0f15]/90 hover:bg-[#151a24] border border-white/10 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 text-xs font-mono backdrop-blur-md shadow-lg transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px] font-semibold">TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
