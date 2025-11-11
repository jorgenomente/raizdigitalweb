import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#0E1C26] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
