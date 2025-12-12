'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../providers/theme-provider';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  logo?: string;
  index?: number;
  href?: string;
}

export function CosmicProjectCard({ title, description, tags, image, logo, index = 0, href }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#E8F0FF' : '#0b1221';
  const mutedText = isDark ? '#C4D0DC' : '#475569';
  const cardBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.98)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15,23,42,0.1)';
  const linkProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noreferrer' : undefined,
      }
    : undefined;

  const CardContent = (
    <motion.div
      className="group relative flex w-full flex-col overflow-hidden rounded-[28px] border shadow-[0_10px_26px_rgba(15,23,42,0.30),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 hover:shadow-[0_16px_40px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
      style={{ borderWidth: '0.5px', borderColor: cardBorder, background: cardBg, height: '560px', minHeight: '540px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        y: -8,
        scale: 1.015,
        transition: { duration: 0.24, ease: 'easeOut' },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-cyan-500/[0.05] via-purple-500/[0.04] to-pink-500/[0.03] blur-[260px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />

      <div className="absolute top-0 left-0 right-0 h-[28%] pointer-events-none rounded-t-[28px] bg-gradient-to-b from-white/[0.04] to-transparent" />
      <div className="absolute top-0 left-7 right-7 h-[0.5px] bg-gradient-to-r from-transparent via-cyan-400/[0.25] to-transparent opacity-60" />

      <motion.div
        className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-slate-950/25 via-slate-900/20 to-slate-950/30 shadow-[0_18px_32px_rgba(0,0,0,0.35)] h-[240px] md:h-[260px]"
        style={{ willChange: 'transform' }}
      >
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)' }}
          >
            <motion.div
              className="rounded-[14px] border border-violet-400/25 bg-violet-500/[0.1] px-5 py-2.5 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              style={{ borderWidth: '0.5px' }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" style={{ color: textColor }}>
                {logo}
              </span>
            </motion.div>
          </div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] to-purple-500/[0.05]"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: isHovered ? 0.6 : 0.3 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <div className="flex flex-grow flex-col px-7 pb-9 pt-8 md:px-8 md:pb-10">
        <h3 className="mb-4 font-space-grotesk text-2xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-[28px]" style={{ filter: 'contrast(1.05)' }}>
          {title}
        </h3>

        <p
          className="mb-7 flex-grow font-geist-mono text-base leading-relaxed md:text-lg line-clamp-3"
          style={{ color: mutedText }}
        >
          {description}
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {tags.map((tag, tagIdx) => (
            <motion.span
              key={tagIdx}
              className="rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em]"
              style={{
                borderWidth: '1px',
                borderColor: cardBorder,
                background: isDark ? 'linear-gradient(120deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' : 'rgba(14,165,233,0.12)',
                color: isDark ? 'rgba(255,255,255,0.8)' : '#0f172a',
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.span
          className="group/btn inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_0_18px_rgba(34,211,238,0.25)] backdrop-blur-sm"
          style={{
            borderColor: isDark ? 'rgba(34,211,238,0.5)' : 'rgba(14,165,233,0.25)',
            background: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(14,165,233,0.14)',
            color: isDark ? 'rgba(125,211,252,0.9)' : '#0f172a',
          }}
          animate={{ gap: isHovered ? '14px' : '10px' }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <motion.span
            className="drop-shadow-[0_0_10px_rgba(34,211,238,0.45)]"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.22 }}
          >
            Ver caso
          </motion.span>
          <motion.div
            animate={{
              x: isHovered ? 6 : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              x: { duration: 0.24 },
              rotate: { duration: 0.6, repeat: isHovered ? Infinity : 0 },
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </motion.span>
      </div>

      <motion.div
        className="absolute top-3 right-3 w-0.5 h-0.5 bg-cyan-400/50 rounded-full shadow-[0_0_4px_rgba(34,211,238,0.4)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );

  if (linkProps) {
    return (
      <a
        {...linkProps}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400/50 rounded-[24px] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0d12]"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
