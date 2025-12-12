'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const PROJECT_CARD_WIDTH = "clamp(320px, 78vw, 420px)";
const PROJECT_CARD_HEIGHT = "clamp(560px, 70vh, 640px)";
const PROJECT_IMAGE_HEIGHT = "280px";

const projectCards: ProjectCardConfig[] = [
  {
    id: "gestock",
    image: "/gestock.png",
    color: "#4FD4E4",
    href: "https://nodux1.vercel.app/demo",
  },
  {
    id: "pew",
    image: "/pew.png",
    color: "#D55FA3",
    href: "https://pew-beta.vercel.app/demo",
  },
  {
    id: "miproveedor",
    image: "/miproveedor.svg",
    color: "#7C8CFF",
    href: "https://miproveedor.app/",
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
      className="project-card relative flex-shrink-0 snap-center md:snap-start"
      style={{
        width: "var(--project-card-width, clamp(320px, 78vw, 420px))",
        height: "var(--project-card-height, clamp(560px, 70vh, 640px))",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isScrolling && enableInteractiveHover && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative flex h-full flex-col overflow-hidden rounded-[28px] bg-transparent ${shouldReduceMotion ? "" : "backdrop-blur-xl"}`}
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
          <div className="project-card-image relative overflow-hidden" style={{ height: "var(--project-image-height, 280px)" }}>
            <ImageWithFallback
              src={project.image}
              alt={copy.title}
              className="block h-full w-full object-cover transition-transform duration-700 group-hover/image:scale-[1.04]"
              style={{
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
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

        <div className="relative flex flex-1 flex-col px-7 pb-8 pt-7 md:px-8 md:pb-9 md:pt-8">
          <h3 className="font-space-grotesk mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
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
            className="mb-6 text-base leading-relaxed text-[#B5C1CE] md:mb-7 md:text-lg"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {copy.subtitle}
          </p>

          <div className="mb-6 flex flex-wrap gap-3 md:mb-8">
            {copy.tags.map((tag) => (
              <span
                key={tag}
                className="font-geist-mono rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition-all md:px-3.5 md:py-2"
                style={{
                  borderColor: `${project.color}40`,
                  background: `${project.color}12`,
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
            className="group/link mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-all"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1.5px solid ${project.color}50`,
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(".project-card");
    const cardWidth = firstCard?.offsetWidth ?? 400;
    const gap = 32;

    container.scrollBy({
      left: (cardWidth + gap) * (direction === "right" ? 1 : -1),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      className="projects-section relative py-24 scroll-mt-28 md:py-32"
    >
      <div className="relative">
        <motion.div
          className="mb-16 px-6 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-space-grotesk mb-6 text-4xl text-white tracking-tight md:text-5xl lg:text-6xl">
            {projectsCopy.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[#AAB7C4] leading-relaxed md:text-xl">
            {projectsCopy.description}
          </p>
        </motion.div>

        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="carousel-wrapper overflow-x-auto px-6 py-8 md:py-12"
          >
            <style>{`
              .projects-section {
                --project-card-width: ${PROJECT_CARD_WIDTH};
                --project-card-height: ${PROJECT_CARD_HEIGHT};
                --project-image-height: ${PROJECT_IMAGE_HEIGHT};
              }
              .carousel-wrapper {
                scrollbar-width: none;
                -ms-overflow-style: none;
                -webkit-overflow-scrolling: touch;
                scroll-snap-type: x mandatory;
                scroll-padding: 0 24px;
                overscroll-behavior-x: contain;
                scroll-behavior: smooth;
              }
              .carousel-wrapper::-webkit-scrollbar {
                display: none;
              }
              .carousel-track {
                display: flex;
                gap: 32px;
              }
              .project-card {
                width: var(--project-card-width);
                height: var(--project-card-height);
              }
              .project-card .project-card-image {
                height: var(--project-image-height);
              }
              @media (max-width: 768px) {
                .projects-section {
                  --project-card-width: clamp(280px, 88vw, 360px);
                  --project-card-height: clamp(520px, 72vh, 600px);
                  --project-image-height: 240px;
                }
                .carousel-wrapper {
                  scroll-snap-type: x proximity;
                  padding-left: 1rem;
                  padding-right: 1.25rem;
                }
                .carousel-track {
                  gap: 20px;
                  padding-right: 0.5rem;
                }
              }
            `}</style>
            <div className="carousel-track snap-x pl-2 pr-8 md:pl-4 md:pr-8">
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

          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-8">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCard("left")}
              className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0E1C26]/70 text-white shadow-xl transition hover:scale-[1.03] hover:border-white/20 hover:bg-[#132534]/90 md:flex"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCard("right")}
              className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0E1C26]/70 text-white shadow-xl transition hover:scale-[1.03] hover:border-white/20 hover:bg-[#132534]/90 md:flex"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
