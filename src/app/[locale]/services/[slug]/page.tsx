import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock3, Globe, MessageSquare, Sparkles, Target, Wallet } from 'lucide-react';
import type { ReactElement } from 'react';
import { CinematicAurora } from '@/components/cosmic/cinematic-aurora';
import { CosmicHeader, type CosmicNavItem } from '@/components/cosmic/header-navigation';
import { TranslationProvider } from '@/components/providers/translation-provider';
import { BrandingPainComparative } from '@/components/services/branding-pain-comparative';
import { marketingPackages } from '@/lib/content/marketing-packages';
import {
  getDictionary,
  getServiceIdFromSlug,
  getServiceSlug,
  locales,
  serviceIds,
  type ServiceId,
} from '@/lib/i18n/dictionaries';
import { ensureLocale } from '@/lib/i18n/locale';

type ServicePageParams = Promise<{ locale?: string | null; slug?: string | null }>;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cosmicst.dev';
const METADATA_BASE = new URL(SITE_URL);
const OPEN_GRAPH_IMAGE = {
  url: '/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png',
  width: 1200,
  height: 630,
};

function ensureServiceId(serviceId?: string | null): ServiceId {
  if (!serviceId) {
    notFound();
  }

  if (!serviceIds.includes(serviceId as ServiceId)) {
    notFound();
  }

  return serviceId as ServiceId;
}

async function resolveParams(params: ServicePageParams) {
  const resolved = await params;
  const locale = ensureLocale({ locale: resolved.locale });
  const serviceId = getServiceIdFromSlug(locale, resolved.slug);

  if (!serviceId) {
    notFound();
  }

  return { locale, serviceId };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceIds.map((serviceId) => ({ locale, slug: getServiceSlug(locale, serviceId) }))
  );
}

export async function generateMetadata({ params }: { params: ServicePageParams }): Promise<Metadata> {
  const { locale, serviceId } = await resolveParams(params);
  const serviceSlug = getServiceSlug(locale, serviceId);
  const dictionary = getDictionary(locale);
  const service = dictionary.services.items[serviceId];
  const detail = dictionary.services.details[serviceId];
  const canonical = `${SITE_URL}/${locale}/services/${serviceSlug}`;

  if (!service || !detail) {
    notFound();
  }

  const description = detail.seoDescription || detail.intro || service.description;
  const seoTitle = detail.seoTitle || `${service.title} | ${dictionary.metadata.title}`;

  return {
    title: seoTitle,
    description,
    metadataBase: METADATA_BASE,
    openGraph: {
      title: detail.seoTitle || `${service.title} | ${dictionary.metadata.ogTitle}`,
      description,
      url: canonical,
      siteName: "Cosmic Studio",
      images: [OPEN_GRAPH_IMAGE],
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: detail.seoTitle || `${service.title} | Cosmic Studio`,
      description,
      images: [OPEN_GRAPH_IMAGE],
    },
    alternates: {
      canonical: canonical,
      languages: {
        es: `/es/services/${getServiceSlug('es', serviceId)}`,
        en: `/en/services/${getServiceSlug('en', serviceId)}`,
        'x-default': `/es/services/${getServiceSlug('es', serviceId)}`,
      },
    },
    icons: { icon: '/favicon.png' },
  };
}

export default async function ServicePage({ params }: { params: ServicePageParams }) {
  const { locale, serviceId } = await resolveParams(params);
  const serviceSlug = getServiceSlug(locale, serviceId);
  const dictionary = getDictionary(locale);
  const service = dictionary.services.items[serviceId];
  const detail = dictionary.services.details[serviceId];

  if (!service || !detail) {
    notFound();
  }

  const { detailPage, keyBenefitLabel } = dictionary.services;
  const orderedServices: ServiceId[] = [
    'marketing-digital',
    'branding-identidad-visual',
    'landing',
    'ecommerce-profesional',
    'strategy',
  ];
  const serviceNavLabelMap: Record<ServiceId, { es: string; en: string }> = {
    'marketing-digital': { es: 'Marketing Digital', en: 'Digital Marketing' },
    'branding-identidad-visual': { es: 'Branding Profesional', en: 'Professional Branding' },
    landing: { es: 'Páginas Web', en: 'Web Pages' },
    'ecommerce-profesional': { es: 'Tiendas Online Premium', en: 'Premium Online Stores' },
    strategy: { es: 'Software a medida', en: 'Custom Software' },
  };
  const navItems: CosmicNavItem[] = [
    { label: dictionary.navigation.hero, href: `/${locale}/#hero` },
    { label: dictionary.navigation.services, href: `/${locale}/#services` },
    { label: dictionary.navigation.projects, href: `/${locale}/#projects` },
    { label: dictionary.navigation.contact, href: `/${locale}/#contact` },
  ];
  const serviceNavItems: CosmicNavItem[] = orderedServices
    .filter((id) => dictionary.services.items[id])
    .map((id) => ({
      label: serviceNavLabelMap[id]?.[locale] ?? dictionary.services.items[id].title,
      href: `/${locale}/services/${getServiceSlug(locale, id)}`,
    }));
  const header = <CosmicHeader navItems={navItems} serviceItems={serviceNavItems} locale={locale} />;

  const highlights = [
    service.estimatedTime
      ? { label: detailPage.highlights.duration, value: service.estimatedTime, icon: <Clock3 className="h-4 w-4" /> }
      : null,
    service.startingPrice
      ? { label: detailPage.highlights.investment, value: service.startingPrice, icon: <Wallet className="h-4 w-4" /> }
      : null,
    { label: keyBenefitLabel, value: service.benefit, icon: <Sparkles className="h-4 w-4" /> },
  ].filter(Boolean) as Array<{ label: string; value: string; icon: ReactElement }>;

  const whatsappUrl = `https://wa.me/541171139469?text=${encodeURIComponent(detail.whatsappMessage)}`;
  const showcaseImage = '/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png';
  const showcaseAlt = service.imageAlt || `${service.title} visual`;
  const schema = detail.schema ?? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: 'Cosmic Studio',
      url: 'https://cosmicst.dev',
    },
    description: detail.seoDescription || detail.intro,
    areaServed: 'Argentina, Latinoamérica, Estados Unidos',
    serviceType: service.title,
  };
  const jsonLd = JSON.stringify(schema);

  const resolveInternalHref = (href: string) => {
    if (href.startsWith('/services/')) {
      const rawSlug = href.split('/')[2];
      const targetId =
        getServiceIdFromSlug(locale, rawSlug) ??
        (serviceIds.includes(rawSlug as ServiceId) ? (rawSlug as ServiceId) : undefined);
      if (targetId) {
        return `/${locale}/services/${getServiceSlug(locale, targetId)}`;
      }
    }

    if (href.startsWith('http')) return href;
    if (href.startsWith('#')) return `/${locale}${href}`;
    if (href.startsWith('/')) return `/${locale}${href}`;
    return `/${locale}/${href}`;
  };

  if (serviceId === 'branding-identidad-visual') {
    const benefits = detail.benefits ?? [];
    const featuredBenefits = benefits.slice(0, 4);
    const benefitsVisual = '/assets/brandin1.jpg';
    const benefitsVisualAlt = service.imageAlt || showcaseAlt;
    const preferredBenefitsOrder = [
      'Diferenciación inmediata',
      'Comunicación clara',
      'Atrae a tu cliente ideal',
      'Presencia digital coherente',
    ];
    const featuredBenefitsOrdered = featuredBenefits
      .map((benefit) => ({
        ...benefit,
        priority: preferredBenefitsOrder.findIndex((item) => item.toLowerCase() === benefit.title.toLowerCase()),
      }))
      .sort((a, b) => (a.priority === -1 ? Number.POSITIVE_INFINITY : a.priority) - (b.priority === -1 ? Number.POSITIVE_INFINITY : b.priority));
    const benefitIconMap: Record<string, ReactElement> = {
      'diferenciación inmediata': <Sparkles className="h-8 w-8" />,
      'comunicación clara': <MessageSquare className="h-8 w-8" />,
      'atrae a tu cliente ideal': <Target className="h-8 w-8" />,
      'presencia digital coherente': <Globe className="h-8 w-8" />,
    };

    return (
      <TranslationProvider dictionary={dictionary}>
        <div
          className="service-page relative min-h-screen overflow-hidden font-geist-mono text-[var(--foreground)]"
          style={{ background: 'var(--background)' }}
        >
          {header}
          <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 40%, color-mix(in srgb, var(--background) 78%, transparent) 100%)',
            }}
          />
          <div
            className="absolute inset-0 blur-[80px] opacity-[0.1]"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 40% 30%, color-mix(in srgb, #4FD4E4 80%, var(--background) 20%) 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, color-mix(in srgb, #7B5CFB 80%, var(--background) 20%) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <main className="relative z-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

          <section className="relative overflow-hidden px-6 pt-32 pb-16">
            <CinematicAurora variant="hero" animated={false} />
            <div className="relative mx-auto max-w-7xl space-y-8">
              <Link
                href={`/${locale}#services`}
                className="inline-flex items-center gap-2 text-sm text-[#B5C1CE] transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailPage.backToServices}
              </Link>

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-[32px] leading-[1.1] drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-[44px] font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-base leading-7 text-[#B5C1CE] md:text-[19px] md:leading-8">{detail.intro}</p>
                    <div className="relative w-full">
                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden />
                        <div className="absolute -left-10 top-6 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
                        <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" aria-hidden />
                        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {[0, 1, 2].map((idx) => (
                            <div
                              key={`hero-branding-image-${idx}`}
                              className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.08] ring-1 ring-white/10"
                            >
                              <Image
                                src={service.imageSrc || '/Servicios/AURO.PNG'}
                                alt={showcaseAlt}
                                width={480}
                                height={360}
                                className="h-full w-full aspect-[4/3] object-cover"
                                priority={idx === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                      >
                        <span>{detail.heroCta || detail.benefitsCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-space-grotesk text-white/85 transition hover:border-white/30 hover:bg-white/[0.1]"
                      >
                        <span>Ver portafolio (3 min)</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-xs text-white/65 md:text-sm">Proceso guiado, entregables completos y diseño profesional.</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {highlights.map((item, idx) => (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                        >
                          <div className="mt-1 text-white/80">{item.icon}</div>
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A99A8]">{item.label}</p>
                            <p className="text-sm text-white font-space-grotesk">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-8 md:grid-cols-[0.4fr,0.6fr] md:items-start md:gap-12 md:px-10 md:py-12 lg:grid-cols-[38%_1fr]">
                <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                <div className="relative order-1 w-full md:mx-auto lg:mx-0 lg:max-w-[420px]">
                  <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 rounded-[24px] border border-white/5 bg-white/[0.02]" aria-hidden />
                    <div className="absolute inset-4 rounded-[22px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-white/10">
                      <Image
                        src={benefitsVisual}
                        alt={benefitsVisualAlt}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative order-2 space-y-5 lg:space-y-6 lg:px-8">
                  <div className="relative space-y-2 rounded-[18px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                    <h2 className="text-[26px] font-space-grotesk leading-tight md:text-[30px]">{detail.benefitsTitle}</h2>
                    {detail.benefitsNarrative ? (
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE] md:text-sm">{detail.benefitsNarrative}</p>
                    ) : null}
                  </div>
                  <div className="pointer-events-none absolute -left-4 top-12 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {featuredBenefitsOrdered.map((benefit, idx) => (
                      <div
                        key={`${benefit.title}-${idx}`}
                        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.35)]"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 80% 70%, rgba(123,92,251,0.14), transparent 36%)' }} />
                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 p-3 text-cyan-300 ring-1 ring-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.26)]">
                          {benefitIconMap[benefit.title.toLowerCase()] ?? <Sparkles className="h-8 w-8" />}
                        </div>
                        <div className="relative space-y-1.5">
                          <p className="text-[16px] font-space-grotesk text-white leading-tight">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <BrandingPainComparative
              title={detail.painTitle || 'Sin Branding Profesional… tu marca pierde oportunidades.'}
              intro={detail.painIntro}
              conclusion={detail.painConclusion}
              painPoints={detail.painPoints}
              className="relative overflow-hidden px-6 pb-16"
            />
          ) : null}

          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                <Image
                  src={showcaseImage}
                  alt={showcaseAlt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Entregables del servicio</p>
                <h2 className="mt-2 text-2xl font-space-grotesk">{detail.includesTitle || detailPage.deliverablesTitle}</h2>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {detail.deliverables.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {detail.steps?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Proceso simple</p>
                <h2 className="text-2xl font-space-grotesk">{detail.processTitle || 'Proceso simple'}</h2>
                <div className="space-y-4">
                  {detail.steps.map((step, idx) => (
                    <div
                      key={`${step.title}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.processCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#projects`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <span>Ver portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {(detail.audience?.length || detail.internalLinks?.length) ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                {detail.audience?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Para Quién es este Servicio</h2>
                    <ul className="mt-5 space-y-3">
                      {detail.audience.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.internalLinks?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Explorá más servicios</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Interlinking</h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {detail.internalLinks.map((link, idx) => (
                        <Link
                          key={`${link.href}-${idx}`}
                          href={resolveInternalHref(link.href)}
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {detail.differentiators?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Ventajas clave</p>
                <h2 className="text-2xl font-space-grotesk">{detail.differentiatorsTitle}</h2>
                <div className="space-y-3">
                  {detail.differentiators.map((item, idx) => (
                    <div key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {detail.plans?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Elige tu plan</p>
                <h2 className="text-2xl font-space-grotesk">{detail.plansTitle}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {detail.plans.map((plan, idx) => (
                    <div
                      key={`${plan.name}-${idx}`}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-space-grotesk text-white">{plan.name}</p>
                        {plan.badge ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-amber-200">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{plan.description}</p>
                      {plan.note ? <p className="text-[12px] text-white/70">{plan.note}</p> : null}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.planCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.faqs?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.faqTitle}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.faqTitle || 'Preguntas Frecuentes (FAQ)'}</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq, idx) => (
                    <div key={`${faq.question}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm font-space-grotesk text-white">{faq.question}</p>
                      <p className="text-[13px] leading-relaxed text-[#8A99A8]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-24">
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border p-10 final-cta"
              style={{
                background: 'var(--service-final-bg)',
                borderColor: 'var(--service-final-border)',
                boxShadow: 'var(--service-final-shadow)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk text-slate-900 dark:text-white">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                    {detail.finalCtaSubtitle || detailPage.ctaSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.finalCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#services`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
                    style={{ borderColor: 'var(--service-final-border)' }}
                  >
                    <span>{detailPage.backToServices}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        </div>
      </TranslationProvider>
    );
  }

  if (serviceId === 'landing') {
    const benefits = detail.benefits ?? [];
    const featuredBenefits = benefits.slice(0, 4);
    const benefitsVisual = service.imageSrc || '/Serviciosweb.jpg';
    const benefitsVisualAlt = service.imageAlt || showcaseAlt;
    const painEntries = (detail.painPoints ?? []).map((point) => {
      const [title, ...rest] = point.split(/—|→/).map((part) => part.trim()).filter(Boolean);
      return { title, description: rest.join(' — ') };
    });

    return (
      <TranslationProvider dictionary={dictionary}>
        <div
          className="service-page relative min-h-screen overflow-hidden font-geist-mono text-[var(--foreground)]"
          style={{ background: 'var(--background)' }}
        >
          {header}
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 40%, color-mix(in srgb, var(--background) 78%, transparent) 100%)',
            }}
          />
          <div
            className="absolute inset-0 blur-[80px] opacity-[0.1]"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 40% 30%, color-mix(in srgb, #4FD4E4 80%, var(--background) 20%) 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, color-mix(in srgb, #7B5CFB 80%, var(--background) 20%) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <main className="relative z-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

          <section className="relative overflow-hidden px-6 pt-32 pb-16">
            <CinematicAurora variant="hero" animated={false} />
            <div className="relative mx-auto max-w-7xl space-y-8">
              <Link
                href={`/${locale}#services`}
                className="inline-flex items-center gap-2 text-sm text-[#B5C1CE] transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailPage.backToServices}
              </Link>

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-[32px] leading-[1.1] drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-[44px] font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-base leading-7 text-[#B5C1CE] md:text-[19px] md:leading-8">{detail.intro}</p>
                    <div className="relative w-full">
                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden />
                        <div className="absolute -left-10 top-6 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
                        <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" aria-hidden />
                        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {[0, 1, 2].map((idx) => (
                            <div
                              key={`hero-landing-image-${idx}`}
                              className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.08] ring-1 ring-white/10"
                            >
                              <Image
                                src={service.imageSrc || '/Serviciosweb.jpg'}
                                alt={showcaseAlt}
                                width={480}
                                height={360}
                                className="h-full w-full aspect-[4/3] object-cover"
                                priority={idx === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                      >
                        <span>{detail.heroCta || detail.benefitsCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-space-grotesk text-white/85 transition hover:border-white/30 hover:bg-white/[0.1]"
                      >
                        <span>Ver portafolio (3 min)</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-xs text-white/65 md:text-sm">Proceso guiado, entregables completos y diseño profesional.</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {highlights.map((item, idx) => (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                        >
                          <div className="mt-1 text-white/80">{item.icon}</div>
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A99A8]">{item.label}</p>
                            <p className="text-sm text-white font-space-grotesk">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-8 md:grid-cols-[0.4fr,0.6fr] md:items-start md:gap-12 md:px-10 md:py-12 lg:grid-cols-[38%_1fr]">
                <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                <div className="relative order-1 w-full md:mx-auto lg:mx-0 lg:max-w-[420px]">
                  <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 rounded-[24px] border border-white/5 bg-white/[0.02]" aria-hidden />
                    <div className="absolute inset-4 rounded-[22px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-white/10">
                      <Image
                        src={benefitsVisual}
                        alt={benefitsVisualAlt}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative order-2 space-y-5 lg:space-y-6 lg:px-8">
                  <div className="relative space-y-2 rounded-[18px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                    <h2 className="text-[26px] font-space-grotesk leading-tight md:text-[30px]">{detail.benefitsTitle}</h2>
                    {detail.benefitsNarrative ? (
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE] md:text-sm">{detail.benefitsNarrative}</p>
                    ) : null}
                  </div>
                  <div className="pointer-events-none absolute -left-4 top-12 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {featuredBenefits.map((benefit, idx) => (
                      <div
                        key={`${benefit.title}-${idx}`}
                        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.35)]"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 80% 70%, rgba(123,92,251,0.14), transparent 36%)' }} />
                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 p-3 text-cyan-300 ring-1 ring-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.26)]">
                          <Sparkles className="h-[72px] w-[72px]" />
                        </div>
                        <div className="relative space-y-1.5">
                          <p className="text-[16px] font-space-grotesk text-white leading-tight">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {painEntries.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div
                className="relative mx-auto max-w-7xl space-y-8 overflow-hidden rounded-[28px] border p-10 pain-section"
                style={{
                  background: 'var(--service-pain-bg)',
                  borderColor: 'var(--service-pain-border)',
                  boxShadow: 'var(--service-pain-shadow)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[rgba(240,249,255,0.9)] via-[rgba(245,243,255,0.92)] to-[rgba(255,247,237,0.9)] dark:from-transparent dark:via-transparent dark:to-transparent"
                  aria-hidden
                />
                <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl dark:bg-rose-500/10" aria-hidden />
                <div className="absolute -right-8 bottom-6 h-52 w-52 rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-400/10" aria-hidden />
                <div className="relative space-y-4">
                  {detail.painIntro ? (
                    <p className="text-sm text-slate-700 dark:text-white/80">{detail.painIntro}</p>
                  ) : null}
                  <h2 className="text-[26px] leading-tight font-space-grotesk md:text-[30px] text-slate-900 dark:text-white">
                    {detail.painTitle}
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {painEntries.map((pain, idx) => (
                      <div
                        key={`${pain.title}-${idx}`}
                        className="rounded-2xl border bg-white/90 p-5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-black/35 dark:shadow-[0_14px_32px_rgba(0,0,0,0.26)] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-amber-600 ring-1 ring-slate-200 dark:text-amber-200 dark:ring-white/15">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-space-grotesk text-slate-900 dark:text-white">
                              {pain.title || pain.description}
                            </p>
                            {pain.description ? (
                              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                                {pain.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {detail.painNarrative ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-white/70">{detail.painNarrative}</p>
                  ) : null}
                  {detail.painConclusion ? (
                    <p className="text-sm text-slate-900 dark:text-white">{detail.painConclusion}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                    >
                      <span>{detail.painCta || detailPage.contactCta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                <Image
                  src={showcaseImage}
                  alt={showcaseAlt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Qué incluye</p>
                <h2 className="mt-2 text-2xl font-space-grotesk">{detail.includesTitle || detailPage.deliverablesTitle}</h2>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {detail.deliverables.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {detail.steps?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.processTitle || 'Proceso simple'}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.processTitle || 'Proceso simple'}</h2>
                <div className="space-y-4">
                  {detail.steps.map((step, idx) => (
                    <div
                      key={`${step.title}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.processCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#projects`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <span>Ver portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {(detail.audience?.length || detail.internalLinks?.length) ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                {detail.audience?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Para Quién es este Servicio</h2>
                    <ul className="mt-5 space-y-3">
                      {detail.audience.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.internalLinks?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Explorá más servicios</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Interlinking</h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {detail.internalLinks.map((link, idx) => (
                        <Link
                          key={`${link.href}-${idx}`}
                          href={resolveInternalHref(link.href)}
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {detail.differentiators?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Ventajas clave</p>
                <h2 className="text-2xl font-space-grotesk">{detail.differentiatorsTitle}</h2>
                <div className="space-y-3">
                  {detail.differentiators.map((item, idx) => (
                    <div key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {detail.plans?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Elige tu plan</p>
                <h2 className="text-2xl font-space-grotesk">{detail.plansTitle}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {detail.plans.map((plan, idx) => (
                    <div
                      key={`${plan.name}-${idx}`}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-space-grotesk text-white">{plan.name}</p>
                        {plan.badge ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-amber-200">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{plan.description}</p>
                      {plan.note ? <p className="text-[12px] text-white/70">{plan.note}</p> : null}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.planCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.faqs?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.faqTitle}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.faqTitle || 'Preguntas Frecuentes (FAQ)'}</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq, idx) => (
                    <div key={`${faq.question}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm font-space-grotesk text-white">{faq.question}</p>
                      <p className="text-[13px] leading-relaxed text-[#8A99A8]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-24">
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border p-10 final-cta"
              style={{
                background: 'var(--service-final-bg)',
                borderColor: 'var(--service-final-border)',
                boxShadow: 'var(--service-final-shadow)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk text-slate-900 dark:text-white">
                    {detail.finalCtaTitle || service.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                    {detail.finalCtaSubtitle || detailPage.ctaSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.finalCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#services`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
                    style={{ borderColor: 'var(--service-final-border)' }}
                  >
                    <span>{detailPage.backToServices}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </TranslationProvider>
    );
  }

  if (serviceId === 'ecommerce-profesional') {
    const benefits = detail.benefits ?? [];
    const featuredBenefits = benefits.slice(0, 4);
    const benefitsVisual = service.imageSrc || '/Serviciosweb.jpg';
    const benefitsVisualAlt = service.imageAlt || showcaseAlt;
    const painEntries = (detail.painPoints ?? []).map((point) => {
      const [title, ...rest] = point.split(/—|→/).map((part) => part.trim()).filter(Boolean);
      return { title, description: rest.join(' — ') };
    });

    return (
      <TranslationProvider dictionary={dictionary}>
        <div
          className="service-page relative min-h-screen overflow-hidden font-geist-mono text-[var(--foreground)]"
          style={{ background: 'var(--background)' }}
        >
          {header}
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 40%, color-mix(in srgb, var(--background) 78%, transparent) 100%)',
            }}
          />
          <div
            className="absolute inset-0 blur-[80px] opacity-[0.1]"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 40% 30%, color-mix(in srgb, #4FD4E4 80%, var(--background) 20%) 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, color-mix(in srgb, #7B5CFB 80%, var(--background) 20%) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <main className="relative z-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

          <section className="relative overflow-hidden px-6 pt-32 pb-16">
            <CinematicAurora variant="hero" animated={false} />
            <div className="relative mx-auto max-w-7xl space-y-8">
              <Link
                href={`/${locale}#services`}
                className="inline-flex items-center gap-2 text-sm text-[#B5C1CE] transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailPage.backToServices}
              </Link>

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-[32px] leading-[1.1] drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-[44px] font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-base leading-7 text-[#B5C1CE] md:text-[19px] md:leading-8">{detail.intro}</p>
                    <div className="relative w-full">
                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden />
                        <div className="absolute -left-10 top-6 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
                        <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" aria-hidden />
                        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {[0, 1, 2].map((idx) => (
                            <div
                              key={`hero-ecommerce-image-${idx}`}
                              className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.08] ring-1 ring-white/10"
                            >
                              <Image
                                src={service.imageSrc || '/Serviciosweb.jpg'}
                                alt={showcaseAlt}
                                width={480}
                                height={360}
                                className="h-full w-full aspect-[4/3] object-cover"
                                priority={idx === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-space-grotesk text-white/85 transition hover:border-white/30 hover:bg-white/[0.1]"
                      >
                        <span>Ver portafolio (3 min)</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-xs text-white/65 md:text-sm">Ecommerce robusto, diseño profesional y optimizado para vender.</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {highlights.map((item, idx) => (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                        >
                          <div className="mt-1 text-white/80">{item.icon}</div>
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A99A8]">{item.label}</p>
                            <p className="text-sm text-white font-space-grotesk">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-8 md:grid-cols-[0.4fr,0.6fr] md:items-start md:gap-12 md:px-10 md:py-12 lg:grid-cols-[38%_1fr]">
                <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                <div className="relative order-1 w-full md:mx-auto lg:mx-0 lg:max-w-[420px]">
                  <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 rounded-[24px] border border-white/5 bg-white/[0.02]" aria-hidden />
                    <div className="absolute inset-4 rounded-[22px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-white/10">
                      <Image
                        src={benefitsVisual}
                        alt={benefitsVisualAlt}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative order-2 space-y-5 lg:space-y-6 lg:px-8">
                  <div className="relative space-y-2 rounded-[18px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                    <h2 className="text-[26px] font-space-grotesk leading-tight md:text-[30px]">{detail.benefitsTitle}</h2>
                    {detail.benefitsNarrative ? (
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE] md:text-sm">{detail.benefitsNarrative}</p>
                    ) : null}
                  </div>
                  <div className="pointer-events-none absolute -left-4 top-12 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {featuredBenefits.map((benefit, idx) => (
                      <div
                        key={`${benefit.title}-${idx}`}
                        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.35)]"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 80% 70%, rgba(123,92,251,0.14), transparent 36%)' }} />
                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 p-3 text-cyan-300 ring-1 ring-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.26)]">
                          <Sparkles className="h-[72px] w-[72px]" />
                        </div>
                        <div className="relative space-y-1.5">
                          <p className="text-[16px] font-space-grotesk text-white leading-tight">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {painEntries.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div
                className="relative mx-auto max-w-7xl space-y-8 overflow-hidden rounded-[28px] border p-10 pain-section"
                style={{
                  background: 'var(--service-pain-bg)',
                  borderColor: 'var(--service-pain-border)',
                  boxShadow: 'var(--service-pain-shadow)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[rgba(240,249,255,0.9)] via-[rgba(245,243,255,0.92)] to-[rgba(255,247,237,0.9)] dark:from-transparent dark:via-transparent dark:to-transparent"
                  aria-hidden
                />
                <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl dark:bg-rose-500/10" aria-hidden />
                <div className="absolute -right-8 bottom-6 h-52 w-52 rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-400/10" aria-hidden />
                <div className="relative space-y-4">
                  {detail.painIntro ? (
                    <p className="text-sm text-slate-700 dark:text-white/80">{detail.painIntro}</p>
                  ) : null}
                  <h2 className="text-[26px] leading-tight font-space-grotesk md:text-[30px] text-slate-900 dark:text-white">
                    {detail.painTitle}
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {painEntries.map((pain, idx) => (
                      <div
                        key={`${pain.title}-${idx}`}
                        className="rounded-2xl border bg-white/90 p-5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-black/35 dark:shadow-[0_14px_32px_rgba(0,0,0,0.26)] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-amber-600 ring-1 ring-slate-200 dark:text-amber-200 dark:ring-white/15">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-space-grotesk text-slate-900 dark:text-white">
                              {pain.title || pain.description}
                            </p>
                            {pain.description ? (
                              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                                {pain.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {detail.painNarrative ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-white/70">{detail.painNarrative}</p>
                  ) : null}
                  {detail.painConclusion ? (
                    <p className="text-sm text-slate-900 dark:text-white">{detail.painConclusion}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                    >
                      <span>{detail.painCta || detailPage.contactCta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                <Image
                  src={showcaseImage}
                  alt={showcaseAlt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Qué incluye</p>
                <h2 className="mt-2 text-2xl font-space-grotesk">{detail.includesTitle || detailPage.deliverablesTitle}</h2>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {detail.deliverables.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {detail.steps?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.processTitle || 'Proceso'}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.processTitle || 'Proceso'}</h2>
                <div className="space-y-4">
                  {detail.steps.map((step, idx) => (
                    <div
                      key={`${step.title}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.processCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#projects`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <span>Ver portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {(detail.audience?.length || detail.internalLinks?.length) ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                {detail.audience?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Para Quién es este Servicio</h2>
                    <ul className="mt-5 space-y-3">
                      {detail.audience.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.internalLinks?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Explorá más servicios</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Interlinking</h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {detail.internalLinks.map((link, idx) => (
                        <Link
                          key={`${link.href}-${idx}`}
                          href={resolveInternalHref(link.href)}
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {detail.differentiators?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Ventajas clave</p>
                <h2 className="text-2xl font-space-grotesk">{detail.differentiatorsTitle}</h2>
                <div className="space-y-3">
                  {detail.differentiators.map((item, idx) => (
                    <div key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {detail.plans?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Elige tu plan</p>
                <h2 className="text-2xl font-space-grotesk">{detail.plansTitle}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {detail.plans.map((plan, idx) => (
                    <div
                      key={`${plan.name}-${idx}`}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-space-grotesk text-white">{plan.name}</p>
                        {plan.badge ? (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-amber-200">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{plan.description}</p>
                      {plan.note ? <p className="text-[12px] text-white/70">{plan.note}</p> : null}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.planCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.faqs?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.faqTitle}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.faqTitle || 'Preguntas Frecuentes (FAQ)'}</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq, idx) => (
                    <div key={`${faq.question}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm font-space-grotesk text-white">{faq.question}</p>
                      <p className="text-[13px] leading-relaxed text-[#8A99A8]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-24">
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border p-10 final-cta"
              style={{
                background: 'var(--service-final-bg)',
                borderColor: 'var(--service-final-border)',
                boxShadow: 'var(--service-final-shadow)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk text-slate-900 dark:text-white">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                    {detail.finalCtaSubtitle || detailPage.ctaSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.finalCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#services`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
                    style={{ borderColor: 'var(--service-final-border)' }}
                  >
                    <span>{detailPage.backToServices}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </TranslationProvider>
    );
  }

  if (serviceId === 'strategy') {
    const benefits = detail.benefits ?? [];
    const featuredBenefits = benefits.slice(0, 4);
    const benefitsVisual = service.imageSrc || '/gestock.png';
    const benefitsVisualAlt = service.imageAlt || showcaseAlt;
    const painEntries = (detail.painPoints ?? []).map((point) => {
      const [title, ...rest] = point.split(/—|→/).map((part) => part.trim()).filter(Boolean);
      return { title, description: rest.join(' — ') };
    });

    return (
      <TranslationProvider dictionary={dictionary}>
        <div
          className="service-page relative min-h-screen overflow-hidden font-geist-mono text-[var(--foreground)]"
          style={{ background: 'var(--background)' }}
        >
          {header}
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 40%, color-mix(in srgb, var(--background) 78%, transparent) 100%)',
            }}
          />
          <div
            className="absolute inset-0 blur-[80px] opacity-[0.1]"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 40% 30%, color-mix(in srgb, #4FD4E4 80%, var(--background) 20%) 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, color-mix(in srgb, #7B5CFB 80%, var(--background) 20%) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <main className="relative z-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

          <section className="relative overflow-hidden px-6 pt-32 pb-16">
            <CinematicAurora variant="hero" animated={false} />
            <div className="relative mx-auto max-w-7xl space-y-8">
              <Link
                href={`/${locale}#services`}
                className="inline-flex items-center gap-2 text-sm text-[#B5C1CE] transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailPage.backToServices}
              </Link>

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="relative grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-[32px] leading-[1.1] drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-[44px] font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-base leading-7 text-[#B5C1CE] md:text-[19px] md:leading-8">{detail.intro}</p>
                    <div className="relative w-full">
                      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" aria-hidden />
                        <div className="absolute -left-10 top-6 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden />
                        <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" aria-hidden />
                        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {[0, 1, 2].map((idx) => (
                            <div
                              key={`hero-strategy-image-${idx}`}
                              className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.08] ring-1 ring-white/10"
                            >
                              <Image
                                src={service.imageSrc || '/gestock.png'}
                                alt={showcaseAlt}
                                width={480}
                                height={360}
                                className="h-full w-full aspect-[4/3] object-cover"
                                priority={idx === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-space-grotesk text-white/85 transition hover:border-white/30 hover:bg-white/[0.1]"
                      >
                        <span>Ver portafolio (3 min)</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-xs text-white/65 md:text-sm">Sistemas a medida, datos centralizados y automatización real.</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {highlights.map((item, idx) => (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                        >
                          <div className="mt-1 text-white/80">{item.icon}</div>
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A99A8]">{item.label}</p>
                            <p className="text-sm text-white font-space-grotesk">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-8 md:grid-cols-[0.4fr,0.6fr] md:items-start md:gap-12 md:px-10 md:py-12 lg:grid-cols-[38%_1fr]">
                <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                <div className="relative order-1 w-full md:mx-auto lg:mx-0 lg:max-w-[420px]">
                  <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 rounded-[24px] border border-white/5 bg-white/[0.02]" aria-hidden />
                    <div className="absolute inset-4 rounded-[22px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-white/10">
                      <Image
                        src={benefitsVisual}
                        alt={benefitsVisualAlt}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative order-2 space-y-5 lg:space-y-6 lg:px-8">
                  <div className="relative space-y-2 rounded-[18px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                    <h2 className="text-[26px] font-space-grotesk leading-tight md:text-[30px]">{detail.benefitsTitle}</h2>
                    {detail.benefitsNarrative ? (
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE] md:text-sm">{detail.benefitsNarrative}</p>
                    ) : null}
                  </div>
                  <div className="pointer-events-none absolute -left-4 top-12 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {featuredBenefits.map((benefit, idx) => (
                      <div
                        key={`${benefit.title}-${idx}`}
                        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.35)]"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 80% 70%, rgba(123,92,251,0.14), transparent 36%)' }} />
                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 p-3 text-cyan-300 ring-1 ring-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.26)]">
                          <Sparkles className="h-[72px] w-[72px]" />
                        </div>
                        <div className="relative space-y-1.5">
                          <p className="text-[16px] font-space-grotesk text-white leading-tight">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {painEntries.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div
                className="relative mx-auto max-w-7xl space-y-8 overflow-hidden rounded-[28px] border p-10 pain-section"
                style={{
                  background: 'var(--service-pain-bg)',
                  borderColor: 'var(--service-pain-border)',
                  boxShadow: 'var(--service-pain-shadow)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[rgba(240,249,255,0.9)] via-[rgba(245,243,255,0.92)] to-[rgba(255,247,237,0.9)] dark:from-transparent dark:via-transparent dark:to-transparent"
                  aria-hidden
                />
                <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl dark:bg-rose-500/10" aria-hidden />
                <div className="absolute -right-8 bottom-6 h-52 w-52 rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-400/10" aria-hidden />
                <div className="relative space-y-4">
                  {detail.painIntro ? (
                    <p className="text-sm text-slate-700 dark:text-white/80">{detail.painIntro}</p>
                  ) : null}
                  <h2 className="text-[26px] leading-tight font-space-grotesk md:text-[30px] text-slate-900 dark:text-white">
                    {detail.painTitle}
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {painEntries.map((pain, idx) => (
                      <div
                        key={`${pain.title}-${idx}`}
                        className="rounded-2xl border bg-white/90 p-5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-black/35 dark:shadow-[0_14px_32px_rgba(0,0,0,0.26)] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-amber-600 ring-1 ring-slate-200 dark:text-amber-200 dark:ring-white/15">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-space-grotesk text-slate-900 dark:text-white">
                              {pain.title || pain.description}
                            </p>
                            {pain.description ? (
                              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                                {pain.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {detail.painNarrative ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-white/70">{detail.painNarrative}</p>
                  ) : null}
                  {detail.painConclusion ? (
                    <p className="text-sm text-slate-900 dark:text-white">{detail.painConclusion}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                    >
                      <span>{detail.painCta || detailPage.contactCta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                <Image
                  src={showcaseImage}
                  alt={showcaseAlt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Qué incluye</p>
                <h2 className="mt-2 text-2xl font-space-grotesk">{detail.includesTitle || detailPage.deliverablesTitle}</h2>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {detail.deliverables.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {detail.steps?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.processTitle || 'Proceso'}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.processTitle || 'Proceso'}</h2>
                <div className="space-y-4">
                  {detail.steps.map((step, idx) => (
                    <div
                      key={`${step.title}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.processCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#projects`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <span>Ver portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {(detail.audience?.length || detail.internalLinks?.length) ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                {detail.audience?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Para Quién es este Servicio</h2>
                    <ul className="mt-5 space-y-3">
                      {detail.audience.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.internalLinks?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Explorá más servicios</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Interlinking</h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {detail.internalLinks.map((link, idx) => (
                        <Link
                          key={`${link.href}-${idx}`}
                          href={resolveInternalHref(link.href)}
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {detail.differentiators?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Ventajas clave</p>
                <h2 className="text-2xl font-space-grotesk">{detail.differentiatorsTitle}</h2>
                <div className="space-y-3">
                  {detail.differentiators.map((item, idx) => (
                    <div key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-24">
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border p-10 final-cta"
              style={{
                background: 'var(--service-final-bg)',
                borderColor: 'var(--service-final-border)',
                boxShadow: 'var(--service-final-shadow)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk text-slate-900 dark:text-white">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                    {detail.finalCtaSubtitle || detailPage.ctaSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.finalCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#services`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
                    style={{ borderColor: 'var(--service-final-border)' }}
                  >
                    <span>{detailPage.backToServices}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </TranslationProvider>
    );
  }

  if (serviceId === 'marketing-digital') {
    const benefits = detail.benefits ?? [];
    const featuredBenefits = benefits.slice(0, 4);
    const benefitsVisual = service.imageSrc || '/pew.png';
    const benefitsVisualAlt = service.imageAlt || showcaseAlt;
    const painEntries = (detail.painPoints ?? []).map((point) => {
      const [title, ...rest] = point.split(/—|→/).map((part) => part.trim()).filter(Boolean);
      return { title, description: rest.join(' — ') };
    });
    const packages = marketingPackages[locale as 'es' | 'en'] ?? marketingPackages.es;
    const heroContent =
      locale === 'es'
        ? {
            badge: 'Marketing Digital Estratégico',
            title: 'Marketing que crece con intención.',
            subtitle: 'Estrategia, creatividad y datos alineados para generar crecimiento real y medible.',
            supporting: "No hacemos ‘solo redes’. Diseñamos sistemas de marketing que evolucionan con tu negocio.",
            primaryCta: 'Ver cómo trabajamos →',
            secondaryCta: 'Hablar de tu proyecto',
            dataLabel: 'Indicadores',
            perfLabel: 'Rendimiento',
            perfHint: 'continuo',
          }
        : {
            badge: 'Strategic Digital Marketing',
            title: 'Marketing that grows with intention.',
            subtitle: 'Strategy, creativity, and data aligned to drive real, measurable growth.',
            supporting: "We don’t do “just social”. We design marketing systems that evolve with your business.",
            primaryCta: 'See how we work →',
            secondaryCta: 'Talk about your project',
            dataLabel: 'Signals',
            perfLabel: 'Performance',
            perfHint: 'rolling',
          };

    return (
      <TranslationProvider dictionary={dictionary}>
        <div
          className="service-page relative min-h-screen overflow-hidden font-geist-mono text-[var(--foreground)]"
          style={{ background: 'var(--background)' }}
        >
          {header}
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 40%, color-mix(in srgb, var(--background) 78%, transparent) 100%)',
            }}
          />
          <div
            className="absolute inset-0 blur-[80px] opacity-[0.1]"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 40% 30%, color-mix(in srgb, #4FD4E4 80%, var(--background) 20%) 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, color-mix(in srgb, #7B5CFB 80%, var(--background) 20%) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <main className="relative z-10">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

          <section className="relative overflow-hidden px-6 pt-32 pb-16">
            <CinematicAurora variant="hero" animated={false} />
            <div className="relative z-10 mx-auto max-w-7xl space-y-8">
              <Link
                href={`/${locale}#services`}
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900 dark:text-white/70 dark:hover:text-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailPage.backToServices}
              </Link>

              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_24px_60px_rgba(0,0,0,0.34)] md:p-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.18] via-transparent to-transparent dark:from-white/[0.05]" aria-hidden />
                <div className="absolute -left-14 top-10 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl dark:bg-cyan-400/10" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-emerald-400/12 blur-3xl dark:bg-emerald-400/10" aria-hidden />

                <div className="relative grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:items-start">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-700 backdrop-blur-sm dark:border-white/12 dark:bg-white/10 dark:text-white/80 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700">
                      <Sparkles className="h-3.5 w-3.5 text-slate-700 dark:text-white/85" />
                      <span className="font-space-grotesk">{heroContent.badge}</span>
                    </div>

                    <h1 className="text-[34px] leading-[1.06] tracking-tight text-slate-900 dark:text-white md:text-[46px] font-space-grotesk motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-100">
                      {heroContent.title}
                    </h1>

                    <p className="text-base leading-7 text-slate-700 dark:text-white/75 md:text-[18px] md:leading-8 font-geist-mono motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-150">
                      {heroContent.subtitle}
                    </p>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-white/65 md:text-[15px] font-geist-mono motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-200">
                      {heroContent.supporting}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 motion-safe:delay-300">
                      <Link
                        href="#process"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-space-grotesk text-slate-900 transition hover:border-slate-400 hover:bg-white/85 dark:border-white/18 dark:bg-white/[0.06] dark:text-white/85 dark:hover:border-white/30 dark:hover:bg-white/[0.1]"
                      >
                        <span>{heroContent.primaryCta}</span>
                      </Link>
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:border-slate-400 hover:bg-white/85 dark:border-white/18 dark:bg-white/[0.06] dark:text-white/85 dark:hover:border-white/30 dark:hover:bg-white/[0.1]"
                      >
                        <span>{heroContent.secondaryCta}</span>
                      </Link>
                    </div>

                  </div>

                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/70 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)] motion-safe:animate-[heroFloat_14s_ease-in-out_infinite] motion-reduce:animate-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 dark:from-black/20 dark:to-black/55" aria-hidden />
                      <Image
                        src="/marketing%20background.jpg"
                        alt={locale === 'es' ? 'Fondo abstracto de marketing digital' : 'Abstract digital marketing background'}
                        width={1200}
                        height={900}
                        className="h-[220px] w-full object-cover md:h-[260px] lg:h-[280px]"
                        priority
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        aria-hidden
                        style={{
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                          opacity: 0.06,
                          mixBlendMode: 'overlay',
                        }}
                      />
                    </div>

                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/70 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_24px_60px_rgba(0,0,0,0.32)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-200">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.16] via-transparent to-transparent dark:from-white/[0.06]" aria-hidden />
                      <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-cyan-400/12 blur-3xl dark:bg-cyan-400/10" aria-hidden />
                      <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-emerald-400/12 blur-3xl dark:bg-emerald-400/10" aria-hidden />

                      <div className="relative space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/60">
                          {heroContent.dataLabel}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {highlights.slice(0, 2).map((item, idx) => (
                            <div
                              key={`${item.label}-${idx}`}
                              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-black/30"
                            >
                              <div className="mt-1 text-slate-700 dark:text-white/80">{item.icon}</div>
                              <div className="space-y-1">
                                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-[#8A99A8]">
                                  {item.label}
                                </p>
                                <p className="text-sm text-slate-900 dark:text-white font-space-grotesk">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-black/30">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-600 dark:text-white/55">
                              {heroContent.perfLabel}
                            </p>
                            <span className="text-[11px] text-slate-500 dark:text-white/45 font-geist-mono">
                              {heroContent.perfHint}
                            </span>
                          </div>
                          <div className="mt-3 h-20 w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white/70 to-transparent dark:border-white/10 dark:from-white/[0.06]">
                            <div className="relative h-full w-full">
                              <div className="absolute inset-0 opacity-70 [background:linear-gradient(90deg,rgba(34,211,238,0.0)_0%,rgba(34,211,238,0.16)_28%,rgba(16,185,129,0.18)_62%,rgba(96,165,250,0.12)_100%)]" />
                              <div className="absolute inset-0 opacity-40 [background:linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]" />
                              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {highlights.slice(2).map((item, idx) => (
                        <div
                          key={`${item.label}-${idx}`}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.02] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 motion-safe:delay-300"
                        >
                          <div className="mt-1 text-slate-700 dark:text-white/80">{item.icon}</div>
                          <div className="space-y-1">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-[#8A99A8]">
                              {item.label}
                            </p>
                            <p className="text-sm text-slate-900 dark:text-white font-space-grotesk">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-8 md:grid-cols-[0.4fr,0.6fr] md:items-start md:gap-12 md:px-10 md:py-12 lg:grid-cols-[38%_1fr]">
                <div className="absolute -left-6 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
                <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                <div className="relative order-1 w-full md:mx-auto lg:mx-0 lg:max-w-[420px]">
                  <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                  <div className="pointer-events-none absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 rounded-[24px] border border-white/5 bg-white/[0.02]" aria-hidden />
                    <div className="absolute inset-4 rounded-[22px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] ring-1 ring-white/10">
                      <Image
                        src={benefitsVisual}
                        alt={benefitsVisualAlt}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="relative order-2 space-y-5 lg:space-y-6 lg:px-8">
                  <div className="relative space-y-2 rounded-[18px]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                    <h2 className="text-[26px] font-space-grotesk leading-tight md:text-[30px]">{detail.benefitsTitle}</h2>
                    {detail.benefitsNarrative ? (
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE] md:text-sm">{detail.benefitsNarrative}</p>
                    ) : null}
                  </div>
                  <div className="pointer-events-none absolute -left-4 top-12 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
                  <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {featuredBenefits.map((benefit, idx) => (
                      <div
                        key={`${benefit.title}-${idx}`}
                        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.35)]"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(79,212,228,0.16), transparent 40%), radial-gradient(circle at 80% 70%, rgba(123,92,251,0.14), transparent 36%)' }} />
                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 p-3 text-cyan-300 ring-1 ring-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.26)]">
                          <Sparkles className="h-[72px] w-[72px]" />
                        </div>
                        <div className="relative space-y-1.5">
                          <p className="text-[16px] font-space-grotesk text-white leading-tight">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {painEntries.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div
                className="relative mx-auto max-w-7xl space-y-8 overflow-hidden rounded-[28px] border p-10 pain-section"
                style={{
                  background: 'var(--service-pain-bg)',
                  borderColor: 'var(--service-pain-border)',
                  boxShadow: 'var(--service-pain-shadow)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[rgba(240,249,255,0.9)] via-[rgba(245,243,255,0.92)] to-[rgba(255,247,237,0.9)] dark:from-transparent dark:via-transparent dark:to-transparent"
                  aria-hidden
                />
                <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl dark:bg-rose-500/10" aria-hidden />
                <div className="absolute -right-8 bottom-6 h-52 w-52 rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-400/10" aria-hidden />
                <div className="relative space-y-4">
                  {detail.painIntro ? (
                    <p className="text-sm text-slate-700 dark:text-white/80">{detail.painIntro}</p>
                  ) : null}
                  <h2 className="text-[26px] leading-tight font-space-grotesk md:text-[30px] text-slate-900 dark:text-white">
                    {detail.painTitle}
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {painEntries.map((pain, idx) => (
                      <div
                        key={`${pain.title}-${idx}`}
                        className="rounded-2xl border bg-white/90 p-5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/12 dark:bg-black/35 dark:shadow-[0_14px_32px_rgba(0,0,0,0.26)] dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-amber-600 ring-1 ring-slate-200 dark:text-amber-200 dark:ring-white/15">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-space-grotesk text-slate-900 dark:text-white">
                              {pain.title || pain.description}
                            </p>
                            {pain.description ? (
                              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                                {pain.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {detail.painNarrative ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-white/70">{detail.painNarrative}</p>
                  ) : null}
                  {detail.painConclusion ? (
                    <p className="text-sm text-slate-900 dark:text-white">{detail.painConclusion}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-space-grotesk text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.42)]"
                    >
                      <span>{detail.painCta || detailPage.contactCta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                <Image
                  src={showcaseImage}
                  alt={showcaseAlt}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {packages.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Qué incluye</p>
                <h2 className="mt-2 text-2xl font-space-grotesk">{detail.includesTitle || detailPage.deliverablesTitle}</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
                    >
                      <h3 className="text-lg font-semibold text-white">{pkg.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{pkg.subtitle}</p>
                      <p className="mt-3 text-sm text-white/80">{pkg.description}</p>
                      <ul className="mt-4 space-y-2 text-sm text-white/80">
                        {pkg.bullets.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-cyan-300">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {detail.steps?.length ? (
            <section id="process" className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.processTitle || 'Proceso'}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.processTitle || 'Proceso'}</h2>
                <div className="space-y-4">
                  {detail.steps.map((step, idx) => (
                    <div
                      key={`${step.title}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.processCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#projects`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <span>Ver portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {(detail.audience?.length || detail.internalLinks?.length) ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                {detail.audience?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Para Quién es este Servicio</h2>
                    <ul className="mt-5 space-y-3">
                      {detail.audience.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {detail.internalLinks?.length ? (
                  <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Explorá más servicios</p>
                    <h2 className="mt-2 text-2xl font-space-grotesk">Interlinking</h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {detail.internalLinks.map((link, idx) => (
                        <Link
                          key={`${link.href}-${idx}`}
                          href={resolveInternalHref(link.href)}
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {detail.differentiators?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-7xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Ventajas clave</p>
                <h2 className="text-2xl font-space-grotesk">{detail.differentiatorsTitle}</h2>
                <div className="space-y-3">
                  {detail.differentiators.map((item, idx) => (
                    <div key={`${item}-${idx}`} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative overflow-hidden px-6 pb-24">
            <div
              className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border p-10 final-cta"
              style={{
                background: 'var(--service-final-bg)',
                borderColor: 'var(--service-final-border)',
                boxShadow: 'var(--service-final-shadow)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk text-slate-900 dark:text-white">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-[#B5C1CE]">
                    {detail.finalCtaSubtitle || detailPage.ctaSubtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.finalCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}#services`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-space-grotesk text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15"
                    style={{ borderColor: 'var(--service-final-border)' }}
                  >
                    <span>{detailPage.backToServices}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </TranslationProvider>
    );
  }

  return (
    <TranslationProvider dictionary={dictionary}>
      {header}
    <div className="relative min-h-screen overflow-hidden bg-[#000000] text-white font-geist-mono">
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

      <main className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <section className="relative overflow-hidden px-6 pt-28 pb-16">
          <CinematicAurora variant="hero" animated={false} />
          <div className="relative mx-auto max-w-5xl space-y-8">
            <Link
              href={`/${locale}#services`}
              className="inline-flex items-center gap-2 text-sm text-[#B5C1CE] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {detailPage.backToServices}
            </Link>

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="font-space-grotesk">{detail.eyebrow}</span>
                </div>
                <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                  {service.title}
                </h1>
                <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {highlights.map((item, idx) => (
                    <div
                      key={`${item.label}-${idx}`}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                      <div className="mt-1 text-white/80">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A99A8]">{item.label}</p>
                        <p className="text-sm text-white font-space-grotesk">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-16">
          <CinematicAurora variant="section" animated={false} />
          <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.outcomesTitle}</p>
              <h2 className="mt-2 text-2xl font-space-grotesk">{service.title}</h2>
              <ul className="mt-5 space-y-4">
                {detail.outcomes.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.processTitle}</p>
              <h2 className="mt-2 text-2xl font-space-grotesk">{detail.eyebrow}</h2>
              <div className="mt-5 space-y-4">
                {detail.steps.map((step, idx) => (
                  <div
                    key={`${step.title}-${idx}`}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-space-grotesk text-white">{step.title}</p>
                      <p className="text-[13px] leading-relaxed text-[#8A99A8]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-16">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" aria-hidden />
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
              <Image
                src={showcaseImage}
                alt={showcaseAlt}
                width={1200}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {(detail.audience?.length || detail.examples?.length || detail.englishVersion || detail.instagramSlides?.length) && (
          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
              {detail.audience?.length ? (
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.audienceTitle}</p>
                  <h2 className="mt-2 text-2xl font-space-grotesk">{service.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {detail.audience.map((item, idx) => (
                      <li key={`${item}-${idx}`} className="flex gap-3 text-[14px] leading-relaxed text-[#B5C1CE]">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {detail.examples?.length ? (
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.examplesTitle}</p>
                  <h2 className="mt-2 text-2xl font-space-grotesk">{service.title}</h2>
                  <div className="mt-5 space-y-4">
                    {detail.examples.map((example, idx) => (
                      <div key={`${example.title}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-sm font-space-grotesk text-white">{example.title}</p>
                        <p className="text-[13px] leading-relaxed text-[#8A99A8]">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {detail.englishVersion ? (
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.englishVersionTitle}</p>
                  <h2 className="mt-2 text-2xl font-space-grotesk">{detail.englishVersion.title}</h2>
                  {detail.englishVersion.intro ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-[#8A99A8]">{detail.englishVersion.intro}</p>
                  ) : null}
                  <ul className="mt-4 space-y-3">
                    {detail.englishVersion.bullets.map((item, idx) => (
                      <li key={`${item}-${idx}`} className="flex gap-3 text-[13px] leading-relaxed text-[#B5C1CE]">
                        <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {detail.instagramSlides?.length ? (
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.instagramTitle}</p>
                  <h2 className="mt-2 text-2xl font-space-grotesk">IG / Stories</h2>
                  <div className="mt-5 space-y-4">
                    {detail.instagramSlides.map((slide, idx) => (
                      <div key={`${slide.title}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-sm font-space-grotesk text-white">{`Slide ${idx + 1}: ${slide.title}`}</p>
                        {slide.bullets?.length ? (
                          <ul className="mt-2 space-y-2">
                            {slide.bullets.map((line, subIdx) => (
                              <li key={`${line}-${subIdx}`} className="text-[13px] leading-relaxed text-[#8A99A8]">
                                {line}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {detail.pitch ? (
          <section className="relative overflow-hidden px-6 pb-16">
            <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.pitchTitle}</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{detail.pitch}</p>
            </div>
          </section>
        ) : null}

        <section className="relative overflow-hidden px-6 pb-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">{detailPage.ctaTitle}</p>
                <h3 className="text-2xl font-space-grotesk">{service.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detailPage.ctaSubtitle}</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                >
                  <span>{detailPage.contactCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${locale}#services`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                >
                  <span>{detailPage.backToServices}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </TranslationProvider>
  );
}
