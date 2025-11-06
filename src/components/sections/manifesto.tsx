'use client';
import { motion } from "framer-motion";
import { useMotionPreferences } from "@/lib/motion-preferences";

const gradientOrbs = [
  {
    size: 520,
    top: "12%",
    left: "18%",
    color: "rgba(79, 212, 228, 0.24)",
    blur: 200,
    x: [0, 28, -18, 0],
    y: [0, -16, 22, 0],
  },
  {
    size: 460,
    top: "58%",
    left: "60%",
    color: "rgba(213, 95, 163, 0.22)",
    blur: 180,
    x: [0, -24, 16, 0],
    y: [0, 20, -14, 0],
  },
  {
    size: 380,
    top: "35%",
    left: "70%",
    color: "rgba(79, 212, 228, 0.18)",
    blur: 160,
    x: [0, 18, -12, 0],
    y: [0, -18, 14, 0],
  },
] as const;

const orbitalRings = [
  {
    radius: 210,
    stroke: "rgba(79, 212, 228, 0.35)",
    delay: 0,
    duration: 18,
  },
  {
    radius: 260,
    stroke: "rgba(213, 95, 163, 0.25)",
    delay: 1.8,
    duration: 22,
  },
] as const;

export function Manifesto() {
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 bg-[#111418]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(79,212,228,0.12) 0%, transparent 30%), radial-gradient(circle at center, rgba(213,95,163,0.07) 0%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />

        {!shouldReduceMotion &&
          gradientOrbs.map((orb, index) => (
            <motion.div
              key={`orb-${index}`}
              className="absolute rounded-full"
              style={{
                top: orb.top,
                left: orb.left,
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 60%)`,
                filter: `blur(${allowMotion ? orb.blur : orb.blur * 0.6}px)`,
                mixBlendMode: "screen",
              }}
              animate={
                allowMotion
                  ? {
                      x: Array.from(orb.x),
                      y: Array.from(orb.y),
                    }
                  : undefined
              }
              transition={
                allowMotion
                  ? {
                      duration: 16 + index * 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }
                  : undefined
              }
            />
          ))}

        <motion.svg
          className="absolute left-1/2 top-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 600 600"
          fill="none"
        >
          <defs>
            <radialGradient id="pulse-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#4FD4E4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4FD4E4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="circuit" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#D55FA3" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#4FD4E4" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <circle
            cx="300"
            cy="300"
            r="120"
            fill="url(#pulse-core)"
            opacity={shouldReduceMotion ? 0.25 : 0.4}
          />

          {orbitalRings.map((ring) => (
            <motion.circle
              key={`ring-${ring.radius}`}
              cx="300"
              cy="300"
              r={ring.radius}
              stroke={ring.stroke}
              strokeWidth="1.5"
              strokeDasharray="12 18"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 0.8, scale: 1 }}
              viewport={{ once: true }}
              animate={
                allowMotion
                  ? {
                      rotate: [0, 360],
                    }
                  : undefined
              }
              transition={{
                duration: ring.duration,
                delay: ring.delay,
                repeat: allowMotion ? Infinity : 0,
                ease: "linear",
              }}
            />
          ))}

          <motion.path
            d="M120 320 C220 200, 380 200, 480 320"
            stroke="url(#circuit)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.45 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />

          <motion.path
            d="M160 360 C240 260, 360 260, 440 360"
            stroke="url(#circuit)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.2, ease: "easeInOut" }}
          />

          <motion.circle
            cx="300"
            cy="300"
            r="5"
            fill="#F8FAFC"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            animate={
              allowMotion
                ? {
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.4, 1],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : undefined
            }
            style={{ filter: "drop-shadow(0 0 12px rgba(248,250,252,0.45))" }}
          />
        </motion.svg>
      </div>

      <motion.div
        className="relative z-10 mx-auto flex justify-center text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-sm uppercase tracking-[0.4em] text-[#AAB7C4]/80"
          style={{ fontFamily: "Geist Mono, monospace" }}
        >
          Diseño que conecta + sistemas que ordenan
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-16 text-center lg:flex-row lg:items-start lg:gap-20 lg:text-left">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h2
            className="mt-10 text-4xl text-white md:text-6xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Acompañamos a empresas en crecimiento que quieren modernizar su forma de operar.
          </motion.h2>
        </div>

      </div>
  </section>
);
}
