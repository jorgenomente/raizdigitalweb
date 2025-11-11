'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/components/providers/translation-provider";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { Dictionary, ProjectId } from "@/lib/i18n/dictionaries";
import { useMotionPreferences } from "@/lib/motion-preferences";

type ProjectCardConfig = {
  id: ProjectId;
  image: string;
  color: string;
  href: string;
};

type ProjectCopy = Dictionary["projects"]["items"][ProjectId];

const projectCards: ProjectCardConfig[] = [
  {
    id: "gestock",
    image: "/gestock.png",
    color: "#4FD4E4",
    href: "https://gestock-multitenant.vercel.app/demo",
  },
  {
    id: "pew",
    image: "/pew.png",
    color: "#D55FA3",
    href: "https://pew-beta.vercel.app/demo",
  },
];

function ProjectCard({
  project,
  copy,
  viewCaseLabel,
  index,
  isScrolling,
  allowMotion,
  shouldReduceMotion,
}: {
  project: ProjectCardConfig;
  copy: ProjectCopy;
  viewCaseLabel: string;
  index: number;
  isScrolling: boolean;
  allowMotion: boolean;
  shouldReduceMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);

  const enableInteractiveHover = allowMotion && !shouldReduceMotion;
  const linkHref = project.href ?? "#";
  const isExternalLink = linkHref.startsWith("http");
  const linkTarget = isExternalLink ? "_blank" : undefined;
  const linkRel = isExternalLink ? "noopener noreferrer" : undefined;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isScrolling || !enableInteractiveHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="w-[80vw] flex-shrink-0 sm:w-[350px] md:w-[380px] lg:w-[420px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isScrolling && enableInteractiveHover && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative h-full overflow-hidden rounded-3xl bg-[#0E1C26]/60 ${shouldReduceMotion ? "" : "backdrop-blur-xl"}`}
        style={{
          border: `1px solid ${project.color}20`,
          boxShadow: shouldReduceMotion
            ? "0 14px 40px rgba(0, 0, 0, 0.35)"
            : "0 20px 60px rgba(0, 0, 0, 0.4)",
          rotateX: enableInteractiveHover && isHovered ? rotateX : 0,
          rotateY: enableInteractiveHover && isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.08,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={
          enableInteractiveHover
            ? {
                scale: 1.02,
                transition: {
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }
            : undefined
        }
      >
        {isHovered && enableInteractiveHover && (
          <motion.div
            className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl blur-2xl"
            style={{
              background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}

        {isHovered && enableInteractiveHover && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${project.color}10 40%, transparent 100%)`,
            }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}

        <a
          href={linkHref}
          target={linkTarget}
          rel={linkRel}
          className="group/image block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1C26] focus-visible:ring-white/50"
        >
          <div className="relative h-56 overflow-hidden md:h-64">
            <ImageWithFallback
              src={project.image}
              alt={copy.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E1C26]/90" />
            <div
              className="absolute left-0 right-0 top-0 h-[2px] transition-opacity"
              style={{
                background: `linear-gradient(to right, ${project.color}, transparent)`,
                boxShadow: `0 0 15px ${project.color}80`,
                opacity: isHovered ? 1 : 0.6,
                transitionDuration: "0.4s",
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </div>
        </a>

        <div className="relative px-6 pb-6 pt-6 md:px-8 md:pb-8">
          <h3 className="mb-2 text-xl md:text-2xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <a
              href={linkHref}
              target={linkTarget}
              rel={linkRel}
              className="inline-flex items-center text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1C26] focus-visible:ring-white/50"
              style={{
                letterSpacing: isHovered ? "0.02em" : "normal",
                transitionDuration: "0.4s",
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {copy.title}
            </a>
          </h3>
          <p
            className="mb-4 text-sm text-[#AAB7C4] md:mb-6 md:text-base"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {copy.subtitle}
          </p>

          <div className="mb-4 flex flex-wrap gap-2 md:mb-6">
            {copy.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-1 text-xs transition-all md:px-3 md:py-1.5"
                style={{
                  fontFamily: "Geist Mono, monospace",
                  borderColor: `${project.color}40`,
                  background: `${project.color}10`,
                  color: project.color,
                  transitionDuration: "0.4s",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={linkHref}
            className="group/link inline-flex items-center gap-2 text-sm transition-all"
            style={{
              color: project.color,
              fontFamily: "Inter, sans-serif",
              transitionDuration: "0.4s",
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            target={linkTarget}
            rel={linkRel}
          >
            <span className="relative">
              {viewCaseLabel}
              <span
                className="absolute bottom-0 left-0 h-[1px] w-0 transition-all group-hover/link:w-full"
                style={{
                  backgroundColor: project.color,
                  boxShadow: `0 0 8px ${project.color}80`,
                  transitionDuration: "0.4s",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />
            </span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              strokeWidth={2}
              style={{
                transitionDuration: "0.4s",
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </a>

          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity"
            style={{
              background: `linear-gradient(to right, transparent, ${project.color})`,
              boxShadow: `0 0 10px ${project.color}60`,
              opacity: isHovered ? 1 : 0.4,
              transitionDuration: "0.4s",
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { projects: projectsCopy } = useDictionary();
  const { allowMotion, shouldReduceMotion } = useMotionPreferences();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleWheel = (event: WheelEvent) => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

      if (
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        (canScrollLeft && event.deltaY < 0) ||
        (canScrollRight && event.deltaY > 0)
      ) {
        event.preventDefault();
        const scrollAmount =
          (event.deltaX !== 0 ? event.deltaX : event.deltaY) * 1.2;
        container.scrollLeft += scrollAmount;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 scroll-mt-28 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C26] via-[#111418] to-[#0E1C26]" />

        {!shouldReduceMotion && (
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #D55FA3 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        )}

        {!shouldReduceMotion && (
          <>
            <div
              className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#4FD4E4] opacity-15"
              style={{ filter: `blur(${allowMotion ? 140 : 90}px)` }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#D55FA3] opacity-15"
              style={{ filter: `blur(${allowMotion ? 140 : 90}px)` }}
            />
          </>
        )}

        <svg className="absolute left-0 right-0 top-1/3 h-px overflow-visible opacity-10">
          <motion.line
            x1="15%"
            y1="0"
            x2="85%"
            y2="0"
            stroke="url(#projectsGradient)"
            strokeWidth="2"
            strokeDasharray="12,6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <defs>
            <linearGradient id="projectsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4FD4E4" />
              <stop offset="33%" stopColor="#D55FA3" />
              <stop offset="66%" stopColor="#4FD4E4" />
              <stop offset="100%" stopColor="#D55FA3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative">
        <motion.div
          className="mb-16 px-6 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-6 text-4xl text-white tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {projectsCopy.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[#AAB7C4] leading-relaxed md:text-xl">
            {projectsCopy.description}
          </p>
        </motion.div>

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 md:w-24"
            style={{
              background:
                "linear-gradient(to right, rgba(14, 28, 38, 1) 0%, rgba(14, 28, 38, 0.8) 30%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 md:w-24"
            style={{
              background:
                "linear-gradient(to left, rgba(14, 28, 38, 1) 0%, rgba(14, 28, 38, 0.8) 30%, transparent 100%)",
            }}
          />

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto px-6 py-8 md:py-12"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x proximity",
              overscrollBehaviorX: "contain",
            }}
          >
            <style>{`
              .projects-track::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="projects-track flex gap-6 justify-center">
              {projectCards.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  copy={projectsCopy.items[project.id]}
                  viewCaseLabel={projectsCopy.viewCase}
                  index={index}
                  isScrolling={isScrolling}
                  allowMotion={allowMotion}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 px-6 text-sm text-[#AAB7C4]/70">
            <span>{projectsCopy.progressLabel}</span>
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-[#1C2C35]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3]"
                style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
