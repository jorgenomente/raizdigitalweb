import type { MetadataRoute } from "next";
import { locales, serviceIds } from "@/lib/i18n/dictionaries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thecosmicstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const rootEntries = [
    { url: `${SITE_URL}/`, lastModified: now },
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
    })),
  ];

  const serviceEntries = locales.flatMap((locale) =>
    serviceIds.map((serviceId) => ({
      url: `${SITE_URL}/${locale}/services/${serviceId}`,
      lastModified: now,
    }))
  );

  return [...rootEntries, ...serviceEntries];
}
