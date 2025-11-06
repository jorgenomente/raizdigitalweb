import { motion } from "motion/react";
import { Lightbulb, Palette, Code2, Award, MessageCircle, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const services = [
  {
    icon: Lightbulb,
    title: "Estrategia Digital",
    description: "Planificación integral y arquitectura de ecosistemas digitales",
    color: "#4FD4E4",
    position: "top"
  },
  {
    icon: Palette,
    title: "Diseño UX/UI",
    description: "Interfaces centradas en las personas y sistemas coherentes",
    color: "#D55FA3",
    position: "bottom"
  },
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Código limpio, escalable y arquitecturas modernas",
    color: "#4FD4E4",
    position: "top"
  },
  {
    icon: Award,
    title: "Branding & Identidad",
    description: "Marcas consistentes con claridad y propósito",
    color: "#D55FA3",
    position: "bottom"
  },
  {
    icon: MessageCircle,
    title: "Consultoría Digital",
    description: "Análisis y optimización de performance digital",
    color: "#4FD4E4",
    position: "top"
  }
];

// Static breathing particle - no path animation
function BreathingParticle({ x, color, delay }: { x: string; color: string; delay: number }) {
  return (
    <motion.circle
      cx={x}
      cy="350"
      r="3"
      fill={color}
      style={{ 
        filter: `drop-shadow(0 0 8px ${color})`,
        pointerEvents: 'none'
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.4, 0.8],
        r: [2.5, 4, 2.5]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Gentle oscillating light on vertical lines
function LineGlow({ xPos, yStart, yEnd, color, delay }: { xPos: number; yStart: number; yEnd: number; color: string; delay: number }) {
  const midY = (yStart + yEnd) / 2;
  
  return (
    <motion.circle
      cx={xPos}
      cy={midY}
      r="4"
      fill={color}
      style={{ 
        filter: `drop-shadow(0 0 10px ${color})`,
        pointerEvents: 'none'
      }}
      animate={{
        cy: [yStart + 40, yEnd - 40, yStart + 40],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.6, 1.2, 0.6]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function ServicesGrid() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll with debounce
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
      }, 300);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#111418]" />
      
      {/* Parallax Background Layer - Slow moving neural lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-[120%] h-[120%]" 
          style={{
            backgroundImage: `
              linear-gradient(#4FD4E4 1px, transparent 1px), 
              linear-gradient(90deg, #D55FA3 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            left: '-10%',
            top: '-10%'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Static Neural Grid Pattern (foreground) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(#4FD4E4 1px, transparent 1px), 
              linear-gradient(90deg, #D55FA3 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Ambient Glows - Reduced animation complexity */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4FD4E4] rounded-full blur-[150px] pointer-events-none" 
        style={{
          opacity: 0.1,
          animation: 'pulse-glow-cyan 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D55FA3] rounded-full blur-[150px] pointer-events-none"
        style={{
          opacity: 0.1,
          animation: 'pulse-glow-magenta 8s ease-in-out infinite',
          animationDelay: '4s'
        }}
      />

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
      
      {/* Content - Flex container for proper spacing */}
      <div className="relative z-10 flex flex-col justify-center flex-1 py-16 md:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Servicios
          </h2>
          <p className="text-xl text-[#AAB7C4] max-w-2xl mx-auto mb-8">
            Soluciones digitales integrales que conectan estrategia, diseño y tecnología.
          </p>
          
          {/* Enhanced Scroll Cue */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <p 
              className="text-sm text-[#AAB7C4]/80 tracking-wide flex items-center gap-2"
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              Desliza para explorar los servicios
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4 text-[#4FD4E4]" strokeWidth={2} />
              </motion.span>
            </p>
            {/* Glowing animated line */}
            <motion.div
              className="w-32 h-0.5 rounded-full"
              style={{
                background: 'linear-gradient(to right, transparent, #4FD4E4, #D55FA3, transparent)',
                boxShadow: '0 0 10px #4FD4E4, 0 0 20px #D55FA3'
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleX: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Scrollable Network Diagram Container */}
        <div className="relative flex-1 flex items-center">
          {/* Left Fade Gradient */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-30 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #111418 0%, #111418 20%, transparent 100%)'
            }}
          />
          
          {/* Right Fade Gradient */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-30 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, #111418 0%, #111418 20%, transparent 100%)'
            }}
          />

          {/* Animated SVG Overlay - Decoupled from scroll */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="relative w-full h-full flex items-center">
              <svg 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none overflow-visible" 
                viewBox="0 0 2000 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Enhanced Gradient for Path */}
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.7" />
                    <stop offset="33%" stopColor="#D55FA3" stopOpacity="0.7" />
                    <stop offset="66%" stopColor="#4FD4E4" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D55FA3" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Glow Filters */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main Connection Path */}
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

                {/* Ambient Glow Layer */}
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

                {/* Breathing Particles - Static positions with breathing animation */}
                <BreathingParticle x="280" color="#4FD4E4" delay={0} />
                <BreathingParticle x="600" color="#D55FA3" delay={0.8} />
                <BreathingParticle x="1000" color="#4FD4E4" delay={1.6} />
                <BreathingParticle x="1320" color="#D55FA3" delay={2.4} />
                <BreathingParticle x="1640" color="#4FD4E4" delay={3.2} />

                {/* Vertical Connection Lines with Pulsating Glow */}
                {services.map((service, index) => {
                  const xPos = 280 + (index * 320);
                  const yStart = 300;
                  const yEnd = service.position === "top" ? 100 : 500;
                  
                  return (
                    <g key={`line-group-${index}`}>
                      {/* Glow Layer - Pulsing with CSS */}
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
                          animation: `line-pulse-${index} 3s ease-in-out infinite`,
                          transition: 'opacity 0.3s ease'
                        }}
                      />

                      {/* Main Line */}
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
                        whileInView={{ pathLength: 1, opacity: activeNode === index ? 0.8 : 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
                      />

                      {/* Gentle oscillating light */}
                      <LineGlow 
                        xPos={xPos} 
                        yStart={yStart} 
                        yEnd={yEnd} 
                        color={service.color} 
                        delay={index * 0.6} 
                      />
                    </g>
                  );
                })}
              </svg>

              {/* CSS Keyframes for line pulsing */}
              <style>{`
                ${services.map((_, index) => `
                  @keyframes line-pulse-${index} {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                  }
                `).join('\n')}
              `}</style>
            </div>
          </div>

          {/* Horizontal Scroll Container - Fixed CSS with snap */}
          <div
            ref={scrollContainerRef}
            className="relative z-20 w-full services-scroll-container"
            style={{
              overflowX: 'scroll',
              overflowY: 'visible',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              transform: 'none'
            }}
          >
            <style>{`
              .services-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Extended Width Container */}
            <div className="relative h-[600px] w-[2000px] px-32 md:px-64">
              {/* Service Nodes */}
              <div className="relative w-full h-full flex items-center">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isTop = service.position === "top";
                  const leftPos = 14 + (index * 16);
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${leftPos}%`,
                        top: isTop ? '8%' : '58%',
                        transform: 'translateX(-50%)',
                        scrollSnapAlign: 'center'
                      }}
                      initial={{ opacity: 0, scale: 0, y: isTop ? -30 : 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: 0.3 + index * 0.15, type: "spring" }}
                      onMouseEnter={() => setActiveNode(index)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      {/* Node Content Container */}
                      <div className="flex flex-col items-center max-w-[220px]">
                        {/* Description (Top nodes) */}
                        {isTop && (
                          <motion.div 
                            className="mb-6 text-center"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.15 }}
                          >
                            <h3 
                              className="text-lg mb-2 text-white"
                              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                              {service.title}
                            </h3>
                            <p 
                              className="text-sm text-[#AAB7C4] leading-relaxed"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {service.description}
                            </p>
                          </motion.div>
                        )}

                        {/* Central Node with Ambient Light */}
                        <div 
                          className="relative group cursor-pointer"
                          style={{
                            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.12)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {/* Ambient Light Emission - CSS animation */}
                          <div
                            className="absolute -inset-16 rounded-full pointer-events-none"
                            style={{
                              background: `radial-gradient(circle, ${service.color}25 0%, ${service.color}10 40%, transparent 70%)`,
                              filter: 'blur(40px)',
                              opacity: activeNode === index ? 0.8 : 0.4,
                              animation: `ambient-pulse-${index} 3s ease-in-out infinite`,
                              transition: 'opacity 0.3s ease'
                            }}
                          />

                          {/* Pulsing Ring */}
                          <div
                            className="absolute -inset-5 rounded-full border-2 pointer-events-none"
                            style={{
                              borderColor: service.color,
                              boxShadow: `0 0 20px ${service.color}60`,
                              animation: `ring-pulse-${index} 2.5s ease-out infinite`
                            }}
                          />

                          {/* Main Node Circle */}
                          <div 
                            className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 bg-[#0E1C26] z-10"
                            style={{ 
                              borderColor: service.color,
                              boxShadow: `
                                0 0 40px ${service.color}70,
                                0 0 60px ${service.color}40,
                                inset 0 0 40px ${service.color}25
                              `,
                              animation: `node-glow-${index} 3s ease-in-out infinite`
                            }}
                          >
                            <Icon 
                              className="w-10 h-10" 
                              style={{ color: service.color }} 
                              strokeWidth={1.5} 
                            />

                            {/* Active Node Pulse */}
                            {activeNode === index && (
                              <div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{
                                  background: `radial-gradient(circle, ${service.color}30, transparent)`,
                                  animation: 'active-pulse 1.5s ease-in-out infinite'
                                }}
                              />
                            )}
                          </div>

                          {/* Micro Light Flickers - Reduced to 2 for performance */}
                          {[0, 2].map((i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full pointer-events-none"
                              style={{
                                backgroundColor: service.color,
                                boxShadow: `0 0 6px ${service.color}`,
                                left: `${50 + Math.cos((i / 4) * Math.PI * 2) * 60}px`,
                                top: `${50 + Math.sin((i / 4) * Math.PI * 2) * 60}px`,
                                animation: `flicker-${i} 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.5 + index * 0.2}s`
                              }}
                            />
                          ))}

                          {/* Node Number Badge */}
                          <motion.div 
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#111418] z-20"
                            style={{ 
                              borderColor: service.color,
                              boxShadow: `0 0 15px ${service.color}60`
                            }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + index * 0.15, type: "spring" }}
                          >
                            <span 
                              className="text-xs"
                              style={{ 
                                fontFamily: 'Geist Mono, monospace',
                                color: service.color
                              }}
                            >
                              0{index + 1}
                            </span>
                          </motion.div>

                          {/* CSS Animations for this node */}
                          <style>{`
                            @keyframes ambient-pulse-${index} {
                              0%, 100% { transform: scale(1); opacity: 0.3; }
                              50% { transform: scale(1.2); opacity: 0.6; }
                            }
                            @keyframes ring-pulse-${index} {
                              0% { transform: scale(1); opacity: 0.5; }
                              100% { transform: scale(1.4); opacity: 0; }
                            }
                            @keyframes node-glow-${index} {
                              0%, 100% { 
                                box-shadow: 
                                  0 0 40px ${service.color}70,
                                  0 0 60px ${service.color}40,
                                  inset 0 0 40px ${service.color}25;
                              }
                              50% { 
                                box-shadow: 
                                  0 0 50px ${service.color}80,
                                  0 0 70px ${service.color}50,
                                  inset 0 0 45px ${service.color}30;
                              }
                            }
                            @keyframes flicker-0 {
                              0%, 100% { opacity: 0; transform: scale(0.5); }
                              50% { opacity: 1; transform: scale(1.5); }
                            }
                            @keyframes flicker-2 {
                              0%, 100% { opacity: 0; transform: scale(0.5); }
                              50% { opacity: 1; transform: scale(1.5); }
                            }
                            @keyframes active-pulse {
                              0% { transform: scale(1); opacity: 1; }
                              50% { transform: scale(1.6); opacity: 0; }
                              100% { transform: scale(1); opacity: 1; }
                            }
                          `}</style>
                        </div>

                        {/* Description (Bottom nodes) */}
                        {!isTop && (
                          <motion.div 
                            className="mt-6 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.15 }}
                          >
                            <h3 
                              className="text-lg mb-2 text-white"
                              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                              {service.title}
                            </h3>
                            <p 
                              className="text-sm text-[#AAB7C4] leading-relaxed"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator - Positioned at bottom with reduced spacing */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-8 pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex gap-1.5">
            {services.map((service, i) => (
              <div
                key={i}
                className="w-1 h-6 rounded-full"
                style={{ 
                  background: `linear-gradient(to top, ${service.color}, transparent)`,
                  boxShadow: `0 0 8px ${service.color}60`,
                  animation: `bar-pulse 1.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          <p 
            className="text-xs text-[#AAB7C4]/60 tracking-wider"
            style={{ 
              fontFamily: 'Geist Mono, monospace',
              animation: 'text-pulse 2.5s ease-in-out infinite'
            }}
          >
            FLUJO ACTIVO
          </p>
        </motion.div>

        <style>{`
          @keyframes bar-pulse {
            0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
            50% { transform: scaleY(1); opacity: 1; }
          }
          @keyframes text-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
