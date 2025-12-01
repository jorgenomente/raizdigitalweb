'use client';

import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import { TranslationProvider } from "@/components/providers/translation-provider";
import { CosmicPage } from "@/components/cosmic/page";

export function PageClient({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <TranslationProvider dictionary={dictionary}>
      <CosmicPage locale={locale} />
    </TranslationProvider>
  );
}
