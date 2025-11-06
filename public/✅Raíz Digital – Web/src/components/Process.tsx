import { motion } from "motion/react";
import { Search, Layers, Code, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Análisis profundo de necesidades, objetivos y contexto digital.",
    icon: Search,
    color: "#4FD4E4"
  },
  {
    number: "02",
    title: "Diseño de sistema",
    description: "Arquitectura de información, wireframes y sistema de diseño modular.",
    icon: Layers,
    color: "#D55FA3"
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Implementación técnica con código limpio, escalable y performante.",
    icon: Code,
    color: "#4FD4E4"
  },
  {
    number: "04",
    title: "Evolución continua",
    description: "Optimización, análisis y adaptación constante del sistema.",
    icon: TrendingUp,
    color: "#D55FA3"
  }
];

export function Process() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#111418]" />
      
      {/* Glowing Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D55FA3] rounded-full opacity-15 blur-[120px]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Proceso de creación
          </h2>
          <p className="text-xl text-[#AAB7C4] max-w-2xl mx-auto">
            Un flujo iterativo que conecta estrategia, diseño y tecnología.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#4FD4E4] via-[#D55FA3] to-[#4FD4E4]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block bg-[#0E1C26] border border-[#AAB7C4]/20 rounded-xl p-8 hover:border-[#4FD4E4] transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,212,228,0.2)]">
                      <div className="flex items-start gap-4" style={{ flexDirection: isEven ? 'row-reverse' : 'row' }}>
                        <div className="flex-1">
                          <div className="mb-2">
                            <span 
                              className="text-sm tracking-widest" 
                              style={{ fontFamily: 'Geist Mono, monospace', color: step.color }}
                            >
                              {step.number}
                            </span>
                          </div>
                          <h3 className="text-2xl mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {step.title}
                          </h3>
                          <p className="text-[#AAB7C4]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 flex items-center justify-center bg-[#111418] z-10 relative"
                      style={{ borderColor: step.color }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={2} />
                    </motion.div>
                    
                    {/* Pulsing Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{ background: step.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </div>
                  
                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
