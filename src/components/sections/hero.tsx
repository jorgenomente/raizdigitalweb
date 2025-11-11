'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMotionPreferences } from "@/lib/motion-preferences";
import { useDictionary } from "@/components/providers/translation-provider";

export function Hero() {
  const { hero } = useDictionary();
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();
  const glowBlur = shouldReduceMotion
    ? "blur(24px)"
    : `blur(${allowMotion ? 120 : 60}px)`;
  const showDecorations = !shouldReduceMotion;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1C26] via-[#111418] to-[#0E1C26]" />

      <div
        className="absolute left-20 top-20 h-96 w-96 rounded-full bg-[#4FD4E4] opacity-20"
        style={{ filter: glowBlur }}
      />
      <div
        className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-[#D55FA3] opacity-20"
        style={{ filter: glowBlur }}
      />

      {showDecorations && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #4FD4E4 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      )}

      {showDecorations && (
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="none"
        >
          {allowMotion ? (
            <motion.line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="80%"
              stroke="#4FD4E4"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          ) : (
            <line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="80%"
              stroke="#4FD4E4"
              strokeWidth="1"
              opacity="0.25"
            />
          )}
          {allowMotion ? (
            <motion.line
              x1="80%"
              y1="30%"
              x2="20%"
              y2="90%"
              stroke="#D55FA3"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
          ) : (
            <line
              x1="80%"
              y1="30%"
              x2="20%"
              y2="90%"
              stroke="#D55FA3"
              strokeWidth="1"
              opacity="0.25"
            />
          )}
          {allowMotion ? (
            <motion.circle
              cx="10%"
              cy="20%"
              r="4"
              fill="#4FD4E4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            />
          ) : (
            <circle cx="10%" cy="20%" r="4" fill="#4FD4E4" opacity="0.6" />
          )}
          {allowMotion ? (
            <motion.circle
              cx="90%"
              cy="80%"
              r="4"
              fill="#4FD4E4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            />
          ) : (
            <circle cx="90%" cy="80%" r="4" fill="#4FD4E4" opacity="0.6" />
          )}
          {allowMotion ? (
            <motion.circle
              cx="80%"
              cy="30%"
              r="4"
              fill="#D55FA3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            />
          ) : (
            <circle cx="80%" cy="30%" r="4" fill="#D55FA3" opacity="0.6" />
          )}
          {allowMotion ? (
            <motion.circle
              cx="20%"
              cy="90%"
              r="4"
              fill="#D55FA3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            />
          ) : (
            <circle cx="20%" cy="90%" r="4" fill="#D55FA3" opacity="0.6" />
          )}
        </svg>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="mb-8 text-5xl text-white md:text-7xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {hero.title}{" "}
            <span className="bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] bg-clip-text text-transparent">
              {hero.highlight}
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mx-auto mb-12 max-w-4xl text-xl text-[#AAB7C4] md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] px-8 py-4 font-medium text-[#111418] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(79,212,228,0.5)]">
            <span
              className="relative z-10 flex items-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {hero.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex h-10 w-6 justify-center rounded-full border-2 border-[#4FD4E4]"
            animate={
              allowMotion
                ? { y: [0, 10, 0] }
                : { y: 0 }
            }
            transition={
              allowMotion
                ? { duration: 1.5, repeat: Infinity }
                : undefined
            }
          >
            <motion.div
              className="mt-2 h-1.5 w-1.5 rounded-full bg-[#4FD4E4]"
              animate={
                allowMotion
                  ? { y: [0, 16, 0] }
                  : { y: 0 }
              }
              transition={
                allowMotion
                  ? { duration: 1.5, repeat: Infinity }
                  : undefined
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
