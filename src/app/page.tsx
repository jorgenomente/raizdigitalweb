'use client';

// Raíz Digital — Landing minimal clara/tecnológica (low‑cost)
// ❖ Stack: Next.js 15 (App Router) + Tailwind + Framer Motion + Formspree
// ❖ Uso: este archivo exporta un componente React que podrás portar a /app/page.tsx
// ❖ Tip: en Vercel (free), Formspree (free) y dominio cuando haya presupuesto.

import { useState } from "react";
import { motion } from "framer-motion";

export default function RaizDigitalLanding() {
  return (
    <div className="min-h-[100dvh] bg-white text-slate-900 antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Philosophy />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ===================== HEADER ===================== */
function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-semibold tracking-tight">Raíz Digital</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a className="hover:text-slate-900 transition" href="#servicios">Servicios</a>
          <a className="hover:text-slate-900 transition" href="#proceso">Proceso</a>
          <a className="hover:text-slate-900 transition" href="#filosofia">Filosofía</a>
        </nav>
        <a href="#contacto" className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition">
          Hablemos
        </a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="grid place-items-center size-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm">
      <span className="text-[10px] font-bold">RD</span>
    </div>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-emerald-100 blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 size-[420px] rounded-full bg-slate-100 blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 items-center gap-10">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700/80 font-medium">Marketing consciente · Diseño & código</p>
          <h1 className="mt-3 text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">
            Experiencias digitales claras, <span className="text-emerald-600">minimalistas</span> y efectivas
          </h1>
          <p className="mt-4 text-slate-600 max-w-prose">
            Creamos páginas web, e‑commerce y sistemas que ordenan procesos y elevan tu marca. Estética cuidada, performance web y enfoque humano.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contacto" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-emerald-700 transition">Quiero mi web</a>
            <a href="#servicios" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-3 text-slate-900 font-medium hover:bg-slate-50 transition">Ver servicios</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="md:justify-self-end w-full">
          <div className="relative aspect-[4/3] rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <GridMockup />
          </div>
          <p className="sr-only">Mockup de interfaz limpia con componentes sencillos.</p>
        </motion.div>
      </div>
    </section>
  );
}

function GridMockup() {
  return (
    <div className="h-full w-full bg-white">
      <div className="h-10 border-b border-slate-100 flex items-center gap-2 px-3">
        <div className="size-2 rounded-full bg-slate-200" />
        <div className="size-2 rounded-full bg-slate-200" />
        <div className="size-2 rounded-full bg-slate-200" />
        <div className="ml-3 h-5 w-24 rounded bg-slate-100" />
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 p-3">
            <div className="h-24 rounded-xl bg-slate-50 border border-slate-100" />
            <div className="mt-3 h-3 w-20 rounded bg-slate-100" />
            <div className="mt-2 h-3 w-28 rounded bg-slate-100" />
            <div className="mt-3 h-8 rounded-lg bg-emerald-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== TRUST BAR ===================== */
function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/40">
      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
        <p>Next.js + Tailwind</p>
        <p>SEO técnico</p>
        <p>Performance web</p>
        <p>Soporte humano</p>
      </div>
    </section>
  );
}

/* ===================== SERVICES ===================== */
function Services() {
  const items = [
    {
      title: "Webs a medida",
      desc: "Landing pages enfocadas en conversión con diseño minimal y tiempos de carga rápidos.",
    },
    {
      title: "E‑commerce",
      desc: "Tiendas online claras, pago seguro y catálogo administrable.",
    },
    {
      title: "Sistemas & procesos",
      desc: "Herramientas internas para ordenar proveedores, stock o tareas.",
    },
  ];

  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Servicios</h2>
        <p className="mt-3 text-slate-600">Diseño + desarrollo con enfoque en claridad, rendimiento y mantenimiento simple.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl border border-slate-200 p-5 bg-white hover:shadow-sm transition">
            <h3 className="font-medium">{it.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ===================== PROCESS ===================== */
function Process() {
  const steps = [
    { k: "01", t: "Exploración", d: "Entendemos tu negocio, objetivos y usuarios." },
    { k: "02", t: "Diseño", d: "Prototipos y UI minimal alineada a tu marca." },
    { k: "03", t: "Desarrollo", d: "Código limpio, SEO técnico y performance." },
    { k: "04", t: "Lanzamiento", d: "Medición, mejoras y acompañamiento." },
  ];
  return (
    <section id="proceso" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Proceso</h2>
        <p className="mt-3 text-slate-600">De la idea al sitio online con una ruta clara.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        {steps.map((s) => (
          <div key={s.k} className="rounded-2xl border border-slate-200 p-5">
            <div className="text-xs text-slate-500">{s.k}</div>
            <div className="mt-1 font-medium">{s.t}</div>
            <div className="mt-2 text-sm text-slate-600">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===================== PHILOSOPHY ===================== */
function Philosophy() {
  return (
    <section id="filosofia" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="rounded-3xl border border-slate-200 p-8 md:p-12 bg-gradient-to-b from-white to-slate-50">
        <blockquote className="text-xl md:text-2xl font-medium tracking-tight text-slate-800">
          “Integrar el medio ambiente como parte de nuestros valores y usar la tecnología con claridad y propósito.”
        </blockquote>
        <p className="mt-4 text-slate-600 max-w-2xl">Trabajamos con comunicación simple, decisiones conscientes y un diseño que favorece la usabilidad.</p>
      </div>
    </section>
  );
}

/* ===================== CTA + CONTACT FORM ===================== */
function CTA() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">¿Construimos tu sitio?</h2>
          <p className="mt-3 text-slate-600">Contanos sobre tu proyecto. Respondemos a la brevedad.</p>
          <ul className="mt-6 text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>Implementación en Vercel (free)</li>
            <li>Formulario con Formspree (free tier)</li>
            <li>Optimización SEO básica</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    // Reemplaza "YOUR_FORMSPREE_ID" por tu ID (p. ej. xwkgjybz)
    const endpoint = "https://formspree.io/f/YOUR_FORMSPREE_ID";
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 p-5 bg-white">
      <div className="grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-700">Nombre</span>
          <input name="name" required className="h-10 rounded-xl border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-700">Email</span>
          <input type="email" name="email" required className="h-10 rounded-xl border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-700">Mensaje</span>
          <textarea name="message" rows={4} required className="rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <button disabled={status==="sending" || status==="sent"} className="h-11 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-60">
          {status === "sending" ? "Enviando…" : status === "sent" ? "¡Enviado!" : "Enviar"}
        </button>
        {status === "error" && (
          <p className="text-sm text-rose-600">Hubo un problema. Escribinos por Instagram o WhatsApp.</p>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-500">Protegemos tus datos. Solo los usamos para responderte.</p>
    </form>
  );
}

/* ===================== FOOTER ===================== */
function SiteFooter() {
  return (
    <footer className="border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600 grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-medium">Raíz Digital</span>
          </div>
          <p className="mt-2 max-w-prose">Diseño y desarrollo de sitios, tiendas y sistemas con claridad y propósito.</p>
        </div>
        <div className="md:justify-self-end grid gap-2">
          <a className="hover:text-slate-900" href="mailto:hola@raizdigital.studio">hola@raizdigital.studio</a>
          <a className="hover:text-slate-900" href="#">Instagram</a>
          <a className="hover:text-slate-900" href="#">LinkedIn</a>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-6">© {new Date().getFullYear()} Raíz Digital</div>
    </footer>
  );
}
