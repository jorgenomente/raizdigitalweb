'use client';

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Palette, Workflow, Layers3, Layout, ShoppingCart } from "lucide-react";
import { useDictionary } from "@/components/providers/translation-provider";
import type { ServiceId } from "@/lib/i18n/dictionaries";
import { useMotionPreferences } from "@/lib/motion-preferences";

type ServiceNode = {
  id: ServiceId;
  icon: LucideIcon;
  color: string;
  position: "top" | "bottom";
};

const serviceNodes: ServiceNode[] = [
  {
    id: "branding-identidad-visual",
    icon: Palette,
    color: "#14b8a6",
    position: "top",
  },
  {
    id: "ecommerce-profesional",
    icon: ShoppingCart,
    color: "#ec4899",
    position: "bottom",
  },
  {
    id: "strategy",
    icon: Layers3,
    color: "#7C8CFF",
    position: "top",
  },
  {
    id: "marketing-digital",
    icon: Workflow,
    color: "#F5B953",
    position: "bottom",
  },
  {
    id: "landing",
    icon: Layout,
    color: "#F5B953",
    position: "bottom",
  },
  // webDesign card removed
];

function BreathingParticle({
  x,
  color,
  delay,
  allowMotion,
}: {
  x: string;
  color: string;
  delay: number;
  allowMotion: boolean;
}) {
  if (!allowMotion) {
    return (
      <circle
        cx={x}
        cy="350"
        r="3"
        fill={color}
        opacity="0.4"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    );
  }

  return (
    <motion.circle
      cx={x}
      cy="350"
      r="3"
      fill={color}
      style={{
        filter: `drop-shadow(0 0 8px ${color})`,
        pointerEvents: "none",
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.4, 0.8],
        r: [2.5, 4, 2.5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function LineGlow({
  xPos,
  yStart,
  yEnd,
  color,
  delay,
  allowMotion,
}: {
  xPos: number;
  yStart: number;
  yEnd: number;
  color: string;
  delay: number;
  allowMotion: boolean;
}) {
  const midY = (yStart + yEnd) / 2;

  if (!allowMotion) {
    return (
      <circle
        cx={xPos}
        cy={midY}
        r="4"
        fill={color}
        opacity="0.35"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
    );
  }

  return (
    <motion.circle
      cx={xPos}
      cy={midY}
      r="4"
      fill={color}
      style={{
        filter: `drop-shadow(0 0 10px ${color})`,
        pointerEvents: "none",
      }}
      animate={{
        cy: [yStart + 40, yEnd - 40, yStart + 40],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.6, 1.2, 0.6],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function ServicesGrid() {
  const { services: servicesCopy } = useDictionary();
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 360;
  const horizontalPadding = `max(1.5rem, calc((100vw - ${CARD_WIDTH}px) / 2))`;

  return (
    <section
      id="services"
      className="relative flex min-h-[80vh] flex-col overflow-hidden scroll-mt-28 md:min-h-screen"
    >
      <div className="absolute inset-0 bg-[#111418]" />

      {!shouldReduceMotion && (
        <div className="pointer-events-none.absolute inset-0 overflow-hidden.opacity-[0.04]">
          <motion.div
            className="absolute inset-0 h-[120%] w-[120%]"
            style={{
              backgroundImage:
                "linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #D55FA3 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              left: "-10%",
              top: "-10%",
            }}
            animate={
              allowMotion
                ? {
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }
                : undefined
            }
            transition={
              allowMotion
                ? {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }
                : undefined
            }
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #D55FA3 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: shouldReduceMotion ? 0.4 : 1,
          }}
        />
      </div>

      {!shouldReduceMotion && (
        <>
          <div
            className="pointer-events-none absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#4FD4E4]"
            style={{
              opacity: 0.1,
              filter: `blur(${allowMotion ? 150 : 90}px)`,
              animation: allowMotion ? "pulse-glow-cyan 8s ease-in-out infinite" : undefined,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[#D55FA3]"
            style={{
              opacity: 0.1,
              filter: `blur(${allowMotion ? 150 : 90}px)`,
              animation: allowMotion ? "pulse-glow-magenta 8s ease-in-out infinite" : undefined,
              animationDelay: allowMotion ? "4s" : undefined,
            }}
          />
        </>
      )}

      {allowMotion && !shouldReduceMotion && (
        <style>{`
          @keyframes pulse-glow-cyan {
            0%, 100% { opacity: 0.08; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
          }
          @keyframes pulse-glow-magenta {
            0%, 100% { opacity: 0.08; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
          }
        `}</style>
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-center py-16 md:py-20">
        <motion.div
          className="mb-12 px-6 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-space-grotesk mb-6 text-4xl text-white tracking-tight md:text-5xl">
            {servicesCopy.heading}
          </h2>
          <p className="mx-auto.mb-8 max-w-2xl text-xl text-[#AAB7C4]">
            {servicesCopy.description}
          </p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={
              allowMotion
                ? { opacity: [0.4, 1, 0.4] }
                : { opacity: 1 }
            }
            transition={
              allowMotion
                ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <p
              className="font-geist-mono flex items-center gap-2 text-sm text-[#AAB7C4]/80 tracking-wide"
            >
              {servicesCopy.scrollHint}
              <motion.span
                animate={
                  allowMotion
                    ? { x: [0, 8, 0] }
                    : undefined
                }
                transition={
                  allowMotion
                    ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              >
                <ArrowRight className="h-4 w-4 text-[#4FD4E4]" strokeWidth={2} />
              </motion.span>
            </p>
            <motion.div
              className="h-0.5 w-32 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, #4FD4E4, #D55FA3, transparent)",
                boxShadow: "0 0 10px #4FD4E4, 0 0 20px #D55FA3",
              }}
              animate={
                allowMotion
                  ? {
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0.8, 1, 0.8],
                  }
                  : undefined
              }
              transition={
                allowMotion
                  ? {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                  : undefined
              }
            />
          </motion.div>
        </motion.div>

        <div className="relative flex flex-1 items-center">
          {/* SVG líneas + partículas */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="relative flex h-full w-full items-center">
              <svg
                className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-full -translate-y-1/2 overflow-visible"
                viewBox="0 0 2000 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.7" />
                    <stop offset="33%" stopColor="#D55FA3" stopOpacity="0.7" />
                    <stop offset="66%" stopColor="#4FD4E4" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D55FA3" stopOpacity="0.7" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.path
                  d="M 200 300 Q 400 300, 480 300 Q 560 300, 680 300 Q 800 300, 1000 300 Q 1200 300, 1320 300 Q 1440 300, 1560 300 Q 1680 300, 1800 300"
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />

                <motion.path
                  d="M 200 300 Q 400 300, 480 300 Q 560 300, 680 300 Q 800 300, 1000 300 Q 1200 300, 1320 300 Q 1440 300, 1560 300 Q 1680 300, 1800 300"
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.12"
                  filter="url(#strongGlow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />

                <BreathingParticle x="280" color="#4FD4E4" delay={0} allowMotion={allowMotion} />
                <BreathingParticle x="600" color="#D55FA3" delay={0.8} allowMotion={allowMotion} />
                <BreathingParticle x="1000" color="#4FD4E4" delay={1.6} allowMotion={allowMotion} />
                <BreathingParticle x="1320" color="#D55FA3" delay={2.4} allowMotion={allowMotion} />
                <BreathingParticle x="1640" color="#4FD4E4" delay={3.2} allowMotion={allowMotion} />

                {serviceNodes.map((service, index) => {
                  const xPos = 280 + index * 320;
                  const yStart = 300;
                  const yEnd = service.position === "top" ? 100 : 500;

                  return (
                    <g key={`line-group-${service.id}`}>
                      <line
                        x1={xPos}
                        y1={yStart}
                        x2={xPos}
                        y2={yEnd}
                        stroke={service.color}
                        strokeWidth="6"
                        strokeDasharray="10,6"
                        filter="url(#strongGlow)"
                        opacity={activeNode === index ? "0.5" : "0.25"}
                        style={{
                          animation: allowMotion
                            ? `line-pulse-${index} 3s ease-in-out infinite`
                            : undefined,
                          transition: "opacity 0.3s ease",
                        }}
                      />

                      <motion.line
                        x1={xPos}
                        y1={yStart}
                        x2={xPos}
                        y2={yEnd}
                        stroke={service.color}
                        strokeWidth="2.5"
                        strokeDasharray="10,6"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{
                          pathLength: 1,
                          opacity: activeNode === index ? 0.8 : 0.5,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
                      />

                      <LineGlow
                        xPos={xPos}
                        yStart={yStart}
                        yEnd={yEnd}
                        color={service.color}
                        delay={index * 0.6}
                        allowMotion={allowMotion}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <style>{`
            ${allowMotion
              ? serviceNodes
                .map(
                  (_, index) => `
              @keyframes line-pulse-${index} {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.4; }
              }
            `
                )
                .join("\n")
              : ""}
          `}</style>

          {/* Cards */}
          <div
            ref={scrollContainerRef}
            className="relative z-20 flex-1 overflow-x-auto py-12"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: horizontalPadding,
              scrollPaddingRight: horizontalPadding,
            }}
          >
            <div className="flex items-stretch gap-7 md:gap-9">
              <div
                aria-hidden
                className="flex-shrink-0"
                style={{
                  width: horizontalPadding,
                }}
              />
              {serviceNodes.map((service, index) => {
                const serviceContent = servicesCopy.items[service.id];
                const isActive = activeNode === index;

                return (
                  <motion.div
                    key={service.id}
                    tabIndex={0}
                    className={`group relative flex h-full w-[360px] flex-shrink-0 snap-center flex-col rounded-[32px] border border.white/10 bg-[#0E1C26]/80 p-8 transition-all duration-500 ease-out will-change-transform focus:outline-none ${shouldReduceMotion ? "" : "backdrop-blur-xl"
                      }`}
                    style={{
                      borderColor:
                        isActive ? `${service.color}35` : "rgba(255,255,255,0.08)",
                      boxShadow:
                        isActive
                          ? `0 30px 80px ${service.color}22`
                          : "0 12px 35px rgba(8, 14, 20, 0.65)",
                      background:
                        isActive
                          ? `linear-gradient(150deg, rgba(14, 28, 38, 0.95), rgba(18, 38, 52, 0.78))`
                          : "linear-gradient(150deg, rgba(12, 24, 32, 0.9), rgba(10, 20, 28, 0.72))",
                      transformOrigin: "center",
                    }}
                    onFocus={() => setActiveNode(index)}
                    onBlur={() => setActiveNode(null)}
                    onMouseEnter={() => setActiveNode(index)}
                    onMouseLeave={() => setActiveNode(null)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={
                      allowMotion
                        ? {
                          scale: 1.045,
                          y: -12,
                          boxShadow: `0 36px 90px ${service.color}28`,
                        }
                        : { scale: 1.015 }
                    }
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[32px] opacity-20 transition duration-500 group-hover:opacity-80"
                      style={{
                        background: `radial-gradient(circle at top, ${service.color}22, transparent 65%)`,
                        filter: "blur(0px)",
                      }}
                    />

                    <div className="relative flex flex-1 flex-col">
                      <service.icon
                        className="h-10 w-10"
                        style={{ color: service.color }}
                      />
                      <h3 className="font-space-grotesk mt-5 text-xl md:text-2xl font-semibold text-slate-50">
                        {serviceContent.title}
                      </h3>

                      {/* Descripción principal */}
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-200/90">
                        {serviceContent.description}
                      </p>

                      {/* Entrega estimada */}
                      {serviceContent.estimatedTime && (
                        <p className="mt-3 text-sm text-neutral-300">
                          {serviceContent.estimatedTime}
                        </p>
                      )}

                      {/* Inversión desde */}
                      {serviceContent.startingPrice && (
                        <p className="text-sm text-neutral-300">
                          {serviceContent.startingPrice}
                        </p>
                      )}

                      <motion.div
                        className="mt-10 rounded-2xl border border-white/10 bg-[#101d27]/60 p-5"
                        animate={
                          isActive
                            ? {
                              y: -8,
                              opacity: 1,
                              boxShadow: `0 22px 48px ${service.color}22`,
                            }
                            : {
                              y: 0,
                              opacity: 0.9,
                              boxShadow: "0 0 0 rgba(0,0,0,0)",
                            }
                        }
                        style={{
                          background:
                            isActive
                              ? `linear-gradient(145deg, ${service.color}1F, rgba(10, 28, 38, 0.9))`
                              : "linear-gradient(145deg, rgba(10, 24, 32, 0.9), rgba(10, 24, 32, 0.65))",
                          borderColor:
                            isActive
                              ? `${service.color}55`
                              : "rgba(255,255,255,0.08)",
                        }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <div
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase text-slate-100/80"
                          style={{
                            color: service.color,
                          }}
                        >
                          <span>{servicesCopy.keyBenefitLabel}</span>
                          <motion.span
                            animate={
                              isActive && allowMotion
                                ? { x: [0, 8, 0] }
                                : undefined
                            }
                            transition={
                              allowMotion
                                ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                                : undefined
                            }
                          >
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                          </motion.span>
                        </div>
                        <p className="mt-2 text-sm text-slate-200 font-semibold">
                          <strong>{serviceContent.benefit}</strong>
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              <div
                aria-hidden
                className="flex-shrink-0"
                style={{
                  width: horizontalPadding,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
