import { PageClient } from "@/components/page-client";
import {
  getDictionary,
  locales,
} from "@/lib/i18n/dictionaries";
import { ensureLocale, type LocaleParams } from "@/lib/i18n/locale";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: LocaleParams;
}) {
  const locale = ensureLocale(await params);
  const dictionary = getDictionary(locale);

  return <PageClient locale={locale} dictionary={dictionary} />;
}
