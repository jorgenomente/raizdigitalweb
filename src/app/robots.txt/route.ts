import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicst.dev";

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
