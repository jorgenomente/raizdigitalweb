import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raíz Digital — Base Template",
  description:
    "Diseñamos sitios web, identidades y sistemas digitales que integran estrategia, diseño y tecnología para lograr resultados reales.",
  metadataBase: new URL("https://example.com"), // luego lo cambias por proyecto
  openGraph: {
    title: "Raíz Digital — Base Template",
    description:
      "Diseñamos sitios web, identidades y sistemas digitales que integran estrategia, diseño y tecnología para lograr resultados reales.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630 }],
    type: "website",
  },
  icons: { icon: "/favicon2.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-[#0E1C26] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
