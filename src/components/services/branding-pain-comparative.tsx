'use client';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMotionPreferences } from '@/lib/motion-preferences';
import type { ReactNode } from 'react';

type PainPoint = { title: string; description: string };

const NEGATIVE_ACCENT = '#f97373';
const POSITIVE_ACCENT = '#4ade80';

const positivePoints: PainPoint[] = [
  {
    title: 'Te recuerdan al instante',
    description: 'Tu marca se vuelve clara, única y fácil de reconocer.',
  },
  {
    title: 'Tu mensaje se entiende en 3 segundos',
    description: 'La gente ve lo que hacés, cómo ayudás y por qué elegirte.',
  },
  {
    title: 'Multiplicás resultados',
    description: 'Todo tu marketing rinde más: contenido, publicidad, ventas y posicionamiento.',
  },
  {
    title: 'Transmitís confianza real',
    description: 'Tu marca se siente sólida, profesional y alineada a lo que querés lograr.',
  },
];

const defaultNegativePoints: PainPoint[] = [
  {
    title: 'No te recuerdan',
    description: 'Tu marca se pierde entre muchas y no lográs quedar en la mente de nadie.',
  },
  {
    title: 'Tu mensaje confunde',
    description: 'Las personas no entienden qué ofrecés ni por qué deberían elegirte.',
  },
  {
    title: 'Tus esfuerzos rinden menos',
    description: 'Invertís tiempo y dinero en contenido, marketing o publicidad sin retorno claro.',
  },
  {
    title: 'Transmitís poca profesionalidad',
    description: 'Generás menos confianza desde el primer vistazo.',
  },
];

function parsePainPoints(raw?: string[]): PainPoint[] {
  if (!raw?.length) return defaultNegativePoints;

  return raw.slice(0, 4).map((point) => {
    const [title, ...rest] = point
      .split('—')
      .map((part) => part.trim())
      .filter(Boolean);

    return {
      title: title || 'Sin título',
      description: rest.join(' — ') || defaultNegativePoints.find((item) => item.title === title)?.description || '',
    };
  });
}

type BrandingPainComparativeProps = {
  title: string;
  intro?: string;
  conclusion?: string;
  className?: string;
  painPoints?: string[];
};

export function BrandingPainComparative({
  title,
  intro,
  conclusion,
  className,
  painPoints,
}: BrandingPainComparativeProps) {
  const { shouldReduceMotion } = useMotionPreferences();
  const allowMotion = !shouldReduceMotion;
  const negativePoints = parsePainPoints(painPoints);

  const cardVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  };

  const columnTransition = (delay: number) => ({
    staggerChildren: allowMotion ? 0.1 : 0,
    delayChildren: allowMotion ? delay : 0,
  });

  const renderCard = (item: PainPoint, accentColor: string, icon: ReactNode, key: string | number) => {
    const accentHover = `${accentColor}cc`;
    const accentGlow = `${accentColor}33`;

    return (
      <motion.div
        key={key}
        variants={cardVariants}
        whileHover={
          allowMotion
            ? { scale: 1.02, borderColor: accentHover, boxShadow: `0 18px 48px ${accentGlow}` }
            : { borderColor: accentHover }
        }
        transition={{ duration: 0.2 }}
        className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.1)] backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.04] dark:shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
      >
        <div className="absolute inset-x-5 top-0 h-[3px] rounded-full opacity-70 transition group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        <div
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-lg ring-1 ring-slate-200 shadow-[0_10px_26px_rgba(15,23,42,0.12)] dark:bg-white/5 dark:ring-0 dark:shadow-[0_10px_26px_rgba(0,0,0,0.2)]"
          style={{ color: accentColor, boxShadow: `0 10px 26px ${accentGlow}` }}
        >
          {icon}
        </div>
        <div className="relative space-y-1">
          <p className="text-[15px] font-semibold leading-tight text-slate-900 dark:text-white">{item.title}</p>
          {item.description ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#B5C1CE]">{item.description}</p>
          ) : null}
        </div>
      </motion.div>
    );
  };

  return (
    <section className={className}>
      <div className="relative mx-auto max-w-7xl space-y-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-10 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e0f7ff] via-[#f4f1ff] to-[#fff7ed] dark:from-[#1b0f1f] dark:via-[#0f1428] dark:to-[#0d0a1a]" aria-hidden />
        <div className="absolute -left-14 top-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl dark:bg-[#f97373]/12" aria-hidden />
        <div className="absolute -right-10 bottom-4 h-56 w-56 rounded-full bg-emerald-200/45 blur-3xl dark:bg-[#4ade80]/14" aria-hidden />
        <div className="relative space-y-3">
          {intro ? <p className="text-sm text-slate-700 dark:text-white/80">{intro}</p> : null}
          <h2 className="text-[24px] font-space-grotesk leading-tight text-slate-900 md:text-[27px] dark:text-white">{title}</h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2">
          <motion.div
            initial="initial"
            animate="animate"
            transition={columnTransition(0)}
            className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-black/30 dark:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="mb-2 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97373]/15 text-lg ring-1 ring-rose-200/60 shadow-[0_10px_26px_rgba(248,113,113,0.18)] dark:ring-0 dark:shadow-none"
                style={{ color: NEGATIVE_ACCENT }}
                aria-hidden
              >
                <X className="h-4 w-4" />
              </span>
              <p className="text-[20px] font-semibold leading-tight text-slate-900 dark:text-white">Sin Branding Profesional</p>
            </div>
            <div className="space-y-4">
              {negativePoints.map((item, idx) => renderCard(item, NEGATIVE_ACCENT, <X className="h-4 w-4" />, `neg-${idx}`))}
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            transition={columnTransition(0.4)}
            className="space-y-4 rounded-[22px] border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-black/25 dark:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="mb-2 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4ade80]/15 text-lg ring-1 ring-emerald-200/60 shadow-[0_10px_26px_rgba(74,222,128,0.18)] dark:ring-0 dark:shadow-none"
                style={{ color: POSITIVE_ACCENT }}
                aria-hidden
              >
                <Check className="h-4 w-4" />
              </span>
              <p className="text-[20px] font-semibold leading-tight text-slate-900 dark:text-white">Con Branding Profesional</p>
            </div>
            <div className="space-y-4">
              {positivePoints.map((item, idx) => renderCard(item, POSITIVE_ACCENT, <Check className="h-4 w-4" />, `pos-${idx}`))}
            </div>
          </motion.div>
        </div>

        <div className="relative mt-12 text-center">
          <p className="text-base leading-relaxed text-slate-800 dark:text-white/85">
            {conclusion || 'Una identidad débil te frena. Una identidad clara y estratégica acelera tu crecimiento.'}
          </p>
        </div>
      </div>
    </section>
  );
}
