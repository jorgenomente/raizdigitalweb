import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/dictionaries";

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const languages = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const lang of languages) {
    const base = lang.split("-")[0];
    const match = locales.find((locale) => locale === lang || locale === base);
    if (match) {
      return match;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some((locale) =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    const locale = pathname.split("/")[1] || defaultLocale;
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return response;
  }

  const locale = getPreferredLocale(request);
  const localePrefix = pathname === "/" ? "" : pathname;
  const url = new URL(`/${locale}${localePrefix}`, request.url);
  url.search = request.nextUrl.search;

  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
