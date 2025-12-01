'use client';

import { motion } from 'framer-motion';

interface CinematicAuroraProps {
  variant?: 'hero' | 'section' | 'contact';
  animated?: boolean;
  className?: string;
}

export function CinematicAurora({ variant = 'section', animated = false, className = '' }: CinematicAuroraProps) {
  const auroraGradient = `
    radial-gradient(
      ellipse 200% 150% at 50% 50%,
      rgba(79, 212, 228, 0.20) 0%,
      rgba(123, 92, 251, 0.15) 25%,
      rgba(168, 85, 247, 0.12) 40%,
      rgba(244, 125, 207, 0.10) 55%,
      rgba(54, 170, 180, 0.06) 70%,
      rgba(79, 212, 228, 0.03) 85%,
      transparent 100%
    )
  `;

  const configs = {
    hero: {
      size: 'w-[220%] h-[1000px]',
      blur: 'blur-[85px]',
      opacity: 'opacity-[0.10]',
      duration: 75,
      movement: 9,
    },
    section: {
      size: 'w-[200%] h-[850px]',
      blur: 'blur-[80px]',
      opacity: 'opacity-[0.09]',
      duration: 70,
      movement: 8,
    },
    contact: {
      size: 'w-[210%] h-[920px]',
      blur: 'blur-[82px]',
      opacity: 'opacity-[0.09]',
      duration: 80,
      movement: 8,
    },
  } as const;

  const config = configs[variant];

  if (!animated) {
    return (
      <div className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${config.size} ${config.blur} ${config.opacity}`}
          style={{
            background: auroraGradient,
            borderRadius: '50%',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${config.size} ${config.blur} opacity-[0.04]`}
        style={{
          background: auroraGradient,
          borderRadius: '50%',
        }}
      />

      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${config.size} ${config.blur} ${config.opacity}`}
        style={{
          background: auroraGradient,
          borderRadius: '50%',
        }}
        animate={{
          x: [0, config.movement, -config.movement, 0],
          y: [0, -config.movement * 0.6, config.movement * 0.6, 0],
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      />
    </div>
  );
}
