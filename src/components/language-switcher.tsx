'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useDictionary } from "@/components/providers/translation-provider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { locales } from "@/lib/i18n/dictionaries";

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
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#AAB7C4]">
      <span className="text-[#AAB7C4]/80">
        {dictionary.languageSwitcher.label}
      </span>
      <div className="flex items-center gap-2">
        {locales.map((candidate) => {
          const isActive = candidate === locale;
          const languageCopy = dictionary.languageSwitcher.languages[candidate];

          return (
            <Link
              key={candidate}
              href={createHref(candidate)}
              aria-label={languageCopy.label}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-1 transition-colors ${
                isActive
                  ? "border-white/70 bg-white/20 text-white"
                  : "border-white/10 text-[#AAB7C4] hover:border-white/40 hover:text-white"
              }`}
            >
              {languageCopy.short}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
