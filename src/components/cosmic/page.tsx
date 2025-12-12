'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BarChart3, Globe, Grid, Linkedin, Palette, ChevronDown } from 'lucide-react';
import { ContactMessageCard } from '@/components/contact-message-card';
import { getServiceSlug, type Dictionary, type Locale, type ProjectId, type ServiceId, type TeamMemberId } from '@/lib/i18n/dictionaries';
import { AboutCosmicStudioSection } from './about-section';
import { CinematicAurora } from './cinematic-aurora';
import { ProcessSection } from './process-section';
import { ServiceCard } from './service-card';
import { CosmicProjectCard } from './project-card';
import { CosmicHeader } from './header-navigation';
import { useDictionary } from '../providers/translation-provider';
import { useTheme } from '../providers/theme-provider';
import { getGpuDebugFlags } from '@/lib/gpu-debug';

const serviceVisuals: Record<ServiceId, { color: 'amber' | 'blue' | 'cyan' | 'pink' | 'teal'; glow: string; icon: ReactNode }> = {
  'branding-identidad-visual': {
    color: 'teal',
    glow: 'rgba(20, 184, 166, 0.06)',
    icon: <Palette className="w-8 h-8" />,
  },
  landing: {
    color: 'amber',
    glow: 'rgba(245,158,11,0.05)',
    icon: <Globe className="w-8 h-8" />,
  },
  'ecommerce-profesional': {
    color: 'pink',
    glow: 'rgba(236,72,153,0.06)',
    icon: <Grid className="w-8 h-8" />,
  },
  'marketing-digital': {
    color: 'amber',
    glow: 'rgba(245,158,11,0.06)',
    icon: <BarChart3 className="w-8 h-8" />,
  },
  strategy: {
    color: 'blue',
    glow: 'rgba(59,130,246,0.05)',
    icon: <BarChart3 className="w-8 h-8" />,
  },
};

const serviceNavLabelMap: Record<ServiceId, { es: string; en: string }> = {
  'marketing-digital': { es: 'Marketing Digital', en: 'Digital Marketing' },
  'branding-identidad-visual': { es: 'Branding Profesional', en: 'Professional Branding' },
  landing: { es: 'Páginas Web', en: 'Web Pages' },
  'ecommerce-profesional': { es: 'Tiendas Online Premium', en: 'Premium Online Stores' },
  strategy: { es: 'Software a medida', en: 'Custom Software' },
};

const projectMedia: Record<ProjectId, { image?: string; logo?: string; href?: string }> = {
  gestock: { image: '/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png', href: 'https://nodux1.vercel.app/demo' },
  pew: { image: '/cosmic/src/assets/3459993693e7ead60b4bf9bcdd002ae1f7ffe7dc.png', href: 'https://pew-beta.vercel.app/demo' },
  miproveedor: { image: '/miproveedor.svg', href: 'https://miproveedor.app/' },
  tiendix: { image: 'https://images.unsplash.com/photo-1688561807971-728cd39eb71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80', href: '#' },
};

const teamPortraits: Record<TeamMemberId, { base: string; hover?: string }> = {
  jorge: {
    base: '/cosmic/src/assets/27e0a25c06adf49df37f10e1cf6a32b3add48a30.png',
    hover: '/avatars/Jorge2.png',
  },
  paola: {
    base: '/cosmic/src/assets/715265d82cfd80d0c3c46d55c9970e2205d611d8.png',
    hover: '/avatars/paola.jpg',
  },
  samira: {
    base: '/cosmic/src/assets/736e0560640ee75ce81d747a3cffb1019b8f6d6e.png',
    hover: '/avatars/samira.jpg',
  },
};

const buildColors = (isDark: boolean) => ({
  page: isDark ? '#000000' : '#f5f7fb',
  overlayTop: isDark ? '#0a0d1f' : '#f0f4ff',
  overlayBottom: isDark ? '#0d0a1a' : '#e8efff',
  glowOne: isDark ? '#4FD4E4' : '#0ea5e9',
  glowTwo: isDark ? '#7B5CFB' : '#a855f7',
  grid: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.06)',
  text: isDark ? '#E8F0FF' : '#0b1221',
  mutedText: isDark ? '#B5C1CE' : '#4b5563',
  subtleText: isDark ? 'rgba(255,255,255,0.7)' : '#1f2937',
  chipBg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.12)',
  chipBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)',
  card: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
  cardBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)',
  glass: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)',
  ctaFrom: isDark ? '#22D3EE' : '#0ea5e9',
  ctaTo: isDark ? '#A855F7' : '#7c3aed',
  panel: isDark ? 'rgba(15, 23, 31, 0.7)' : 'rgba(255, 255, 255, 0.95)',
  panelBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)',
  inputBg: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.96)',
  inputBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)',
  placeholder: isDark ? '#5A6775' : '#94A3B8',
  gradientTextShadow: isDark ? '0 0 24px rgba(79,212,228,0.14)' : '0 8px 24px rgba(14,165,233,0.12)',
});

export function CosmicPage({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const { hero, about, process, services, projects, contact, navigation } = dictionary;
  const gpuFlags = useMemo(() => getGpuDebugFlags(), []);
  const heroRef = useRef<HTMLElement | null>(null);
  const projectsCarouselRef = useRef<HTMLDivElement | null>(null);
  const contactTitleRef = useRef<HTMLHeadingElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const heroInView = useInView(heroRef, { amount: 0.45, margin: '-15% 0px -25% 0px' });
  const contactTitleInView = useInView(contactTitleRef, { amount: 0.6, margin: '-20% 0px -20% 0px' });
  const twinkleStars = useMemo(
    () => [
      { x: '8%', y: '26%', size: 3, delay: 0 },
      { x: '22%', y: '30%', size: 2, delay: 1.2 },
      { x: '38%', y: '28%', size: 2.5, delay: 0.6 },
      { x: '55%', y: '36%', size: 3.2, delay: 1.8 },
      { x: '68%', y: '38%', size: 2.4, delay: 0.3 },
      { x: '82%', y: '30%', size: 2.8, delay: 1.5 },
      { x: '15%', y: '42%', size: 2.2, delay: 0.9 },
      { x: '45%', y: '44%', size: 2.6, delay: 1.1 },
      { x: '73%', y: '38%', size: 2.1, delay: 0.4 },
      { x: '90%', y: '30%', size: 2.9, delay: 2.0 },
    ],
    []
  );
  const enableStarTwinkle = heroInView && !prefersReducedMotion;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useMemo(() => buildColors(isDark), [isDark]);
  const heroColors = useMemo(() => buildColors(true), []);
  const heroIsDark = true;
  const heroVideoOpacity = heroIsDark ? 0.55 : 0.45;
  const enableHeroVideo = heroInView && !prefersReducedMotion;

  const contactRotateOptions = useMemo(() => {
    if (contact.titleRotateOptions && contact.titleRotateOptions.length > 0) {
      return contact.titleRotateOptions;
    }
    return [contact.titleHighlight];
  }, [contact.titleHighlight, contact.titleRotateOptions]);
  const contactRotateMaxLen = useMemo(
    () => Math.max(...contactRotateOptions.map((option) => option.length)),
    [contactRotateOptions]
  );
  const [contactRotateIndex, setContactRotateIndex] = useState(0);

  useEffect(() => {
    setContactRotateIndex(0);
  }, [locale, contactRotateOptions.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!contactTitleInView) return;
    if (contactRotateOptions.length <= 1) return;

    const id = window.setInterval(() => {
      setContactRotateIndex((current) => (current + 1) % contactRotateOptions.length);
    }, 2200);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, contactTitleInView, contactRotateOptions.length]);

  const serviceEntries = useMemo(() => {
    const order: ServiceId[] = [
      'marketing-digital',
      'branding-identidad-visual',
      'landing',
      'ecommerce-profesional',
      'strategy',
    ];
    const orderMap = Object.fromEntries(order.map((id, idx) => [id, idx]));

    return (Object.entries(services.items) as Array<[ServiceId, Dictionary['services']['items'][ServiceId]]>).sort(
      ([a], [b]) => (orderMap[a] ?? 99) - (orderMap[b] ?? 99)
    );
  }, [services.items]);
  const navItems = useMemo(
    () => [
      { label: navigation.hero, href: '#hero' },
      { label: navigation.services, href: '#services' },
      { label: navigation.projects, href: '#projects' },
      { label: navigation.contact, href: '#contact' },
    ],
    [navigation]
  );
  const serviceNavItems = useMemo(
    () =>
      serviceEntries.map(([id, copy]) => ({
        label: serviceNavLabelMap[id]?.[locale] ?? copy.title,
        href: `/${locale}/services/${getServiceSlug(locale, id)}`,
      })),
    [locale, serviceEntries]
  );
  const projectEntries = useMemo(() => Object.entries(projects.items) as Array<[ProjectId, Dictionary['projects']['items'][ProjectId]]>, [projects.items]);

  const scrollProjects = (direction: 'left' | 'right') => {
    const container = projectsCarouselRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>('.project-card');
    const cardWidth = firstCard?.offsetWidth ?? 400;
    const gap = 32;

    container.scrollBy({
      left: (cardWidth + gap) * (direction === 'right' ? 1 : -1),
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden font-geist-mono text-slate-900 dark:text-white transition-colors"
      style={{
        fontFamily: 'var(--font-geist-mono, "Geist Mono", monospace)',
        backgroundColor: colors.page,
      }}
    >
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${colors.page} 0%, ${colors.overlayTop} 35%, ${colors.overlayBottom} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 blur-[80px]"
          style={{
            background:
              `radial-gradient(ellipse 1200px 800px at 40% 30%, ${colors.glowOne} 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, ${colors.glowTwo} 0%, transparent 50%)`,
            opacity: isDark ? 0.05 : 0.12,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `linear-gradient(${colors.grid} 0.5px, transparent 0.5px), linear-gradient(90deg, ${colors.grid} 0.5px, transparent 0.5px)`,
            backgroundSize: '60px 60px',
            opacity: isDark ? 0.35 : 0.6,
          }}
        />
      </div>

      <CosmicHeader navItems={navItems} serviceItems={serviceNavItems} locale={locale} />

      <main className="relative z-10">
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen overflow-hidden px-6 pt-32 pb-28 lg:pb-36 dark"
          style={{ backgroundColor: '#05070d' }}
        >
          <CinematicAurora variant="hero" animated={false} />

          {enableHeroVideo ? (
            <div className="absolute inset-0 overflow-hidden" aria-hidden>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: heroVideoOpacity }}
              >
                <source src="/herostar.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <div
              className="absolute inset-0 overflow-hidden"
              aria-hidden
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 70% 65%, rgba(168,85,247,0.12), transparent 36%), #05070d',
              }}
            />
          )}

          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                opacity: heroIsDark ? 0.015 : 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(79,212,228,0.2), transparent 45%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                opacity: heroIsDark ? 0.015 : 0,
                background: 'radial-gradient(circle at 70% 65%, rgba(168,85,247,0.14), transparent 40%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                opacity: heroIsDark ? 0.08 : 0.02,
                mixBlendMode: 'overlay',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-[62%] pointer-events-none">
              {twinkleStars.map((star, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: star.size,
                    height: star.size,
                    left: star.x,
                    top: star.y,
                    boxShadow: '0 0 10px rgba(255,255,255,0.35)',
                    opacity: 0.35,
                  }}
                  animate={
                    enableStarTwinkle
                      ? { opacity: [0.15, 0.9, 0.15], scale: [1, 1.7, 1] }
                      : { opacity: 0.35, scale: 1 }
                  }
                  transition={
                    enableStarTwinkle
                      ? { duration: 2.5 + star.delay, repeat: Infinity, ease: 'easeInOut', delay: star.delay }
                      : { duration: 0 }
                  }
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex max-w-[1180px] flex-col gap-8 text-center md:gap-10">
            <div className="space-y-4 sm:space-y-5">
              <motion.h1
                className="text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl font-space-grotesk"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span
                  className="block font-space-grotesk"
                  style={{ color: heroColors.text, textShadow: heroIsDark ? '0 0 20px rgba(255,255,255,0.08)' : '0 18px 28px rgba(148,163,184,0.35)' }}
                >
                  {hero.title}
                </span>
                <span
                  className="relative inline-block bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-space-grotesk"
                  style={{
                    textShadow: `${heroColors.gradientTextShadow}, 0 0 10px rgba(0,0,0,0.25)`,
                    WebkitTextStroke: '0.4px rgba(255,255,255,0.35)',
                  }}
                >
                  {hero.highlight}
                </span>
              </motion.h1>

              <motion.p
                className="mx-auto max-w-[360px] text-base leading-relaxed font-geist-mono sm:max-w-[540px] md:max-w-[720px] md:text-lg mt-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{ color: '#ffffff' }}
              >
                {hero.description}
              </motion.p>
            </div>

            <motion.div
              className="flex justify-center mt-2 md:mt-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <a
                href="#services"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-3.5 text-[15px] font-medium text-white shadow-[0_0_32px_rgba(168,85,247,0.28),0_0_18px_rgba(34,211,238,0.24),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_20px_rgba(34,211,238,0.08)]"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${heroColors.ctaFrom}, ${heroColors.ctaTo})`,
                  boxShadow: heroIsDark
                    ? '0 0 32px rgba(168,85,247,0.35), 0 0 18px rgba(34,211,238,0.28), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 20px rgba(34,211,238,0.1)'
                    : '0 20px 48px rgba(37,99,235,0.18), 0 0 18px rgba(14,165,233,0.18), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 20px rgba(14,165,233,0.12)',
                }}
              >
                <span className="relative z-10">{hero.cta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${heroColors.ctaFrom}, ${heroColors.ctaTo})`,
                    opacity: 0.18,
                    filter: 'blur(18px)',
                  }}
                />
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${heroIsDark ? 'rgba(34,211,238,0.2)' : 'rgba(14,165,233,0.35)'}` }}
                />
              </a>
            </motion.div>

            <motion.div
              className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-200 md:hidden"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="tracking-wide">Desliza para ver más</span>
            </motion.div>
          </div>
        </section>

        <AboutCosmicStudioSection about={about} colors={colors} isDark={isDark} />

        <section id="services" className="relative overflow-hidden px-6 py-36">
          <CinematicAurora variant="section" animated={false} />
          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="text-center">
              <h2 className="text-5xl tracking-tight font-space-grotesk text-slate-900 dark:text-white">{services.heading}</h2>
              <p className="mx-auto mt-4 max-w-[780px] leading-relaxed font-geist-mono" style={{ color: colors.mutedText }}>
                {services.description}
              </p>
              <p
                className="mt-6 text-[13px] tracking-wide font-geist-mono text-slate-500 dark:text-slate-200"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#475569' }}
              >
                {services.scrollHint}
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-12">
              {serviceEntries.map(([id, copy], idx) => (
                <ServiceCard
                  key={id}
                  icon={serviceVisuals[id].icon}
                  title={copy.title}
                  eyebrow={copy.eyebrow ?? copy.title}
                  headline={copy.headline}
                  description={copy.description}
                  tag={services.keyBenefitLabel}
                  ideal={copy.benefit}
                  estimatedTime={copy.estimatedTime}
                  startingPrice={copy.startingPrice}
                  color={serviceVisuals[id].color}
                  glowColor={serviceVisuals[id].glow}
                  index={idx}
                  features={copy.features}
                  ctaLabel={copy.ctaLabel ?? services.viewMore}
                  reasonLabel={services.detailPage.outcomesTitle}
                  href={`/${locale}/services/${getServiceSlug(locale, id)}`}
                  imageSrc={copy.imageSrc ?? '/Servicios/web-cosmic.png'}
                  imageAlt={copy.imageAlt}
                  imageSide={copy.imageSide as "left" | "right" | undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <ProcessSection process={process} colors={colors} isDark={isDark} />

        <section id="projects" className="relative px-6 py-36">
          <div className="relative z-10 mx-auto max-w-[1280px]">
            <div className="text-center">
              <h2 className="text-5xl tracking-tight font-space-grotesk text-slate-900 dark:text-white">{projects.heading}</h2>
              <p className="mx-auto mt-4 max-w-[720px] font-geist-mono" style={{ color: colors.mutedText }}>
                {projects.description}
              </p>
            </div>

            <div className="relative mt-16">
              <div
                ref={projectsCarouselRef}
                className="carousel-wrapper overflow-x-auto overflow-y-visible pb-6 pt-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                  scrollPadding: '0 24px',
                  overscrollBehaviorX: 'contain',
                  scrollBehavior: 'smooth',
                }}
              >
                <style>{`
                  .carousel-wrapper::-webkit-scrollbar { display: none; }
                  .carousel-track { display: flex; gap: 32px; }
                `}</style>
                <div className="carousel-track snap-x pl-2 pr-8 md:pl-4 md:pr-8">
                  {projectEntries.map(([id, copy], idx) => (
                    <div
                      key={id}
                      className="project-card snap-start flex-shrink-0"
                      style={{ width: 'clamp(360px, 80vw, 420px)' }}
                    >
                      <CosmicProjectCard
                        title={copy.title}
                        description={copy.subtitle}
                        tags={copy.tags}
                        image={projectMedia[id]?.image}
                        logo={projectMedia[id]?.logo}
                        index={idx}
                        href={projectMedia[id]?.href}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-4 md:flex">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollProjects('left')}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:scale-[1.04]"
                  style={{
                    borderColor: colors.cardBorder,
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)',
                    color: isDark ? 'white' : '#0f172a',
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollProjects('right')}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:scale-[1.04]"
                  style={{
                    borderColor: colors.cardBorder,
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)',
                    color: isDark ? 'white' : '#0f172a',
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden px-6 pb-36 pt-24">
          {!gpuFlags.noAurora && <CinematicAurora variant="contact" animated={false} />}
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="text-center">
              <h2
                ref={contactTitleRef}
                className="mb-6 text-5xl leading-[1.12] tracking-wide drop-shadow-[0_0_25px_rgba(168,85,247,0.12)] font-space-grotesk"
              >
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                  {contact.titleBeforeHighlight}
                </span>{' '}
                <span className="relative inline-block align-baseline" style={{ minWidth: `${contactRotateMaxLen}ch` }}>
                  {!prefersReducedMotion && contactRotateOptions.length > 1 ? (
                    <>
                      <span className="invisible inline-block whitespace-nowrap bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                        {contactRotateOptions[contactRotateIndex]}
                      </span>
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={contactRotateOptions[contactRotateIndex]}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="absolute left-0 top-0 inline-block whitespace-nowrap bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent"
                        >
                          {contactRotateOptions[contactRotateIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </>
                  ) : (
                    <span className="inline-block whitespace-nowrap bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                      {contactRotateOptions[0]}
                    </span>
                  )}
                </span>
                {contact.titleAfterHighlight ? (
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                    {contact.titleAfterHighlight}
                  </span>
                ) : null}
              </h2>
              <p className="text-lg font-geist-mono" style={{ color: colors.mutedText }}>
                {contact.description}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-[960px]" data-gpu-contactfx={gpuFlags.noContactFx ? "off" : "on"}>
              <ContactMessageCard />

              <div className="mt-10 space-y-4 text-center">
                <a
                  href={`mailto:${contact.contactLine.replace('→ ', '')}`}
                  className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                  style={{ color: colors.mutedText }}
                >
                  {contact.contactLine.replace('→ ', '')}
                </a>
                <div className="flex items-center justify-center gap-6 text-sm" style={{ color: colors.mutedText }}>
                  {contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-cyan-500 dark:hover:text-white"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
                <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8' }}>
                  {contact.footerNote.replace('{year}', new Date().getFullYear().toString())}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
