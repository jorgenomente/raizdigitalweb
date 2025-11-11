import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ensureLocale, type LocaleParams } from "@/lib/i18n/locale";

const METADATA_BASE = new URL("https://thecosmicstudio.com");
const OPEN_GRAPH_IMAGE = { url: "/og-cover.png", width: 1200, height: 630 };

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = ensureLocale(await params);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    metadataBase: METADATA_BASE,
    openGraph: {
      title: dictionary.metadata.ogTitle,
      description: dictionary.metadata.ogDescription,
      images: [OPEN_GRAPH_IMAGE],
      type: "website",
      locale,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    icons: { icon: "/favicon2.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: LocaleParams;
}) {
  ensureLocale(await params);

  return <>{children}</>;
}
