import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raíz Digital — Base Template",
  description:
    "Plantilla Next.js + Tailwind + shadcn/ui + Framer para landings rápidas.",
  metadataBase: new URL("https://example.com"), // luego lo cambias por proyecto
  openGraph: {
    title: "Raíz Digital — Base Template",
    description: "Plantilla para proyectos web claros y minimalistas.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630 }],
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
