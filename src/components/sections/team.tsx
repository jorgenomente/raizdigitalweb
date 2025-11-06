'use client';

import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useMotionPreferences } from "@/lib/motion-preferences";

const teamMembers = [
  {
    name: "Jorge",
    role: "Estrategia y Desarrollo",
    description: "Integra lógica, estructura y visión digital.",
    image: "/avatars/Jorge1.png",
    hoverImage: "/avatars/Jorge2.png",
    color: "#4FD4E4",
  },
  {
    name: "Paola",
    role: "Diseño UX/UI y Branding",
    description: "Crea experiencias visuales que conectan con propósito.",
    image: "/avatars/Paola1.png",
    hoverImage: "/avatars/paola2.PNG",
    color: "#D55FA3",
  },
  {
    name: "Samira",
    role: "Chief Happiness Officer 🐾",
    description: "Guarda la energía del equipo y da alegría al sistema.",
    image: "/avatars/Samira1.png",
    hoverImage: "/avatars/Samira2.jpg",
    color: "#4FD4E4",
  },
] as const;

function Particle({
  delay,
  color,
  radius = 150,
  index,
  allowMotion,
}: {
  delay: number;
  color: string;
  radius?: number;
  index: number;
  allowMotion: boolean;
}) {
  const angle = (index / 6) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  if (!allowMotion) {
    return (
      <div
        className="absolute h-2 w-2 rounded-full opacity-70"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}55`,
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}40`,
        left: "50%",
        top: "50%",
      }}
      animate={{
        x: [x, x],
        y: [y, y],
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function TeamMemberCard({
  member,
  index,
  allowMotion,
  shouldReduceMotion,
}: {
  member: (typeof teamMembers)[number];
  index: number;
  allowMotion: boolean;
  shouldReduceMotion: boolean;
}) {
  const showHalo = !shouldReduceMotion;
  const showOrbitParticles = !shouldReduceMotion;

  return (
    <motion.div
      className="flex max-w-xs flex-col items-center"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.div
        className="group relative mb-6 cursor-pointer"
        whileHover={allowMotion && !shouldReduceMotion ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {showHalo && (
          <motion.div
            className="absolute -inset-12 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${member.color}20 0%, transparent 70%)`,
              filter: `blur(${allowMotion ? 30 : 18}px)`,
            }}
            animate={allowMotion ? { scale: [1, 1.15, 1] } : undefined}
            transition={
              allowMotion
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : undefined
            }
          />
        )}

        {showOrbitParticles && (
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 6 }).map((_, particleIndex) => (
              <Particle
                key={particleIndex}
                delay={particleIndex * 0.3 + index * 0.5}
                color={member.color}
                radius={80}
                index={particleIndex}
                allowMotion={allowMotion}
              />
            ))}
          </div>
        )}

        <motion.div
          className="absolute -inset-6 rounded-full border-2"
          style={{
            borderColor: `${member.color}40`,
          }}
          animate={
            allowMotion
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                  rotate: [0, 360],
                }
              : { opacity: 0.4 }
          }
          transition={
            allowMotion
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
        />

        <motion.div
          className="absolute -inset-3 rounded-full border-2"
          style={{
            borderColor: member.color,
            boxShadow: `0 0 20px ${member.color}60, inset 0 0 20px ${member.color}20`,
          }}
          animate={allowMotion ? { rotate: [0, -360] } : undefined}
          transition={
            allowMotion
              ? {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
        >
          <motion.div
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: member.color,
              boxShadow: `0 0 10px ${member.color}`,
            }}
          />
        </motion.div>

        <div
          className="relative z-10 h-40 w-40 overflow-hidden rounded-full border-4 bg-[#0E1C26]"
          style={{
            borderColor: member.color,
            boxShadow: `0 0 40px ${member.color}60, inset 0 0 30px ${member.color}15, 0 10px 30px rgba(0, 0, 0, 0.5)`,
          }}
        >
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
            <ImageWithFallback
              src={member.image}
              alt={member.name}
              className={`absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500 ${
                member.hoverImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {member.hoverImage ? (
              <ImageWithFallback
                src={member.hoverImage}
                alt={`${member.name} alternate`}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </div>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${member.color}60 100%)`,
            }}
          />
        </div>

        <motion.div
          className="absolute -bottom-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-[#111418]"
          style={{ borderColor: member.color }}
          animate={
            allowMotion
              ? {
                  boxShadow: [
                    `0 0 0 0 ${member.color}80`,
                    `0 0 0 8px ${member.color}00`,
                    `0 0 0 0 ${member.color}80`,
                  ],
                }
              : undefined
          }
          transition={
            allowMotion
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }
              : undefined
          }
        >
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: member.color,
              boxShadow: `0 0 8px ${member.color}`,
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.2 }}
      >
        <h3
          className="mb-2 text-2xl text-white md:text-3xl"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {member.name}
        </h3>
        <p
          className="text-sm tracking-wider"
          style={{
            fontFamily: "Geist Mono, monospace",
            color: member.color,
          }}
        >
          {member.role}
        </p>
      </motion.div>

      <motion.p
        className="max-w-xs text-center leading-relaxed text-[#AAB7C4]"
        style={{ fontFamily: "Inter, sans-serif" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {member.description}
      </motion.p>
    </motion.div>
  );
}

export function Team() {
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] via-[#0E1C26] to-[#111418]" />

      {!shouldReduceMotion && (
        <div className="absolute inset-0 opacity-[0.06]">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #D55FA3 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            animate={
              allowMotion
                ? {
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }
                : undefined
            }
            transition={
              allowMotion
                ? {
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }
                : undefined
            }
          />
        </div>
      )}

      {!shouldReduceMotion && (
        <>
          <div
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#4FD4E4]/10"
            style={{ filter: `blur(${allowMotion ? 140 : 90}px)` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#D55FA3]/10"
            style={{ filter: `blur(${allowMotion ? 140 : 90}px)` }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-6 text-5xl text-white tracking-tight md:text-6xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Equipo Raíz Digital
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#AAB7C4]">
            Personas reales, mentes creativas y energía viva detrás del sistema.
          </p>
        </motion.div>

        <div className="relative mx-auto min-h-[500px] max-w-6xl">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="teamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D55FA3" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="teamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D55FA3" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4FD4E4" stopOpacity="0.6" />
              </linearGradient>

              <filter id="teamGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {allowMotion ? (
              <motion.line
                x1="25%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="url(#teamGradient1)"
                strokeWidth="2"
                strokeDasharray="8,4"
                filter="url(#teamGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            ) : (
              <line
                x1="25%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="url(#teamGradient1)"
                strokeWidth="2"
                strokeDasharray="8,4"
                filter="url(#teamGlow)"
                opacity="0.6"
              />
            )}

            {allowMotion ? (
              <motion.line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="50%"
                stroke="url(#teamGradient2)"
                strokeWidth="2"
                strokeDasharray="8,4"
                filter="url(#teamGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            ) : (
              <line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="50%"
                stroke="url(#teamGradient2)"
                strokeWidth="2"
                strokeDasharray="8,4"
                filter="url(#teamGlow)"
                opacity="0.6"
              />
            )}

            {allowMotion ? (
              <motion.path
                d="M 25% 50% Q 50% 30%, 75% 50%"
                stroke="#4FD4E4"
                strokeWidth="1.5"
                strokeDasharray="6,3"
                fill="none"
                opacity="0.4"
                filter="url(#teamGlow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.2 }}
              />
            ) : (
              <path
                d="M 25% 50% Q 50% 30%, 75% 50%"
                stroke="#4FD4E4"
                strokeWidth="1.5"
                strokeDasharray="6,3"
                fill="none"
                opacity="0.4"
                filter="url(#teamGlow)"
              />
            )}

            {allowMotion ? (
              <motion.circle
                cx="25%"
                cy="50%"
                r="3"
                fill="#4FD4E4"
                style={{ filter: "drop-shadow(0 0 8px #4FD4E4)" }}
                animate={{ cx: ["25%", "50%", "25%"], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <circle
                cx="25%"
                cy="50%"
                r="3"
                fill="#4FD4E4"
                style={{ filter: "drop-shadow(0 0 6px #4FD4E4)" }}
                opacity="0.7"
              />
            )}

            {allowMotion ? (
              <motion.circle
                cx="50%"
                cy="50%"
                r="3"
                fill="#D55FA3"
                style={{ filter: "drop-shadow(0 0 8px #D55FA3)" }}
                animate={{ cx: ["50%", "75%", "50%"], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            ) : (
              <circle
                cx="50%"
                cy="50%"
                r="3"
                fill="#D55FA3"
                style={{ filter: "drop-shadow(0 0 6px #D55FA3)" }}
                opacity="0.7"
              />
            )}
          </svg>

          <div className="relative z-10 grid items-start justify-items-center gap-16 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                index={index}
                allowMotion={allowMotion}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-24 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "#4FD4E4" }}
              animate={
                allowMotion
                  ? {
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }
                  : undefined
              }
              transition={
                allowMotion
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : undefined
              }
            />
            <p
              className="text-xs tracking-widest text-[#AAB7C4]/60"
              style={{ fontFamily: "Geist Mono, monospace" }}
            >
              RED ACTIVA · COLABORACIÓN EN TIEMPO REAL
            </p>
          </div>
        </motion.div>
      </div>

      <svg className="pointer-events-none absolute bottom-20 left-0 right-0 h-px overflow-visible opacity-15">
        {allowMotion ? (
          <motion.line
            x1="15%"
            y1="0"
            x2="85%"
            y2="0"
            stroke="url(#teamDecoGradient)"
            strokeWidth="2"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 2 }}
          />
        ) : (
          <line
            x1="15%"
            y1="0"
            x2="85%"
            y2="0"
            stroke="url(#teamDecoGradient)"
            strokeWidth="2"
            strokeDasharray="10,5"
            opacity="0.3"
          />
        )}
        <defs>
          <linearGradient id="teamDecoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4FD4E4" />
            <stop offset="50%" stopColor="#D55FA3" />
            <stop offset="100%" stopColor="#4FD4E4" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
