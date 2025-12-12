import type { Dictionary } from "@/lib/i18n/dictionaries";
import Image from "next/image";

export function AboutCosmicStudioSection({
  about,
  colors,
  isDark,
}: {
  about: Dictionary["about"];
  colors: { mutedText: string };
  isDark: boolean;
}) {
  return (
    <section
      id="about"
      className="relative px-6 py-24 lg:py-28"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <p className="text-[12px] font-geist-mono uppercase tracking-[0.32em] text-slate-500 dark:text-slate-300">
              {about.eyebrow}
            </p>
            <h2 className="text-4xl leading-tight tracking-tight font-space-grotesk text-slate-900 dark:text-white sm:text-5xl">
              {about.title}
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed font-geist-mono"
              style={{ color: colors.mutedText }}
            >
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(28,31,58,0.9), rgba(67,43,99,0.7))"
                  : "linear-gradient(135deg, rgba(28,31,58,0.12), rgba(67,43,99,0.18))",
              }}
            >
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1c1f3a] via-[#282a4f] to-[#432b63]" />
                <Image
                  src="/quienes-somos-b.jpg"
                  alt={about.studioAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-7 right-4 w-40 overflow-hidden rounded-2xl border border-white/10 bg-white/80 backdrop-blur dark:bg-background/80 md:right-6 md:w-52">
              <div className="relative aspect-video bg-muted">
                <Image
                  src="/quienes-somos.jpg"
                  alt={about.abstractAlt}
                  fill
                  sizes="(min-width: 768px) 208px, 160px"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {about.studioCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
