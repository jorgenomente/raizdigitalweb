'use client';

import Image from "next/image";
import type { Dictionary, Locale, SectionId } from "@/lib/i18n/dictionaries";
import { TranslationProvider } from "@/components/providers/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Projects } from "@/components/sections/projects";
import { Team } from "@/components/sections/team";
import { ContactSection } from "@/components/sections/contact-section";

export function PageClient({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const navItems: Array<{ id: SectionId; label: string }> = [
    { id: "hero", label: dictionary.navigation.hero },
    { id: "manifesto", label: dictionary.navigation.manifesto },
    { id: "services", label: dictionary.navigation.services },
    { id: "projects", label: dictionary.navigation.projects },
    { id: "team", label: dictionary.navigation.team },
    { id: "contact", label: dictionary.navigation.contact },
  ];

  return (
    <TranslationProvider dictionary={dictionary}>
      <div className="min-h-screen bg-[#111418] text-white antialiased">
        <div className="sticky top-0 z-20 bg-gradient-to-b from-[#111418]/95 via-[#111418]/60 to-transparent px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/logo2.png"
                alt="Logo Raíz Digital"
                width={160}
                height={48}
                priority
                className="h-8 w-auto"
              />
              <div className="md:hidden">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
            <nav
              aria-label="Primary"
              className="flex w-full flex-wrap items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#AAB7C4] sm:text-[0.75rem] md:flex-1"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111418]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>
        <Hero />
        <Manifesto />
        <ServicesGrid />
        <Projects />
        <Team />
        <ContactSection />
      </div>
    </TranslationProvider>
  );
}
