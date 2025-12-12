import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defaultLocale, getDictionary } from "@/lib/i18n/dictionaries";
import { ensureLocale, type LocaleParams } from "@/lib/i18n/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicst.dev";
const METADATA_BASE = new URL(SITE_URL);
const OPEN_GRAPH_IMAGE = {
  url: "/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png",
  width: 1200,
  height: 630,
};

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = ensureLocale(await params);
  const dictionary = getDictionary(locale);
  const canonicalPath = locale === defaultLocale ? "/" : `/${locale}`;

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    metadataBase: METADATA_BASE,
    openGraph: {
      title: dictionary.metadata.ogTitle,
      description: dictionary.metadata.ogDescription,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "Cosmic Studio",
      images: [OPEN_GRAPH_IMAGE],
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.ogTitle,
      description: dictionary.metadata.ogDescription,
      images: [OPEN_GRAPH_IMAGE],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: LocaleParams;
}) {
  const locale = ensureLocale(await params);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cosmic Studio",
    url: `${SITE_URL}${locale === defaultLocale ? "" : `/${locale}`}`,
    logo: `${SITE_URL}/favicon.png`,
    sameAs: [
      "https://cosmicst.dev",
      "https://www.linkedin.com/company/cosmic-st/",
      "https://www.instagram.com/cosmicst.dev",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        areaServed: ["AR", "US", "ES"],
        availableLanguage: ["es", "en"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </>
  );
}
