'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useDictionary } from "@/components/providers/translation-provider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { locales } from "@/lib/i18n/dictionaries";

const localeFlags: Record<Locale, string> = {
  es: "🇦🇷",
  en: "🇺🇸",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const pathname = usePathname();

  const segments = useMemo(() => {
    const pathSegments = pathname?.split("/").filter(Boolean) ?? [];
    if (pathSegments.length === 0) {
      return [locale];
    }
    return pathSegments;
  }, [pathname, locale]);

  const createHref = (targetLocale: Locale) => {
    if (segments.length === 0) {
      return `/${targetLocale}`;
    }

    const updatedSegments = [...segments];
    updatedSegments[0] = targetLocale;
    return `/${updatedSegments.join("/")}`;
  };

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#AAB7C4]">
      {locales.map((candidate) => {
        const isActive = candidate === locale;
        const languageCopy = dictionary.languageSwitcher.languages[candidate];
        const flag = localeFlags[candidate] ?? "";

        return (
          <Link
            key={candidate}
            href={createHref(candidate)}
            aria-label={languageCopy.label}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 transition-colors ${
              isActive
                ? "border-white/70 bg-white/20 text-white"
                : "border-white/10 text-[#AAB7C4] hover:border-white/40 hover:text-white"
            }`}
          >
            <span className="text-base leading-none">{flag}</span>
            <span>{languageCopy.short}</span>
          </Link>
        );
      })}
    </div>
  );
}
