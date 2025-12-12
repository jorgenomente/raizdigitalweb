'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Wallet } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useTheme } from '../providers/theme-provider';

type ServiceColor = 'amber' | 'blue' | 'cyan' | 'pink' | 'teal';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  eyebrow?: string;
  headline?: string;
  description: string;
  tag: string;
  ideal: string;
  estimatedTime?: string;
  startingPrice?: string;
  color: ServiceColor;
  glowColor: string;
  index: number;
  ctaLabel?: string;
  featuresLabel?: string;
  features?: { title: string; description?: string }[];
  reasonLabel?: string;
  href?: string;
  imageSrc: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
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

export function ServiceCard({
  icon,
  title,
  eyebrow,
  description,
  headline,
  tag,
  ideal,
  estimatedTime,
  startingPrice,
  color,
  glowColor,
  index,
  ctaLabel,
  featuresLabel,
  reasonLabel,
  href,
  imageSrc,
  imageAlt,
  imageSide = "right",
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const classes = colorClasses[color];
  const actionText = ctaLabel ?? 'Ver más';
  const isImageLeft = imageSide === "left";
  const wrapperClasses =
    "group relative block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400/50 rounded-[40px] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0d12]";
  const mutedText = isDark ? '#C6D2E2' : '#475569';
  const subtleText = isDark ? '#A6B4C2' : '#64748b';
  const cardBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.98)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';
  const overlayBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.92)';
  const ctaSurface = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(14,165,233,0.14)';
  const ctaBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.12)';
  const badgeLabel = eyebrow ?? title;
  const content = (
    <motion.div
      className="relative w-full flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-10 rounded-[40px] blur-[320px]"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        className="relative w-full overflow-hidden backdrop-blur-[18px] rounded-[40px] p-8 md:p-12 min-h-[520px] md:min-h-[620px] lg:min-h-[70vh] transition-all duration-500 shadow-[0_28px_90px_-25px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] border"
        style={{ background: cardBg, borderColor: cardBorder }}
        whileHover={{
          y: -6,
          scale: 1.005,
          transition: { duration: 0.22, ease: 'easeOut' },
        }}
      >
        <div className={`absolute top-0 left-8 right-8 h-px opacity-30 bg-gradient-to-r ${classes.gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.018] to-transparent rounded-[40px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              `radial-gradient(circle at 18% 25%, rgba(255,255,255,${isDark ? '0.06' : '0.14'}), transparent 35%), radial-gradient(circle at 80% 35%, rgba(255,255,255,${isDark ? '0.04' : '0.1'}), transparent 30%)`,
          }}
          aria-hidden
        />

        <div className="relative grid h-full grid-cols-1 gap-10 lg:grid-cols-5">
          <div className={`flex flex-col gap-4 lg:col-span-3 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
            <motion.div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-geist-mono ${classes.bg} ${classes.border} ${classes.text}`}
              animate={
                isHovered
                  ? {
                      x: [0, 2, 0],
                    }
                  : undefined
              }
              transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
            >
              {icon}
              <span>{badgeLabel}</span>
            </motion.div>

            <h3 className="font-space-grotesk text-3xl leading-snug text-slate-900 dark:text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-4xl">
              {headline ?? title}
            </h3>
            <p className="text-[15px] leading-relaxed md:text-base" style={{ color: mutedText }}>
              {description}
            </p>

            {(estimatedTime || startingPrice) && (
              <div className="flex flex-col gap-2 text-sm" style={{ color: subtleText }}>
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

              <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-geist-mono ${classes.bg} ${classes.border}`}>
              <span className={classes.text}>{tag}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: subtleText }}>
              {ideal}
            </p>

              <div className="mt-auto">
                <div
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-space-grotesk transition"
                  style={{
                    background: ctaSurface,
                    border: `1px solid ${ctaBorder}`,
                    color: isDark ? '#fff' : '#0b1221',
                    boxShadow: isDark ? '0 16px 30px rgba(0,0,0,0.3)' : '0 16px 30px rgba(15,23,42,0.12)',
                  }}
                >
                  <span>{actionText}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

          <div className={`flex flex-col gap-8 lg:col-span-2 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
            <div
              className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border"
              style={{ borderColor: cardBorder, background: overlayBg }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? reasonLabel ?? featuresLabel ?? 'Servicio - ejemplo'}
                width={780}
                height={960}
                className="h-[320px] w-full object-cover object-center md:h-[420px] lg:h-[500px]"
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClasses}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClasses}>{content}</div>;
}
