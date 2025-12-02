'use client';

import { motion } from 'framer-motion';
import { Clock3, Wallet } from 'lucide-react';
import { ReactNode, useState } from 'react';

type ServiceColor = 'amber' | 'blue' | 'cyan' | 'pink' | 'teal';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag: string;
  ideal: string;
  estimatedTime?: string;
  startingPrice?: string;
  color: ServiceColor;
  glowColor: string;
  index: number;
}

const colorClasses: Record<ServiceColor, { text: string; bg: string; border: string; gradient: string }> = {
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400/[0.05]',
    border: 'border-amber-400/[0.12]',
    gradient: 'from-transparent via-amber-400/50 to-transparent',
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-500/[0.05]',
    border: 'border-blue-500/[0.12]',
    gradient: 'from-transparent via-blue-500/50 to-transparent',
  },
  cyan: {
    text: 'text-cyan-500',
    bg: 'bg-cyan-500/[0.05]',
    border: 'border-cyan-500/[0.12]',
    gradient: 'from-transparent via-cyan-500/50 to-transparent',
  },
  pink: {
    text: 'text-pink-500',
    bg: 'bg-pink-500/[0.05]',
    border: 'border-pink-500/[0.12]',
    gradient: 'from-transparent via-pink-500/50 to-transparent',
  },
  teal: {
    text: 'text-teal-500',
    bg: 'bg-teal-500/[0.05]',
    border: 'border-teal-500/[0.12]',
    gradient: 'from-transparent via-teal-500/50 to-transparent',
  },
};

export function ServiceCard({ icon, title, description, tag, ideal, estimatedTime, startingPrice, color, glowColor, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const classes = colorClasses[color];

  return (
    <motion.div
      className="group relative h-full flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-4 rounded-[36px] blur-[300px]"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        className="relative w-full flex flex-col bg-white/[0.02] backdrop-blur-[15px] border border-white/[0.08] rounded-[32px] p-8 min-h-[340px] transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
        whileHover={{
          y: -5,
          scale: 1.01,
          transition: { duration: 0.24, ease: 'easeOut' },
        }}
      >
        <div className={`absolute top-0 left-6 right-6 h-[0.5px] opacity-30 bg-gradient-to-r ${classes.gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent rounded-[32px] pointer-events-none" />

        <motion.div
          className={`mb-6 ${classes.text} drop-shadow-[0_0_12px_currentColor] opacity-90`}
          animate={
            isHovered
              ? {
                  rotate: [0, -2, 2, -2, 2, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 1.8,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>

        <h3 className="text-white text-xl mb-4 leading-tight font-space-grotesk">{title}</h3>
        <p className="text-[#B5C1CE] text-[13px] leading-relaxed mb-4 tracking-tight flex-1 font-geist-mono">{description}</p>

        {(estimatedTime || startingPrice) && (
          <div className="mb-5 flex flex-col gap-1 text-xs text-[#A6B4C2] font-geist-mono">
            {estimatedTime && (
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 opacity-70" />
                <span>{estimatedTime}</span>
              </div>
            )}
            {startingPrice && (
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 opacity-70" />
                <span>{startingPrice}</span>
              </div>
            )}
          </div>
        )}

        <div className={`inline-flex items-center px-3 py-2 rounded-lg mb-3 ${classes.bg} border ${classes.border}`}>
          <span className={`text-[10px] tracking-[0.9px] uppercase ${classes.text}`}>{tag}</span>
        </div>

        <p className="text-[#8A99A8] text-xs leading-relaxed font-geist-mono">{ideal}</p>
      </motion.div>
    </motion.div>
  );
}
