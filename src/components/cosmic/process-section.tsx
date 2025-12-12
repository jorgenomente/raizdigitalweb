import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ProcessSection({
  process,
  colors,
  isDark,
}: {
  process: Dictionary["process"];
  colors: { mutedText: string; cardBorder: string };
  isDark: boolean;
}) {
  return (
    <section
      id="process"
      className="relative overflow-hidden px-6 py-32"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle at 22% 18%, rgba(79,212,228,0.2), transparent 32%), radial-gradient(circle at 78% 62%, rgba(168,85,247,0.18), transparent 32%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-6">
            <p className="text-[12px] font-geist-mono uppercase tracking-[0.32em] text-slate-500 dark:text-slate-300">
              {process.eyebrow}
            </p>
            <h2 className="text-4xl leading-tight tracking-tight font-space-grotesk text-slate-900 dark:text-white sm:text-5xl">
              {process.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {process.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group flex items-start gap-3 rounded-2xl border bg-white/70 px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/5"
                  style={{ borderColor: colors.cardBorder }}
                >
                  <div className="relative h-11 w-11 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/90 via-[#6366F1]/80 to-purple-600/80 text-sm font-semibold text-white">
                    <span className="relative z-10">0{index + 1}</span>
                    {/* Reemplazar con iconografía Cosmic personalizada (Diagnóstico, Diseño, Desarrollo, Entrega, Soporte) */}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed font-geist-mono"
                      style={{ color: colors.mutedText }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[32px] border shadow-[0_22px_60px_rgba(0,0,0,0.14)]"
              style={{
                borderColor: colors.cardBorder,
                background: isDark
                  ? "linear-gradient(135deg, rgba(18,25,46,0.92), rgba(56,32,74,0.85))"
                  : "linear-gradient(135deg, rgba(18,25,46,0.16), rgba(56,32,74,0.2))",
              }}
              role="img"
              aria-label={process.editorialAlt}
            >
              <div className="aspect-[4/5] w-full bg-gradient-to-b from-[#0f1a2e] via-[#1f2646] to-[#2f315b]">
                {/* Placeholder editorial abstract:
                    Reemplazar con imagen estática o <Image /> (ej: /public/images/process-editorial.jpg)
                    Referencias: "abstract workflow concept minimal", "gradient flow abstract", "light path abstract futuristic", "engranajes abstractos" */}
              </div>
            </div>
            <div className="absolute left-6 top-6 hidden rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-geist-mono tracking-[0.12em] uppercase text-white/80 backdrop-blur md:block">
              Flujo ordenado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
