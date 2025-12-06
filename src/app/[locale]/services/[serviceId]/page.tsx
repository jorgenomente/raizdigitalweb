import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Sparkles, Wallet } from 'lucide-react';
import type { ReactElement } from 'react';
import { CinematicAurora } from '@/components/cosmic/cinematic-aurora';
import { getDictionary, locales, serviceIds, type ServiceId } from '@/lib/i18n/dictionaries';
import { ensureLocale } from '@/lib/i18n/locale';

type ServicePageParams = Promise<{ locale?: string | null; serviceId?: string | null }>;

const METADATA_BASE = new URL('https://thecosmicstudio.com');
const OPEN_GRAPH_IMAGE = { url: '/og-cover.png', width: 1200, height: 630 };

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

  const description = detail.intro || service.description;

  return {
    title: `${service.title} | ${dictionary.metadata.title}`,
    description,
    metadataBase: METADATA_BASE,
    openGraph: {
      title: `${service.title} | ${dictionary.metadata.ogTitle}`,
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
          <div className="relative mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">{detailPage.deliverablesTitle}</p>
            <h2 className="mt-2 text-2xl font-space-grotesk">{service.title}</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {detail.deliverables.map((deliverable, idx) => (
                <div
                  key={`${deliverable}-${idx}`}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-300" />
                  <p className="text-sm leading-relaxed text-[#B5C1CE]">{deliverable}</p>
                </div>
              ))}
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
