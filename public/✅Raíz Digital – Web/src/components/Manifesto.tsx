import { motion } from "motion/react";

export function Manifesto() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#111418]" />
      
      {/* Glowing Accent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4FD4E4] rounded-full opacity-10 blur-[150px]" />
      
      {/* Network Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="400" height="400" viewBox="0 0 400 400">
          {/* Center Node */}
          <motion.circle
            cx="200" cy="200" r="8"
            fill="#4FD4E4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Radiating Nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const distance = 120;
            const x = 200 + Math.cos(rad) * distance;
            const y = 200 + Math.sin(rad) * distance;
            
            return (
              <g key={i}>
                <motion.line
                  x1="200" y1="200"
                  x2={x} y2={y}
                  stroke={i % 2 === 0 ? "#4FD4E4" : "#D55FA3"}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
                <motion.circle
                  cx={x} cy={y} r="4"
                  fill={i % 2 === 0 ? "#4FD4E4" : "#D55FA3"}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                />
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-12 text-[#4FD4E4]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            La raíz del sistema.
          </h2>
        </motion.div>
        
        <motion.div
          className="space-y-6 text-lg md:text-xl text-[#AAB7C4] leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>No nacimos en la tierra, sino en la red.</p>
          <p>Somos la raíz invisible que conecta ideas, datos y personas.</p>
          <p className="text-white">
            Diseñamos <span className="text-[#4FD4E4]">estructuras que piensan</span>,{" "}
            <span className="text-[#D55FA3]">sistemas que aprenden</span> y{" "}
            <span className="text-[#4FD4E4]">experiencias que evolucionan</span>.
          </p>
        </motion.div>
        
        {/* Divider */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-[#4FD4E4] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </section>
  );
}
