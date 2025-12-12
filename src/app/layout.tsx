import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { cookies } from "next/headers";
import { defaultLocale, locales } from "@/lib/i18n/dictionaries";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/geist/Geist-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/geist-mono/GeistMono-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/space-grotesk/SpaceGrotesk-VariableFont_wght.ttf",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicst.dev"),
  title: {
    default: "Cosmic Studio | Branding, diseño web y desarrollo a medida",
    template: "%s | Cosmic Studio",
  },
  description:
    "Agencia digital y estudio creativo. Branding profesional, diseño web, ecommerce, sistemas a medida y marketing estratégico en ES/EN.",
  openGraph: {
    type: "website",
    siteName: "Cosmic Studio",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicst.dev",
    images: [
      {
        url: "/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png",
        width: 1200,
        height: 630,
        alt: "Cosmic Studio - branding, diseño web y sistemas digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Studio | Branding, diseño web y desarrollo",
    description: "Estudio creativo bilingüe: branding profesional, diseño web, ecommerce y sistemas digitales a medida.",
    images: ["/cosmic/src/assets/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const lang = locales.includes(cookieLocale as (typeof locales)[number]) ? (cookieLocale as string) : defaultLocale;

  return (
    <html lang={lang} className="dark">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MQX6730RJV" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MQX6730RJV');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
