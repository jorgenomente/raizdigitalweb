import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, BarChart3, Globe, Grid, HelpCircle, ArrowRight, ChevronRight, MessageCircle, Linkedin } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ServiceCard } from './components/ServiceCard';
import { AnimatedParticles } from './components/AnimatedParticles';
import HeaderNavigation from './imports/HeaderNavigation';

import imgImageWithFallback from "figma:asset/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png";
import imgImageWithFallback1 from "figma:asset/3459993693e7ead60b4bf9bcdd002ae1f7ffe7dc.png";
import imgImage from "figma:asset/27e0a25c06adf49df37f10e1cf6a32b3add48a30.png";
import imgImage1 from "figma:asset/715265d82cfd80d0c3c46d55c9970e2205d611d8.png";
import imgImage2 from "figma:asset/736e0560640ee75ce81d747a3cffb1019b8f6d6e.png";

export default function App() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Diseño de landing pages y sitios web',
      description: 'Páginas claras, modernas y pensadas para convertir. Diseñamos sitios que conectan con tu audiencia y transmiten tu mensaje de forma clara y persuasiva posicionándote desde el primer clic.',
      tag: 'IDEAL PARA →',
      ideal: 'Emprendedores y marcas que necesitan una web que atraiga, eduque y estimule en conversiones.',
      color: 'amber' as const,
      glowColor: 'rgba(245,158,11,0.05)'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Diseño de software a medida',
      description: 'Sistemas web que trabajan tu operación diaria. Desde dashboards hasta procesos complejos, creamos herramientas que optimizan tu negocio y conectan todo en un solo lugar.',
      tag: 'IDEAL PARA →',
      ideal: 'Equipos que necesitan automatizar integraciones, monitorizar y mapear sus datos.',
      color: 'blue' as const,
      glowColor: 'rgba(59,130,246,0.05)'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Diseño UX/UI + Producto Digital',
      description: 'Convertimos ideas en productos mínimos viables que puedes testar. Desde que arrancás hasta que escalás, te acompañamos en la experiencia del usuario.',
      tag: 'IDEAL PARA →',
      ideal: 'Startups, equipos de producto y empresas con sistemas, prototipos y validaciones.',
      color: 'cyan' as const,
      glowColor: 'rgba(34,211,238,0.05)'
    },
    {
      icon: <Grid className="w-8 h-8" />,
      title: 'Sistemas Operativos para Negocios',
      description: 'Organizamos tus procesos para que tu negocio fluya sin intervención constante. Coordinamos flujos de trabajo, automatización, controles de control y CRMs, alineados.',
      tag: 'IDEAL PARA →',
      ideal: 'Equipos sin estructura, defensores del control y procesos informales.',
      color: 'pink' as const,
      glowColor: 'rgba(236,72,153,0.05)'
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Consultoría en Producto + Estrategia Digital',
      description: 'Cuando aún confiar te revienta, te acompañamos a armar, validar y priorizar tus ideas. Te ayudamos a pensar el rumbo, el desarrollo.',
      tag: 'IDEAL PARA →',
      ideal: 'Founders, negocios en crecimiento, equipos sin táctica técnica.',
      color: 'teal' as const,
      glowColor: 'rgba(20,184,166,0.05)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden relative">
      {/* ⭐ Header Premium Sticky */}
      <HeaderNavigation />
      
      {/* ⭐ Glow Portal detrás del Header - Portal Activo */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[200px] pointer-events-none z-[45]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-b from-cyan-500/[0.06] via-purple-500/[0.04] to-transparent blur-[300px]"
          animate={{ opacity: [0.7, 0.85, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      
      {/* ⭐ Fondo Atmosférico Premium */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0d1f] to-[#0d0a1a]" />
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-950/[0.05] via-violet-950/[0.03] to-transparent blur-[160px] opacity-80" />
        <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-purple-950/[0.04] via-indigo-950/[0.02] to-transparent blur-[160px] opacity-80" />
        
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* ⭐ Partículas Animadas */}
      <AnimatedParticles />

      {/* ⭐ HERO SECTION — Cinematic Premium con Animaciones */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Aura Radial Principal - Breathing Effect */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1800px] h-[1200px] bg-gradient-radial from-cyan-500/[0.10] via-purple-500/[0.06] to-pink-500/[0.03] rounded-full blur-[800px]"
          animate={{ 
            scale: [0.98, 1.02, 0.98],
            opacity: [0.70, 0.80, 0.70]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="absolute top-[12%] left-[8%] w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[200px]" />
          <div className="absolute top-[25%] right-[12%] w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[200px]" />
          
          {/* Puntos luminosos cósmicos */}
          {[
            { top: '18%', left: '15%', size: 2 },
            { top: '25%', right: '20%', size: 1.5 },
            { top: '60%', left: '12%', size: 2 },
            { top: '70%', right: '25%', size: 1.5 }
          ].map((dot, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                width: `${dot.size}px`,
                height: `${dot.size}px`
              }}
              animate={{ opacity: [0.10, 0.15, 0.10] }}
              transition={{ duration: 3 + idx, repeat: Infinity, delay: idx * 0.5 }}
            />
          ))}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.01] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-8 py-32 text-center">
          {/* Halo Volumétrico Intensificado */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[600px] bg-gradient-radial from-purple-400/[0.12] via-cyan-400/[0.08] to-pink-400/[0.04] rounded-full blur-[700px]"
            animate={{ opacity: [0.55, 0.65, 0.55] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <div className="space-y-6 mb-10 relative">
            <h1 className="text-7xl leading-[1.1] tracking-tight" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', filter: 'contrast(1.05)' }}>
              {/* Línea 1 */}
              <motion.span 
                className="block text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: 0.1 }}
              >
                Sistemas digitales que
              </motion.span>
              
              {/* Línea 2 */}
              <motion.span 
                className="block mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: 0.18 }}
              >
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">conectan </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">estrategia</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">estrategia</span>
                </span>
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">, </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">diseño</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">diseño</span>
                </span>
              </motion.span>
              
              {/* Línea 3 */}
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: 0.26 }}
              >
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">y </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">y </span>
                </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">tecnología</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">tecnología</span>
                </span>
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">.</span>
              </motion.span>
            </h1>
          </div>

          <motion.p 
            className="text-[#B5C1CE] max-w-[620px] mx-auto mb-12 leading-relaxed font-[Space_Grotesk] text-[16px]" 
            style={{ WebkitFontSmoothing: 'antialiased' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.34 }}
          >
            Diseñamos sitios web, identidades y sistemas funcionales para generar experiencias y resultados reales.
          </motion.p>

          {/* Botón VisionOS Premium con Animaciones */}
          <motion.div 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.42 }}
          >
            <div className="relative group">
              {/* Aura circular más intensa */}
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-r from-cyan-400/[0.15] via-purple-500/[0.12] to-pink-500/[0.10] rounded-full blur-[60px]"
                animate={{ 
                  opacity: [0.60, 0.75, 0.60],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              <motion.button 
                className="relative px-10 py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] rounded-full overflow-hidden shadow-[0_0_32px_rgba(168,85,247,0.35),0_0_18px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_20px_rgba(34,211,238,0.1)]"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 48px rgba(168,85,247,0.5), 0 0 28px rgba(34,211,238,0.4), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 30px rgba(34,211,238,0.15)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
              >
                <div className="absolute inset-0 rounded-full border border-cyan-400/[0.12] shadow-[inset_0_0_15px_rgba(34,211,238,0.08)]" />
                
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.15] to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] blur-xl"
                  initial={{ opacity: 0.15 }}
                  whileHover={{ opacity: 0.45 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative flex items-center gap-3">
                  <span className="text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-[Space_Grotesk]">Explorar servicios</span>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continue with other sections... */}
      {/* Due to length, I'll create a continuation file */}
    </div>
  );
}
