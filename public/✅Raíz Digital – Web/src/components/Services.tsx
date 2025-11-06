import { motion, useScroll, useTransform } from "motion/react";
import { Brain, Layers, Code, Palette, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const services = [
  {
    icon: Brain,
    title: "Estrategia digital",
    subtitle: "Planificación, performance, coherencia de marca.",
    description: "Construimos la arquitectura estratégica de tu presencia digital.",
    color: "#4FD4E4"
  },
  {
    icon: Layers,
    title: "Diseño UX/UI",
    subtitle: "Interfaces limpias, experiencias humanas.",
    description: "Diseñamos sistemas visuales que conectan con las personas.",
    color: "#D55FA3"
  },
  {
    icon: Code,
    title: "Desarrollo web",
    subtitle: "Sistemas rápidos, claros, escalables.",
    description: "Código limpio que transforma ideas en experiencias reales.",
    color: "#4FD4E4"
  },
  {
    icon: Palette,
    title: "Branding & identidad",
    subtitle: "Marcas consistentes y funcionales.",
    description: "Identidades visuales que comunican con claridad y propósito.",
    color: "#D55FA3"
  },
  {
    icon: Brain,
    title: "Consultoría digital",
    subtitle: "Auditoría, análisis, optimización.",
    description: "Evaluamos y mejoramos tu ecosistema digital actual.",
    color: "#4FD4E4"
  }
];

export function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (container) {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          
          // If we've reached the end, scroll back to start
          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 1, behavior: 'auto' });
          }
        }
      }, 30);
    };

    // Start auto-scroll after a delay
    const timeout = setTimeout(startAutoScroll, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(scrollInterval);
    };
  }, [isAutoScrolling]);

  const handleManualScroll = () => {
    setIsAutoScrolling(false);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] via-[#0E1C26] to-[#111418]" />
      
      {/* Animated Neural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(#4FD4E4 1px, transparent 1px), 
              linear-gradient(90deg, #4FD4E4 1px, transparent 1px),
              radial-gradient(circle at 20% 50%, #D55FA3 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, #4FD4E4 0%, transparent 50%)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100% 100%, 100% 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%, 0% 0%, 20% 50%, 80% 50%', '2% 2%, 2% 2%, 25% 55%, 75% 45%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4FD4E4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D55FA3]/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - Fixed, Centered, Minimal */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Módulos del sistema
          </h2>
          <p className="text-xl text-[#AAB7C4] max-w-2xl mx-auto">
            Cada servicio es un nodo en la red de tu proyecto digital.
          </p>
        </motion.div>
        
        {/* Portfolio Showcase Container */}
        <div className="relative">
          {/* Left Fade Indicator */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none transition-opacity duration-500 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(to right, #0E1C26, transparent)'
            }}
          />
          
          {/* Right Fade Indicator */}
          <div 
            className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none transition-opacity duration-500 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(to left, #0E1C26, transparent)'
            }}
          />

          {/* Scrollable Showcase */}
          <div
            ref={scrollContainerRef}
            onScroll={() => {
              checkScrollButtons();
              handleManualScroll();
            }}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 py-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative flex-shrink-0 w-[300px] snap-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Card */}
                  <div 
                    className="relative h-full bg-[#0E1C26]/80 backdrop-blur-xl rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                    style={{
                      border: `1px solid ${service.color}30`,
                      boxShadow: `
                        0 10px 40px rgba(0, 0, 0, 0.3),
                        inset 0 0 60px ${service.color}08
                      `
                    }}
                  >
                    {/* Light Reflection on Hover */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, ${service.color}15 50%, transparent 100%)`,
                      }}
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: 0,
                        ease: 'easeInOut'
                      }}
                    />

                    {/* Enhanced Hover Glow */}
                    <div 
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}20, transparent)`,
                      }}
                    />

                    {/* Depth Shadow on Hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `
                          0 20px 60px ${service.color}25,
                          0 0 80px ${service.color}15,
                          inset 0 0 80px ${service.color}10
                        `
                      }}
                    />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon Thumbnail */}
                      <div className="mb-8">
                        <motion.div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-500"
                          style={{ 
                            borderColor: `${service.color}60`,
                            background: `radial-gradient(circle at center, ${service.color}15, transparent 70%)`,
                            boxShadow: `0 0 30px ${service.color}20`
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            rotate: [0, -8, 8, 0],
                            boxShadow: `0 0 40px ${service.color}40`
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-9 h-9" style={{ color: service.color }} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 
                          className="text-2xl mb-3 text-white transition-all duration-300 group-hover:tracking-wide" 
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-[#AAB7C4] mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {service.subtitle}
                        </p>
                        
                        {/* Ver más Arrow Button */}
                        <div className="mt-auto pt-4">
                          <motion.button
                            className="group/btn flex items-center gap-2 text-sm transition-all duration-300"
                            style={{ 
                              color: service.color,
                              fontFamily: 'Geist Mono, monospace'
                            }}
                            whileHover={{ x: 4 }}
                          >
                            <span className="relative">
                              Ver más
                              {/* Underline */}
                              <span 
                                className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover/btn:w-full"
                                style={{ backgroundColor: service.color }}
                              />
                            </span>
                            
                            {/* Arrow with Glow */}
                            <div className="relative">
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2} />
                              
                              {/* Glow Effect */}
                              <motion.div
                                className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100"
                                style={{
                                  boxShadow: `0 0 20px ${service.color}60`,
                                  filter: 'blur(8px)'
                                }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 0.5
                                }}
                              />
                            </div>
                          </motion.button>
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500" 
                        style={{ 
                          background: `linear-gradient(to right, ${service.color}, transparent)`,
                          boxShadow: `0 0 10px ${service.color}60`
                        }} 
                      />

                      {/* Top Accent Line */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500" 
                        style={{ 
                          background: `linear-gradient(to right, transparent, ${service.color})`,
                          boxShadow: `0 0 10px ${service.color}60`
                        }} 
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Spacer for better scrolling */}
            <div className="flex-shrink-0 w-4" />
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          className="flex justify-center items-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex gap-2">
            {services.slice(0, 5).map((service, index) => (
              <motion.div 
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: service.color }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
          <motion.p 
            className="text-xs text-[#AAB7C4]/60 tracking-wide"
            style={{ fontFamily: 'Geist Mono, monospace' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Desliza para explorar
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Connection Lines */}
      <svg className="absolute left-0 right-0 bottom-32 h-px pointer-events-none opacity-20 overflow-visible">
        <motion.line
          x1="10%" y1="0" x2="90%" y2="0"
          stroke="url(#serviceGradient)"
          strokeWidth="2"
          strokeDasharray="8,4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <defs>
          <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4FD4E4" />
            <stop offset="25%" stopColor="#D55FA3" />
            <stop offset="50%" stopColor="#4FD4E4" />
            <stop offset="75%" stopColor="#D55FA3" />
            <stop offset="100%" stopColor="#4FD4E4" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
