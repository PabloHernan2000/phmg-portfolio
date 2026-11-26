import React from 'react';
import { motion } from 'motion/react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  yOffset = 24,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
