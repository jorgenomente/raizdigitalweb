import { notFound } from "next/navigation";
import { type Locale, locales } from "./dictionaries";

export type RawLocaleParams = { locale?: string | null };
export type LocaleParams = Promise<RawLocaleParams>;

export function ensureLocale(
  params?: RawLocaleParams | null,
): Locale {
  if (!params?.locale) {
    notFound();
  }

  const locale = params.locale;

  if (!locales.some((available) => available === locale)) {
    notFound();
  }

  return locale as Locale;
}
