'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-70"
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0.7, 0.4, 0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-fuchsia-400 opacity-70"
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0.7, 0.5, 0.7, 0.4, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </div>
  );
}
