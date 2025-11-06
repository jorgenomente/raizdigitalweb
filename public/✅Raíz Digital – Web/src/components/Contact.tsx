import { motion } from "motion/react";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1C26] via-[#111418] to-[#0E1C26]" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#4FD4E4] rounded-full opacity-15 blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#D55FA3] rounded-full opacity-15 blur-[120px]" />
      
      {/* Geometric Mesh */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 100 M 0 0 L 100 100" stroke="#4FD4E4" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh)" />
      </svg>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl mb-6 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            ¿Listo para crear tu{" "}
            <span className="bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] bg-clip-text text-transparent">
              sistema?
            </span>
          </h2>
          <p className="text-xl text-[#AAB7C4] max-w-2xl mx-auto">
            Conectemos y diseñemos experiencias digitales que evolucionan.
          </p>
        </motion.div>
        
        {/* Contact Card */}
        <motion.div
          className="relative bg-[#0E1C26]/50 backdrop-blur-sm border border-[#4FD4E4]/30 rounded-2xl p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glowing Frame */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4FD4E4]/20 to-[#D55FA3]/20 blur-sm" />
          </div>
          
          {/* Content */}
          <div className="relative space-y-8">
            {/* Email Input */}
            <div className="space-y-4">
              <label className="block text-[#AAB7C4] text-sm tracking-wide" style={{ fontFamily: 'Geist Mono, monospace' }}>
                TU EMAIL
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4FD4E4] opacity-70" />
                <input
                  type="email"
                  placeholder="contacto@tuempresa.com"
                  className="w-full bg-[#111418] border border-[#AAB7C4]/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-[#AAB7C4]/50 focus:outline-none focus:border-[#4FD4E4] focus:shadow-[0_0_20px_rgba(79,212,228,0.2)] transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="space-y-4">
              <label className="block text-[#AAB7C4] text-sm tracking-wide" style={{ fontFamily: 'Geist Mono, monospace' }}>
                MENSAJE
              </label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#D55FA3] opacity-70" />
                <textarea
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full bg-[#111418] border border-[#AAB7C4]/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-[#AAB7C4]/50 focus:outline-none focus:border-[#D55FA3] focus:shadow-[0_0_20px_rgba(213,95,163,0.2)] transition-all duration-300 resize-none"
                />
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-[#4FD4E4] to-[#D55FA3] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(79,212,228,0.6)] hover:scale-105">
                <span className="relative z-10 flex items-center gap-2 text-[#111418]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Contactar equipo
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-[#AAB7C4]" style={{ fontFamily: 'Geist Mono, monospace' }}>
            <span className="text-[#4FD4E4]">→</span> contacto@raizdigital.com
          </p>
          <div className="flex items-center justify-center gap-8 pt-4">
            <a href="#" className="text-[#AAB7C4] hover:text-[#4FD4E4] transition-colors duration-300">
              LinkedIn
            </a>
            <span className="text-[#AAB7C4]/30">•</span>
            <a href="#" className="text-[#AAB7C4] hover:text-[#D55FA3] transition-colors duration-300">
              Instagram
            </a>
            <span className="text-[#AAB7C4]/30">•</span>
            <a href="#" className="text-[#AAB7C4] hover:text-[#4FD4E4] transition-colors duration-300">
              Behance
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto mt-20 pt-12 border-t border-[#AAB7C4]/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#AAB7C4]/70 text-sm">
          <p style={{ fontFamily: 'Geist Mono, monospace' }}>
            © 2025 Raíz Digital. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#4FD4E4] rounded-full animate-pulse" />
            Sistema activo
          </p>
        </div>
      </motion.div>
    </section>
  );
}
