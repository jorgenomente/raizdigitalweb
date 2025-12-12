import type { MetadataRoute } from "next";
import {
  defaultLocale,
  getServiceSlug,
  locales,
  serviceIds,
} from "@/lib/i18n/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicst.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split("T")[0];
  type SitemapEntry = MetadataRoute.Sitemap[number];

  const localeAlternates = {
    es: `${SITE_URL}/es`,
    en: `${SITE_URL}/en`,
    "x-default": `${SITE_URL}/`,
  };

  const rootEntries: SitemapEntry[] = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: localeAlternates },
    },
    ...locales.map<SitemapEntry>((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: localeAlternates },
    })),
  ];

  const serviceEntries: SitemapEntry[] = locales.flatMap((locale) =>
    serviceIds.map<SitemapEntry>((serviceId) => {
      const slug = getServiceSlug(locale, serviceId);
      const localizedUrls = Object.fromEntries(
        locales.map((lang) => [
          lang,
          `${SITE_URL}/${lang}/services/${getServiceSlug(lang, serviceId)}`,
        ])
      );

      return {
        url: `${SITE_URL}/${locale}/services/${slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            ...localizedUrls,
            "x-default": localizedUrls[defaultLocale],
          },
        },
      };
    })
  );

  return [...rootEntries, ...serviceEntries];
}
