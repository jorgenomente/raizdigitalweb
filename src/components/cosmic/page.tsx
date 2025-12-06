'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, Grid, MessageCircle, Palette, User, Linkedin } from 'lucide-react';
import type { Dictionary, Locale, ProjectId, ServiceId, TeamMemberId } from '@/lib/i18n/dictionaries';
import { CinematicAurora } from './cinematic-aurora';
import { ServiceCard } from './service-card';
import { CosmicProjectCard } from './project-card';
import { CosmicHeader } from './header-navigation';
import { useDictionary } from '../providers/translation-provider';

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

export function CosmicPage({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const { hero, manifesto, services, projects, team, contact, navigation } = dictionary;
  const [formData, setFormData] = useState({ name: '', message: contact.defaultMessage });
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const heroInView = useInView(heroRef, { amount: 0.45, margin: '-15% 0px -25% 0px' });
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

  const handleContact = () => {
    const encodedMessage = encodeURIComponent(
      `${formData.message}${formData.name ? `\nNombre o negocio: ${formData.name}` : ''}`
    );
    const whatsappUrl = `https://wa.me/541171139469?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const navItems = useMemo(
    () => [
      { label: navigation.hero, href: '#hero' },
      { label: navigation.manifesto, href: '#manifesto' },
      { label: navigation.services, href: '#services' },
      { label: navigation.projects, href: '#projects' },
      { label: navigation.team, href: '#team' },
      { label: navigation.contact, href: '#contact' },
    ],
    [navigation]
  );

  const serviceEntries = useMemo(() => {
    const order: ServiceId[] = [
      'branding-identidad-visual',
      'landing',
      'ecommerce-profesional',
      'strategy',
      'marketing-digital',
    ];
    const orderMap = Object.fromEntries(order.map((id, idx) => [id, idx]));

    return (Object.entries(services.items) as Array<[ServiceId, Dictionary['services']['items'][ServiceId]]>).sort(
      ([a], [b]) => (orderMap[a] ?? 99) - (orderMap[b] ?? 99)
    );
  }, [services.items]);
  const projectEntries = useMemo(() => Object.entries(projects.items) as Array<[ProjectId, Dictionary['projects']['items'][ProjectId]]>, [projects.items]);
  const teamEntries = useMemo(() => Object.entries(team.members) as Array<[TeamMemberId, Dictionary['team']['members'][TeamMemberId]]>, [team.members]);
  const manifestoGroups = useMemo(() => {
    if (manifesto.idealForGroups?.length) {
      return manifesto.idealForGroups;
    }

      return manifesto.idealForList.length
      ? [{ label: manifesto.idealForHeading, items: manifesto.idealForList }]
      : [];
  }, [manifesto.idealForGroups, manifesto.idealForList, manifesto.idealForHeading]);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#000000] text-white font-geist-mono"
      style={{ fontFamily: 'var(--font-geist-mono, "Geist Mono", monospace)' }}
    >
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0d1f] to-[#0d0a1a]" />
        <div
          className="absolute inset-0 blur-[80px] opacity-[0.05]"
          style={{
            background:
              'radial-gradient(ellipse 1200px 800px at 40% 30%, #4FD4E4 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, #7B5CFB 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255,255,255,0.02) 0.5px, transparent 0.5px)",
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <CosmicHeader navItems={navItems} locale={locale} />

      <main className="relative z-10">
        <section id="hero" ref={heroRef} className="relative overflow-hidden px-6 pt-32 pb-28 lg:pb-36">
          <CinematicAurora variant="hero" animated={false} />

          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 opacity-[0.015]" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(79,212,228,0.2), transparent 45%)' }} />
            <div className="absolute inset-0 opacity-[0.015]" style={{ background: 'radial-gradient(circle at 70% 65%, rgba(168,85,247,0.14), transparent 40%)' }} />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                opacity: 0.08,
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

          <div className="relative mx-auto flex max-w-[1180px] flex-col gap-10 text-center">
            <div className="space-y-4">
              <motion.p
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[12px] tracking-[0.28em] text-white/70"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                COSMIC STUDIO • DIGITAL SYSTEMS
              </motion.p>

              <motion.h1
                className="text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl font-space-grotesk"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-space-grotesk">{hero.title}</span>
                <span className="relative inline-block bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(79,212,228,0.14)] font-space-grotesk">
                  {hero.highlight}
                </span>
              </motion.h1>

              <motion.p
                className="mx-auto max-w-[720px] text-lg text-[#B5C1CE] font-geist-mono"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {hero.description}
              </motion.p>
            </div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <a
                href="#services"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#22D3EE] to-[#A855F7] px-10 py-3.5 text-[15px] font-medium text-white shadow-[0_0_32px_rgba(168,85,247,0.35),0_0_18px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_20px_rgba(34,211,238,0.1)]"
              >
                <span className="relative z-10">{hero.cta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] opacity-[0.15] blur-xl transition-opacity group-hover:opacity-[0.45]" />
                <span className="absolute inset-0 rounded-full border border-cyan-400/20" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="manifesto" className="relative overflow-hidden px-6 py-32">
          <CinematicAurora variant="section" animated={false} />
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255,255,255,0.02) 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
          </div>

          <div className="relative mx-auto max-w-[1100px] space-y-10 text-center">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-6 py-3 text-[11px] tracking-[1.7px] text-white/90">
                {manifesto.tagline.toUpperCase()}
              </div>
            </div>

            <h2
              className="text-white drop-shadow-[0_0_30px_rgba(79,212,228,0.12)] font-space-grotesk"
              style={{ fontSize: '52px', lineHeight: 1.15 }}
            >
              {manifesto.headline}
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-[1.65] text-white/80 font-geist-mono">
              {manifesto.description}
            </p>

            <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {manifestoGroups.map((group, idx) => {
                const palette = [
                  { from: 'rgba(79, 212, 228, 0.9)', to: 'rgba(6, 182, 212, 0.9)', glow: 'rgba(79, 212, 228, 0.28)' },
                  { from: 'rgba(196, 91, 255, 0.9)', to: 'rgba(168, 85, 247, 0.9)', glow: 'rgba(196, 91, 255, 0.28)' },
                  { from: 'rgba(246, 189, 96, 0.9)', to: 'rgba(244, 114, 182, 0.9)', glow: 'rgba(244, 114, 182, 0.28)' },
                ];
                const colors = palette[idx % palette.length];

                return (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                  >
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                        filter: 'blur(40px)',
                      }}
                      aria-hidden
                    />
                    <div className="relative space-y-3">
                      <p className="text-sm font-space-grotesk text-white drop-shadow-[0_0_14px_rgba(0,0,0,0.35)]">
                        {group.label}
                      </p>
                      <ul className="space-y-2 text-[13px] leading-relaxed text-white/85">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                            <span className="font-geist-mono">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden px-6 py-36">
          <CinematicAurora variant="section" animated={false} />
          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="text-center">
              <h2 className="text-5xl tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-space-grotesk">{services.heading}</h2>
              <p className="mx-auto mt-4 max-w-[780px] text-[#B5C1CE] leading-relaxed font-geist-mono">{services.description}</p>
              <p className="mt-6 text-[13px] tracking-wide text-[#8A99A8] font-geist-mono">{services.scrollHint}</p>
            </div>

            <div className="mt-16 flex flex-col gap-12">
              {serviceEntries.map(([id, copy], idx) => (
                <ServiceCard
                  key={id}
                  icon={serviceVisuals[id].icon}
                  title={copy.title}
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
                  href={`/${locale}/services/${id}`}
                  imageSrc={copy.imageSrc ?? '/Servicios/web-cosmic.png'}
                  imageAlt={copy.imageAlt}
                  imageSide={copy.imageSide as "left" | "right" | undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative overflow-hidden px-6 py-36">
          <CinematicAurora variant="section" animated={false} />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="text-center">
              <h2 className="text-5xl tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-space-grotesk">{projects.heading}</h2>
              <p className="mx-auto mt-4 max-w-[720px] text-[#B5C1CE] font-geist-mono">{projects.description}</p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projectEntries.map(([id, copy], idx) => (
                <CosmicProjectCard
                  key={id}
                  title={copy.title}
                  description={copy.subtitle}
                  tags={copy.tags}
                  image={projectMedia[id]?.image}
                  logo={projectMedia[id]?.logo}
                  index={idx}
                  href={projectMedia[id]?.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="relative overflow-hidden px-6 py-36">
          <CinematicAurora variant="section" animated={false} />
          <div className="relative z-10 mx-auto max-w-[1180px] space-y-10">
            <div className="text-center">
              <h2 className="text-5xl tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-space-grotesk">{team.heading}</h2>
              <p className="mx-auto mt-4 max-w-[760px] text-[#B5C1CE] font-geist-mono">{team.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamEntries.map(([id, copy], idx) => {
                const portrait = teamPortraits[id];

                return (
                  <motion.div
                    key={id}
                    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white/5 to-white/0">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={portrait.base}
                          alt={copy.role}
                          fill
                          sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                          className={`object-cover transition-all duration-500 group-hover:scale-[1.05] ${
                            portrait.hover ? 'opacity-100 group-hover:opacity-0' : ''
                          }`}
                          priority={idx === 0}
                        />
                        {portrait.hover ? (
                          <Image
                            src={portrait.hover}
                            alt={copy.role}
                            fill
                            sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                            className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.05]"
                            loading="eager"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </div>
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                      </div>
                      <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] tracking-[0.2em] text-white/80">
                        TEAM
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 space-y-1 px-6 pb-5">
                        <h3 className="text-xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] font-space-grotesk">{copy.role}</h3>
                        <p className="text-sm text-white/80 font-geist-mono">{copy.description}</p>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <a
                          href="https://www.linkedin.com/company/cosmic-st/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0077b5] text-white shadow-[0_2px_12px_rgba(0,119,181,0.6)]"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              <span className="tracking-wide text-emerald-400">{contact.systemStatus}</span>
              <span className="text-[#6A7282]">•</span>
              <span className="tracking-wide text-[#A8B3BF]">COLABORACIÓN EN TIEMPO REAL</span>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden px-6 pb-36 pt-24">
          <CinematicAurora variant="contact" animated />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="text-center">
              <h2 className="mb-6 text-5xl tracking-wide drop-shadow-[0_0_25px_rgba(168,85,247,0.12)] font-space-grotesk">
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                  {contact.titleBeforeHighlight} {contact.titleHighlight}{contact.titleAfterHighlight}
                </span>
              </h2>
              <p className="text-lg text-[#D4DBE1] font-geist-mono">{contact.description}</p>
            </div>

            <div className="mx-auto mt-12 max-w-[960px]">
              <div className="relative overflow-hidden rounded-[32px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.03] to-pink-500/[0.02] p-1 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="rounded-[28px] bg-[#0F171E]/70 p-10 backdrop-blur-xl">
                  <form
                    className="space-y-8"
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleContact();
                    }}
                  >
                    <div className="space-y-2">
                      <label className="block text-[11px] tracking-[1.2px] text-[#9BA8B5] uppercase">{contact.nameLabel}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9BA8B5]" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder={contact.namePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-12 py-4 text-white placeholder:text-[#5A6775] outline-none transition focus:border-cyan-400/35 focus:ring-1 focus:ring-cyan-400/15"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] tracking-[1.2px] text-[#9BA8B5] uppercase">{contact.messageLabel}</label>
                      <div className="relative">
                        <MessageCircle className="absolute left-4 top-4 h-4 w-4 text-[#9BA8B5]" />
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                          placeholder={contact.defaultMessage}
                          className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-12 py-4 text-white placeholder:text-[#5A6775] outline-none transition focus:border-cyan-400/35 focus:ring-1 focus:ring-cyan-400/15"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        type="submit"
                        className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#22D3EE] to-[#A855F7] px-10 py-3.5 text-[15px] font-medium text-white shadow-[0_0_32px_rgba(168,85,247,0.35),0_0_18px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_20px_rgba(34,211,238,0.1)]"
                      >
                        <span className="relative z-10">{contact.buttonLabel}</span>
                        <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] opacity-[0.15] blur-xl transition-opacity" />
                        <span className="absolute inset-0 rounded-full border border-cyan-400/20" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="mt-10 space-y-4 text-center">
                <a href={`mailto:${contact.contactLine.replace('→ ', '')}`} className="text-[#9FAEBA] hover:text-cyan-400 transition-colors">
                  {contact.contactLine.replace('→ ', '')}
                </a>
                <div className="flex items-center justify-center gap-6 text-sm text-[#9FAEBA]">
                  {contact.socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      {social.label}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-white/40">{contact.footerNote.replace('{year}', new Date().getFullYear().toString())}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
