import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock3, Sparkles, Wallet } from 'lucide-react';
import type { ReactElement } from 'react';
import { CinematicAurora } from '@/components/cosmic/cinematic-aurora';
import { getDictionary, locales, serviceIds, type ServiceId } from '@/lib/i18n/dictionaries';
import { ensureLocale } from '@/lib/i18n/locale';

type ServicePageParams = Promise<{ locale?: string | null; serviceId?: string | null }>;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thecosmicstudio.com';
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
  const serviceId = ensureServiceId(resolved.serviceId);

  return { locale, serviceId };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceIds.map((serviceId) => ({ locale, serviceId })));
}

export async function generateMetadata({ params }: { params: ServicePageParams }): Promise<Metadata> {
  const { locale, serviceId } = await resolveParams(params);
  const dictionary = getDictionary(locale);
  const service = dictionary.services.items[serviceId];
  const detail = dictionary.services.details[serviceId];

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
      images: [OPEN_GRAPH_IMAGE],
      type: 'website',
      locale,
    },
    alternates: {
      canonical: `/${locale}/services/${serviceId}`,
      languages: {
        es: `/es/services/${serviceId}`,
        en: `/en/services/${serviceId}`,
      },
    },
    icons: { icon: '/favicon2.png' },
  };
}

export default async function ServicePage({ params }: { params: ServicePageParams }) {
  const { locale, serviceId } = await resolveParams(params);
  const dictionary = getDictionary(locale);
  const service = dictionary.services.items[serviceId];
  const detail = dictionary.services.details[serviceId];

  if (!service || !detail) {
    notFound();
  }

  const { detailPage, keyBenefitLabel } = dictionary.services;

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
    if (href.startsWith('http')) return href;
    if (href.startsWith('#')) return `/${locale}${href}`;
    if (href.startsWith('/')) return `/${locale}${href}`;
    return `/${locale}/${href}`;
  };

  if (serviceId === 'branding-identidad-visual') {
    return (
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
                <div className="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                      >
                        <span>{detail.heroCta || detail.benefitsCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                      >
                        <span>Ver ejemplos</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
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
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.benefitsTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.benefits.map((benefit, idx) => (
                    <div
                      key={`${benefit.title}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-2 text-cyan-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-space-grotesk text-white">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
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
                    <span>{detail.benefitsCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#1b0f1f] via-[#0f1428] to-[#0d0a1a] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.painIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.painTitle}</h2>
                <div className="space-y-3">
                  {detail.painPoints.map((pain, idx) => (
                    <div key={`${pain}-${idx}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mt-0.5 text-amber-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{pain}</p>
                    </div>
                  ))}
                </div>
                {detail.painConclusion ? <p className="text-sm text-white">{detail.painConclusion}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.painCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

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

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detail.finalCtaSubtitle || detailPage.ctaSubtitle}</p>
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
    );
  }

  if (serviceId === 'landing') {
    return (
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
                <div className="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                      >
                        <span>Ver ejemplos</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
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
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.benefitsTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.benefits.map((benefit, idx) => (
                    <div
                      key={`${benefit.title}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-2 text-cyan-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-space-grotesk text-white">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
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
                    <span>{detail.benefitsCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#1b0f1f] via-[#0f1428] to-[#0d0a1a] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                {detail.painIntro ? <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.painIntro}</p> : null}
                <h2 className="text-2xl font-space-grotesk">{detail.painTitle}</h2>
                <div className="space-y-3">
                  {detail.painPoints.map((pain, idx) => (
                    <div key={`${pain}-${idx}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mt-0.5 text-amber-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{pain}</p>
                    </div>
                  ))}
                </div>
                {detail.painConclusion ? <p className="text-sm text-white">{detail.painConclusion}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.painCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

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

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detail.finalCtaSubtitle || detailPage.ctaSubtitle}</p>
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
    );
  }

  if (serviceId === 'ecommerce-profesional') {
    return (
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
                <div className="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                      >
                        <span>Ver ejemplos</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
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
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.benefitsTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.benefits.map((benefit, idx) => (
                    <div
                      key={`${benefit.title}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-2 text-cyan-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-space-grotesk text-white">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
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
                    <span>{detail.benefitsCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#1b0f1f] via-[#0f1428] to-[#0d0a1a] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                {detail.painIntro ? <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.painIntro}</p> : null}
                <h2 className="text-2xl font-space-grotesk">{detail.painTitle}</h2>
                <div className="space-y-3">
                  {detail.painPoints.map((pain, idx) => (
                    <div key={`${pain}-${idx}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mt-0.5 text-amber-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{pain}</p>
                    </div>
                  ))}
                </div>
                {detail.painConclusion ? <p className="text-sm text-white">{detail.painConclusion}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.painCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

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

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detail.finalCtaSubtitle || detailPage.ctaSubtitle}</p>
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
    );
  }

  if (serviceId === 'strategy') {
    return (
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
                <div className="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                      >
                        <span>Ver ejemplos</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
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
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.benefitsTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.benefits.map((benefit, idx) => (
                    <div
                      key={`${benefit.title}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-2 text-cyan-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-space-grotesk text-white">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
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
                    <span>{detail.benefitsCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#1b0f1f] via-[#0f1428] to-[#0d0a1a] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                {detail.painIntro ? <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.painIntro}</p> : null}
                <h2 className="text-2xl font-space-grotesk">{detail.painTitle}</h2>
                <div className="space-y-3">
                  {detail.painPoints.map((pain, idx) => (
                    <div key={`${pain}-${idx}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mt-0.5 text-amber-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{pain}</p>
                    </div>
                  ))}
                </div>
                {detail.painConclusion ? <p className="text-sm text-white">{detail.painConclusion}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.painCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

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

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detail.finalCtaSubtitle || detailPage.ctaSubtitle}</p>
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
    );
  }

  if (serviceId === 'marketing-digital') {
    return (
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
                <div className="relative grid gap-6 md:grid-cols-[2fr,1fr] md:items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="font-space-grotesk">{detail.eyebrow}</span>
                    </div>
                    <h1 className="text-4xl leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] md:text-5xl font-space-grotesk">
                      {service.title}
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#B5C1CE] md:text-lg">{detail.intro}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                      >
                        <span>{detail.heroCta || detailPage.contactCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${locale}#projects`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-space-grotesk text-white transition hover:border-white/40 hover:bg-white/15"
                      >
                        <span>Ver ejemplos</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
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
                    <p className="text-sm text-[#8A99A8]">{detail.ctaNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {detail.benefits?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <CinematicAurora variant="section" animated={false} />
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.benefitsIntro}</p>
                <h2 className="text-2xl font-space-grotesk">{detail.benefitsTitle}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.benefits.map((benefit, idx) => (
                    <div
                      key={`${benefit.title}-${idx}`}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-white/10 p-2 text-cyan-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-space-grotesk text-white">{benefit.title}</p>
                          <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{benefit.description}</p>
                        </div>
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
                    <span>{detail.benefitsCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {detail.painPoints?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-gradient-to-r from-[#1b0f1f] via-[#0f1428] to-[#0d0a1a] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                {detail.painIntro ? <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detail.painIntro}</p> : null}
                <h2 className="text-2xl font-space-grotesk">{detail.painTitle}</h2>
                <div className="space-y-3">
                  {detail.painPoints.map((pain, idx) => (
                    <div key={`${pain}-${idx}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mt-0.5 text-amber-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#B5C1CE]">{pain}</p>
                    </div>
                  ))}
                </div>
                {detail.painConclusion ? <p className="text-sm text-white">{detail.painConclusion}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-space-grotesk text-black shadow-[0_16px_30px_rgba(0,0,0,0.3)] transition hover:translate-y-[-1px]"
                  >
                    <span>{detail.painCta || detailPage.contactCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

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

          {detail.deliverables?.length ? (
            <section className="relative overflow-hidden px-6 pb-16">
              <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
              <div className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
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
              <div className="relative mx-auto max-w-5xl space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
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
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#101828] via-[#0c1224] to-[#0a0f1e] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,212,228,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.08),transparent_30%)]" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">CTA Final</p>
                  <h3 className="text-2xl font-space-grotesk">{detail.finalCtaTitle || service.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#B5C1CE]">{detail.finalCtaSubtitle || detailPage.ctaSubtitle}</p>
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
    );
  }

  return (
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
  );
}
