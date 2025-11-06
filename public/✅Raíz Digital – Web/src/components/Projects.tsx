import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "NexaFlow",
    subtitle: "Plataforma de gestión digital",
    image: "https://images.unsplash.com/photo-1669062897193-f8a4215c2033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2MTQ3NzE5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["UX/UI", "Desarrollo Web", "Estrategia"],
    color: "#4FD4E4"
  },
  {
    title: "Clarity App",
    subtitle: "Sistema de productividad móvil",
    image: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxNTU0NzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["UX/UI", "Branding"],
    color: "#D55FA3"
  },
  {
    title: "Elevate Studio",
    subtitle: "Identidad visual y branding",
    image: "https://images.unsplash.com/photo-1636247498840-693054bb4bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NjE0NjIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Branding", "Estrategia"],
    color: "#4FD4E4"
  },
  {
    title: "DataPulse",
    subtitle: "Dashboard analítico empresarial",
    image: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MTUyMDAzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["UX/UI", "Desarrollo Web"],
    color: "#D55FA3"
  },
  {
    title: "Commerce One",
    subtitle: "E-commerce de nueva generación",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2MTUwMzAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Desarrollo Web", "UX/UI", "Estrategia"],
    color: "#4FD4E4"
  }
];

function ProjectCard({ project, index, isScrolling }: { project: typeof projects[0], index: number, isScrolling: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isScrolling) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="flex-shrink-0 w-[80vw] sm:w-[350px] md:w-[380px] lg:w-[420px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isScrolling && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <motion.div
        className="relative h-full bg-[#0E1C26]/60 backdrop-blur-xl rounded-3xl overflow-hidden"
        style={{
          border: `1px solid ${project.color}20`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4)`,
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.08,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={{
          scale: 1.02,
          transition: { 
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
      >
        {/* Enhanced Depth Shadow - ONLY on hover */}
        {isHovered && (
          <motion.div 
            className="absolute -inset-2 rounded-3xl blur-2xl -z-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}

        {/* Soft Reflection Glow - ONLY on hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${project.color}10 40%, transparent 100%)`,
            }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '200%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          />
        )}

        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E1C26]/90" />

          {/* Top Glow Line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity"
            style={{ 
              background: `linear-gradient(to right, ${project.color}, transparent)`,
              boxShadow: `0 0 15px ${project.color}80`,
              opacity: isHovered ? 1 : 0.6,
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }} 
          />
        </div>

        {/* Content Section */}
        <div className="relative p-6 md:p-8 pt-6">
          {/* Title & Subtitle */}
          <h3 
            className="text-xl md:text-2xl mb-2 text-white transition-all"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: isHovered ? '0.02em' : 'normal',
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            {project.title}
          </h3>
          
          <p 
            className="text-sm md:text-base text-[#AAB7C4] mb-4 md:mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {project.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs border transition-all"
                style={{ 
                  fontFamily: 'Geist Mono, monospace',
                  borderColor: `${project.color}40`,
                  background: `${project.color}10`,
                  color: project.color,
                  transitionDuration: '0.4s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ver caso link */}
          <a
            href="#"
            className="group/link inline-flex items-center gap-2 text-sm transition-all"
            style={{ 
              color: project.color,
              fontFamily: 'Inter, sans-serif',
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            <span className="relative">
              Ver caso
              <span 
                className="absolute bottom-0 left-0 w-0 h-[1px] group-hover/link:w-full transition-all"
                style={{ 
                  backgroundColor: project.color,
                  boxShadow: `0 0 8px ${project.color}80`,
                  transitionDuration: '0.4s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              />
            </span>
            
            <ArrowRight 
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
              strokeWidth={2}
              style={{
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />
          </a>

          {/* Bottom Neural Line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity" 
            style={{ 
              background: `linear-gradient(to right, transparent, ${project.color})`,
              boxShadow: `0 0 10px ${project.color}60`,
              opacity: isHovered ? 1 : 0.4,
              transitionDuration: '0.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }} 
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
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

    const handleWheel = (e: WheelEvent) => {
      // Only hijack horizontal scroll when there's horizontal content to scroll
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
      
      // If user is scrolling horizontally or there's room to scroll horizontally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || (canScrollLeft && e.deltaY < 0) || (canScrollRight && e.deltaY > 0)) {
        e.preventDefault();
        const scrollAmount = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 1.2;
        container.scrollLeft += scrollAmount;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      {/* Background Layer - Below everything with pointer-events-none */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C26] via-[#111418] to-[#0E1C26]" />
        
        {/* Static Neural Grid */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(#4FD4E4 1px, transparent 1px), 
                linear-gradient(90deg, #D55FA3 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Static Glowing Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FD4E4] rounded-full opacity-15 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D55FA3] rounded-full opacity-15 blur-[140px]" />
        
        {/* Decorative Neural Lines */}
        <svg className="absolute left-0 right-0 top-1/3 h-px opacity-10 overflow-visible">
          <motion.line
            x1="15%" y1="0" x2="85%" y2="0"
            stroke="url(#projectsGradient)"
            strokeWidth="2"
            strokeDasharray="12,6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 2.5, 
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
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
      
      {/* Content - No overflow restrictions */}
      <div className="relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Proyectos
          </h2>
          <p className="text-lg md:text-xl text-[#AAB7C4] max-w-3xl mx-auto leading-relaxed">
            Exploramos el diseño, la estrategia y la tecnología a través de proyectos que evolucionan.
          </p>
        </motion.div>
        
        {/* Horizontal Scroll Frame - Viewport width with clipping */}
        <div className="relative w-full">
          {/* Left Edge Fade Indicator */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(14, 28, 38, 1) 0%, rgba(14, 28, 38, 0.8) 30%, transparent 100%)'
            }}
          />
          
          {/* Right Edge Fade Indicator */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(14, 28, 38, 1) 0%, rgba(14, 28, 38, 0.8) 30%, transparent 100%)'
            }}
          />

          {/* Horizontal Scrolling Container - Clean native scroll */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto py-8 md:py-12 px-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x proximity',
              // Allow vertical scroll to pass through
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'auto'
            }}
          >
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Inner Container - Auto width based on content */}
            <div 
              className="flex gap-6 md:gap-8"
              style={{
                width: 'max-content'
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index}
                  isScrolling={isScrolling}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div 
          className="flex justify-center items-center gap-4 mt-12 md:mt-16 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Progress Bar */}
          <div className="w-32 h-1 bg-[#AAB7C4]/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] rounded-full"
              style={{
                width: `${(scrollProgress * 100)}%`,
                transition: 'width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: project.color }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
            ))}
          </div>

          {/* Helper Text */}
          <motion.p 
            className="text-xs text-[#AAB7C4]/60 tracking-wide hidden md:block"
            style={{ fontFamily: 'Geist Mono, monospace' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            Desliza para explorar
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
