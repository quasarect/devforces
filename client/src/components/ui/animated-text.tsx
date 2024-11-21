'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export const AnimatedText = ({
  text,
  onComplete,
  className,
}: {
  text: string;
  onComplete?: () => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      onAnimationComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0,
            delay: index * 0.05,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className='inline-block'
          style={{ originX: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};
