import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1C26] via-[#111418] to-[#0E1C26]" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#4FD4E4] rounded-full opacity-20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D55FA3] rounded-full opacity-20 blur-[120px]" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#4FD4E4 1px, transparent 1px), linear-gradient(90deg, #4FD4E4 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Network Lines - Animated */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <motion.line
          x1="10%" y1="20%" x2="90%" y2="80%"
          stroke="#4FD4E4"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="80%" y1="30%" x2="20%" y2="90%"
          stroke="#D55FA3"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <motion.circle
          cx="10%" cy="20%"
          r="4"
          fill="#4FD4E4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        />
        <motion.circle
          cx="90%" cy="80%"
          r="4"
          fill="#4FD4E4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        />
        <motion.circle
          cx="80%" cy="30%"
          r="4"
          fill="#D55FA3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
        <motion.circle
          cx="20%" cy="90%"
          r="4"
          fill="#D55FA3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
      </svg>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-8 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Sistemas digitales que conectan{" "}
            <span className="bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] bg-clip-text text-transparent">
              estrategia, diseño y tecnología.
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl mb-12 text-[#AAB7C4] max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Creamos estructuras vivas: interfaces claras, marcas coherentes y experiencias que fluyen.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,212,228,0.5)] hover:scale-105">
            <span className="relative z-10 flex items-center gap-2 text-[#111418]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Explorar servicios
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-[#4FD4E4] rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-[#4FD4E4] rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
