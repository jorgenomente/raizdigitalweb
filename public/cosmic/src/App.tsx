import { useState } from 'react';
import { motion } from 'framer-motion';
import svgPaths from "./imports/svg-iym5qmkcre";
import buttonSvgPaths from "./imports/svg-2rk13gqsah";
import imgImageWithFallback from "figma:asset/a7df96fb1a4777ac3a12f069252b5fa83a83c355.png";
import imgImageWithFallback1 from "figma:asset/3459993693e7ead60b4bf9bcdd002ae1f7ffe7dc.png";
import imgImageJorgeAvatarIa from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgImage from "figma:asset/27e0a25c06adf49df37f10e1cf6a32b3add48a30.png";
import imgImageJorgeFotoReal from "figma:asset/10501cf400fdc068fa6a0ec1f420ff63aaa02b7f.png";
import imgImage1 from "figma:asset/715265d82cfd80d0c3c46d55c9970e2205d611d8.png";
import imgImage2 from "figma:asset/736e0560640ee75ce81d747a3cffb1019b8f6d6e.png";
import { imgVector } from "./imports/svg-9174p";
import { User, BarChart3, Globe, Grid, HelpCircle, ArrowRight, ChevronRight, MessageCircle, Linkedin } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import HeaderNavigation from './imports/HeaderNavigation';
import { CinematicAurora } from './components/CinematicAurora';

export default function App() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [revealedCards, setRevealedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCardReveal = (idx: number) => {
    setRevealedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden relative">
      {/* ⭐ Header Premium Sticky */}
      <HeaderNavigation />
      
      {/* ⭐ Glow Portal detrás del Header - Portal Activo */}
      <div className="fixed top-0 left-0 right-0 h-[200px] pointer-events-none z-[45]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-b from-cyan-500/[0.06] via-purple-500/[0.04] to-transparent blur-[300px] opacity-[0.7]" />
      </div>
      
      {/* ⭐ Fondo Atmosférico Premium - Gradiente Ultra-Suave Azul Profundo → Violeta */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient - más suave y cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0d1f] to-[#0d0a1a]" />
        
        {/* Aurora Global - Nebulosa optimizada */}
        <motion.div 
          className="absolute inset-0 blur-[120px] opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse 1200px 800px at 40% 30%, #4FD4E4 0%, transparent 50%), radial-gradient(ellipse 1000px 700px at 60% 70%, #7B5CFB 0%, transparent 50%)',
          }}
          animate={{
            x: [0, 8, -8, 0],
            y: [0, -5, 5, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Nebulosa volumétrica ultra-suave (mantener para profundidad) */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-950/[0.05] via-violet-950/[0.03] to-transparent blur-[160px] opacity-80" />
        <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-purple-950/[0.04] via-indigo-950/[0.02] to-transparent blur-[160px] opacity-80" />
        
        {/* Ruido sutil para textura */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* ⭐ Partículas Slow-Glow Premium (<10% opacidad) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-0.5 h-0.5 bg-cyan-200 rounded-full opacity-[0.06] blur-[0.5px]" />
        <div className="absolute top-[28%] left-[18%] w-0.5 h-0.5 bg-blue-100 rounded-full opacity-[0.04]" />
        <div className="absolute top-[42%] right-[12%] w-0.5 h-0.5 bg-purple-200 rounded-full opacity-[0.05] blur-[0.5px]" />
        <div className="absolute top-[58%] left-[25%] w-0.5 h-0.5 bg-pink-100 rounded-full opacity-[0.04]" />
        <div className="absolute top-[72%] right-[28%] w-0.5 h-0.5 bg-violet-200 rounded-full opacity-[0.05] blur-[0.5px]" />
        <div className="absolute bottom-[18%] left-[14%] w-0.5 h-0.5 bg-cyan-100 rounded-full opacity-[0.05]" />
        <div className="absolute bottom-[32%] right-[20%] w-0.5 h-0.5 bg-fuchsia-200 rounded-full opacity-[0.04] blur-[0.5px]" />
        <div className="absolute top-[35%] left-[30%] w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-[0.06]" />
        <div className="absolute bottom-[45%] right-[35%] w-0.5 h-0.5 bg-purple-100 rounded-full opacity-[0.05] blur-[0.5px]" />
      </div>

      {/* ⭐ HERO SECTION — Cinematic Premium con Glow Intensificado */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Aura Radial Principal - Hero Optimizada */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1000px] bg-gradient-radial from-cyan-500/[0.06] via-purple-500/[0.04] to-pink-500/[0.02] rounded-full blur-[400px] opacity-[0.5]" />
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern - Premium sutil */}
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Nebula Glow optimizado - una sola capa */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-cyan-500/[0.03] to-transparent rounded-full blur-[120px]" />
          
          {/* Puntos luminosos cósmicos - Hero */}
          <div className="absolute top-[18%] left-[15%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.10]" />
          <div className="absolute top-[25%] right-[20%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.08]" />
          <div className="absolute top-[60%] left-[12%] w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.12]" />
          <div className="absolute top-[70%] right-[25%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.09]" />
          
          {/* Micro Stars - Elegantes */}
          <div className="absolute top-[22%] left-[10%] w-0.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.4)] opacity-50" />
          <div className="absolute top-[32%] left-[14%] w-0.5 h-0.5 bg-cyan-200 rounded-full shadow-[0_0_4px_rgba(34,211,238,0.3)] opacity-40" />
          <div className="absolute top-[58%] right-[18%] w-0.5 h-0.5 bg-pink-400 rounded-full shadow-[0_0_6px_rgba(236,72,153,0.4)] opacity-50" />
          <div className="absolute top-[64%] right-[15%] w-0.5 h-0.5 bg-pink-200 rounded-full shadow-[0_0_4px_rgba(236,72,153,0.3)] opacity-40" />
          
          {/* Orbital Line - Una sola órbita estática optimizada */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.015] rounded-full" />
          
          {/* Red Cósmica Animada - Optimizada a una sola órbita */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/[0.04] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, ease: 'linear', repeat: Infinity }}
          />
          
          {/* Partículas flotantes optimizadas - solo 2 */}
          <motion.div 
            className="absolute top-[20%] left-[20%] w-1 h-1 bg-cyan-400/50 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.4)]"
            animate={{ 
              x: [0, 10, 0],
              y: [0, -12, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-[65%] right-[20%] w-1 h-1 bg-purple-400/50 rounded-full shadow-[0_0_6px_rgba(168,85,247,0.4)]"
            animate={{ 
              x: [0, -10, 0],
              y: [0, 12, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 85, ease: 'linear', repeat: Infinity, delay: 2 }}
          />
          
          {/* Línea de conexión optimizada - una sola */}
          <motion.div 
            className="absolute top-[40%] left-[20%] w-[180px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/[0.06] to-transparent"
            animate={{ 
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-8 py-32 text-center">
          <div className="space-y-6 mb-10 relative">
            {/* Aurora Cinemática - Hero (ANIMADA) */}
            <CinematicAurora variant="hero" animated={true} />
            
            <h1 className="text-7xl leading-[1.1] tracking-tight" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', filter: 'contrast(1.05)' }}>
              {/* Línea 1 */}
              <span className="block text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">Sistemas digitales que</span>
              
              {/* Línea 2 */}
              <span className="block mb-2">
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">conectan </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">estrategia</span>
                  {/* Glow aumentado */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">estrategia</span>
                </span>
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">, </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">diseño</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">diseño</span>
                </span>
              </span>
              
              {/* Línea 3 */}
              <span className="block">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">y </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">y </span>
                </span>{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent font-[Space_Grotesk] text-[64px]">tecnología</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent blur-[20px] opacity-[0.50] font-[Space_Grotesk] text-[64px]">tecnología</span>
                </span>
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] font-[Space_Grotesk] text-[64px]">.</span>
              </span>
            </h1>
          </div>

          <p className="text-[#B5C1CE] max-w-[620px] mx-auto mb-12 leading-relaxed font-[Space_Grotesk] text-[16px]" style={{ WebkitFontSmoothing: 'antialiased' }}>
            Trabajamos junto a tiendas, negocios de servicios y equipos que quieren dejar atrás las planillas, las tareas manuales y el caos operativo que se acumula en WhatsApp.
          </p>

          {/* Botón VisionOS Premium con Glow Aumentado */}
          <div className="inline-block">
            <div className="relative group">
              {/* Glow estático optimizado */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/[0.08] via-purple-500/[0.06] to-pink-500/[0.05] rounded-full blur-[40px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              <button className="relative px-10 py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] rounded-full overflow-hidden shadow-[0_0_32px_rgba(168,85,247,0.35),0_0_18px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_48px_rgba(168,85,247,0.5),0_0_28px_rgba(34,211,238,0.4),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300">
                {/* Borde holográfico difuso */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/[0.12] shadow-[inset_0_0_15px_rgba(34,211,238,0.08)]" />
                
                {/* Reflejo superior sutil */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Glow interno aumentado */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] opacity-[0.15] group-hover:opacity-[0.45] transition-opacity blur-xl" />
                
                <div className="relative flex items-center gap-3">
                  <span className="text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-[Space_Grotesk]">Explorar servicios</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ MANIFIESTO — Premium Glass Panel con Glow */}
      <section id="manifiesto" className="relative py-40 px-8 overflow-hidden">
        {/* Aurora Cinemática - Manifiesto (ESTÁTICA) */}
        <CinematicAurora variant="section" animated={false} />
        
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Puntos luminosos - Manifiesto */}
          <div className="absolute top-[20%] left-[18%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.10]" />
          <div className="absolute top-[40%] right-[22%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.08]" />
          <div className="absolute bottom-[30%] left-[25%] w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.09]" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto">
          {/* Tag */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950/50 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <span className="text-[11px] tracking-[1.7px] text-white/90 uppercase">
                DISEÑO QUE CONECTA + SISTEMAS QUE ORDENAN
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="relative mb-4">
            <h2 className="relative text-center text-white max-w-[1150px] mx-auto leading-[1.15] tracking-[-0.02em] font-[Space_Grotesk]"
                style={{
                  fontSize: '52px',
                  textShadow: '0 0 40px rgba(79, 212, 228, 0.12)'
                }}>
              Acompañamos a empresas en crecimiento que quieren ordenar, modernizar y escalar sus operaciones.
            </h2>
          </div>

          {/* Subtitle */}
          <div className="relative mb-14 max-w-3xl mx-auto">
            <p className="text-center text-lg leading-[1.65] tracking-[-0.01em]"
               style={{
                 color: 'rgba(255, 255, 255, 0.78)'
               }}>
              Transformamos procesos manuales en sistemas digitales claros y confiables que impulsan decisiones, eficiencia y crecimiento real.
            </p>
          </div>

          {/* Glass Card - Premium VisionOS */}
          <div className="relative max-w-[560px] mx-auto">
            {/* Ambient glow optimizado */}
            <div className="absolute -inset-8 bg-gradient-radial from-cyan-500/[0.04] via-purple-500/[0.02] to-transparent rounded-full blur-[80px] opacity-60" />
            
            {/* Holographic corner accent */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-50"
                 style={{
                   boxShadow: '0 0 16px 3px rgba(79, 212, 228, 0.3)'
                 }} />
            
            <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
              {[
                { text: 'Toman pedidos por WhatsApp o cuadernos', gradient: 'linear-gradient(135deg, rgba(79, 212, 228, 0.85) 0%, rgba(6, 182, 212, 0.85) 100%)', glow: 'rgba(79, 212, 228, 0.25)' },
                { text: 'Demasiada carga laboral', gradient: 'linear-gradient(135deg, rgba(196, 91, 255, 0.85) 0%, rgba(168, 85, 247, 0.85) 100%)', glow: 'rgba(196, 91, 255, 0.25)' },
                { text: 'No controlan stock ni vencimientos', gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.85) 0%, rgba(196, 91, 255, 0.85) 100%)', glow: 'rgba(168, 85, 247, 0.25)' },
                { text: 'Pierden tiempo con tareas manuales', gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.85) 0%, rgba(79, 212, 228, 0.85) 100%)', glow: 'rgba(79, 212, 228, 0.25)' },
                { text: 'No cuentan con información confiable para decidir', gradient: 'linear-gradient(135deg, rgba(196, 91, 255, 0.85) 0%, rgba(219, 39, 119, 0.85) 100%)', glow: 'rgba(196, 91, 255, 0.25)' },
                { text: 'Desean crecer con orden y dirección', gradient: 'linear-gradient(135deg, rgba(79, 212, 228, 0.85) 0%, rgba(139, 92, 246, 0.85) 100%)', glow: 'rgba(139, 92, 246, 0.25)' }
              ].map((chip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.52,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="rounded-full px-[18px] py-[10px] text-center cursor-pointer transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: chip.gradient,
                    boxShadow: `0 0 20px ${chip.glow}, 0 4px 12px rgba(0, 0, 0, 0.3)`,
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {chip.text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ SERVICIOS — Premium Holographic Cards con Glow */}
      <section id="servicios" className="relative py-40 px-8 overflow-hidden">
        {/* Aurora Cinemática - Servicios (ESTÁTICA) */}
        <CinematicAurora variant="section" animated={false} />
        
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(170, 183, 196, 0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(170, 183, 196, 0.04) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Puntos luminosos - Servicios */}
          <div className="absolute top-[15%] left-[10%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.11]" />
          <div className="absolute top-[35%] right-[15%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.09]" />
          <div className="absolute bottom-[25%] left-[20%] w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.12]" />
          <div className="absolute bottom-[45%] right-[18%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.08]" />
          
          {/* Stars premium */}
          <div className="absolute top-[18%] left-[12%] w-0.5 h-0.5 bg-cyan-300 blur-[0.5px] opacity-30 rounded-full" />
          <div className="absolute top-[24%] right-[10%] w-0.5 h-0.5 bg-pink-400 blur-[0.5px] opacity-30 rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <h2 className="relative text-5xl text-white mb-6 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <span className="relative inline-block">
                Servicios
                <div className="absolute -bottom-4 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-cyan-500/[0.25] to-transparent" />
              </span>
            </h2>
            <p className="text-[#B5C1CE] max-w-[780px] mx-auto leading-relaxed">
              Unimos diseño, automatización y estrategia para que cada punto de contacto digital se sienta consistente, humano y listo para crecer.
            </p>
          </div>

          <div className="text-center mb-20">
            <p className="text-[#8A99A8] text-[13px] tracking-wide">
              Deslizá para descubrir cómo trabajamos →
            </p>
            <div className="mt-2 h-[0.5px] max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-cyan-500/[0.2] to-transparent blur-[0.5px]" />
          </div>

          {/* Services Grid - Premium con glow atmosférico */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Diseño de landing pages y sitios web',
                description: 'Páginas claras, modernas y pensadas para convertir. Diseñamos sitios que conectan con tu audiencia y transmiten tu mensaje de forma clara y persuasiva posicionándote desde el primer clic.',
                tag: 'IDEAL PARA →',
                ideal: 'Emprendedores y marcas que necesitan una web que atraiga, eduque y estimule en conversiones.',
                color: 'amber',
                glowColor: 'rgba(245,158,11,0.05)'
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Diseño de software a medida',
                description: 'Sistemas web que trabajan tu operación diaria. Desde dashboards hasta procesos complejos, creamos herramientas que optimizan tu negocio y conectan todo en un solo lugar.',
                tag: 'IDEAL PARA →',
                ideal: 'Equipos que necesitan automatizar integraciones, monitorizar y mapear sus datos.',
                color: 'blue',
                glowColor: 'rgba(59,130,246,0.05)'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Diseño UX/UI + Producto Digital',
                description: 'Convertimos ideas en productos mínimos viables que puedes testar. Desde que arrancás hasta que escalás, te acompañamos en la experiencia del usuario.',
                tag: 'IDEAL PARA →',
                ideal: 'Startups, equipos de producto y empresas con sistemas, prototipos y validaciones.',
                color: 'cyan',
                glowColor: 'rgba(34,211,238,0.05)'
              },
              {
                icon: <Grid className="w-8 h-8" />,
                title: 'Sistemas Operativos para Negocios',
                description: 'Organizamos tus procesos para que tu negocio fluya sin intervención constante. Coordinamos flujos de trabajo, automatización, controles de control y CRMs, alineados.',
                tag: 'IDEAL PARA →',
                ideal: 'Equipos sin estructura, defensores del control y procesos informales.',
                color: 'pink',
                glowColor: 'rgba(236,72,153,0.05)'
              },
              {
                icon: <HelpCircle className="w-8 h-8" />,
                title: 'Consultoría en Producto + Estrategia Digital',
                description: 'Cuando aún confiar te revienta, te acompañamos a armar, validar y priorizar tus ideas. Te ayudamos a pensar el rumbo, el desarrollo.',
                tag: 'IDEAL PARA →',
                ideal: 'Founders, negocios en crecimiento, equipos sin táctica técnica.',
                color: 'teal',
                glowColor: 'rgba(20,184,166,0.05)'
              }
            ].map((service, idx) => (
              <div key={idx} className="group relative h-full flex">
                {/* Glow atmosférico detrás - panel activo */}
                <div 
                  className="absolute -inset-4 rounded-[36px] blur-[300px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ backgroundColor: service.glowColor }}
                />
                
                {/* Card - Glassmorphism Premium */}
                <div className="relative w-full flex flex-col bg-white/[0.02] backdrop-blur-[15px] border border-white/[0.08] rounded-[32px] p-6 hover:border-white/[0.15] transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] group-hover:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  {/* Línea holográfica superior */}
                  <div className={`absolute top-0 left-6 right-6 h-[0.5px] opacity-30 ${
                    service.color === 'amber' ? 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent' :
                    service.color === 'blue' ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' :
                    service.color === 'cyan' ? 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' :
                    service.color === 'pink' ? 'bg-gradient-to-r from-transparent via-pink-500/50 to-transparent' :
                    'bg-gradient-to-r from-transparent via-teal-500/50 to-transparent'
                  }`} />
                  
                  {/* Brillo interior */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent rounded-[32px] pointer-events-none" />
                  
                  {/* Icon - con más glow */}
                  <div className={`mb-6 ${
                    service.color === 'amber' ? 'text-amber-400' :
                    service.color === 'blue' ? 'text-blue-500' :
                    service.color === 'cyan' ? 'text-cyan-500' :
                    service.color === 'pink' ? 'text-pink-500' :
                    'text-teal-500'
                  } drop-shadow-[0_0_12px_currentColor] opacity-90`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#B5C1CE] text-[13px] leading-relaxed mb-6 tracking-tight flex-grow">
                    {service.description}
                  </p>

                  {/* Tag */}
                  <div className={`inline-flex items-center px-3 py-2 rounded-lg mb-3 ${
                    service.color === 'amber' ? 'bg-amber-400/[0.05] border border-amber-400/[0.12]' :
                    service.color === 'blue' ? 'bg-blue-500/[0.05] border border-blue-500/[0.12]' :
                    service.color === 'cyan' ? 'bg-cyan-500/[0.05] border border-cyan-500/[0.12]' :
                    service.color === 'pink' ? 'bg-pink-500/[0.05] border border-pink-500/[0.12]' :
                    'bg-teal-500/[0.05] border border-teal-500/[0.12]'
                  }`}>
                    <span className={`text-[10px] tracking-[0.9px] uppercase ${
                      service.color === 'amber' ? 'text-amber-400' :
                      service.color === 'blue' ? 'text-blue-500' :
                      service.color === 'cyan' ? 'text-cyan-500' :
                      service.color === 'pink' ? 'text-pink-500' :
                      'text-teal-500'
                    }`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Ideal For */}
                  <p className="text-[#8A99A8] text-xs leading-relaxed">
                    {service.ideal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ PROYECTOS — Clean Premium Grid con Glow */}
      <section id="proyectos" className="relative py-40 px-8 overflow-hidden">
        {/* Aurora Cinemática - Proyectos (ESTÁTICA) */}
        <CinematicAurora variant="section" animated={false} />
        
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Puntos luminosos - Proyectos */}
          <div className="absolute top-[22%] left-[14%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.10]" />
          <div className="absolute top-[48%] right-[16%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.09]" />
          <div className="absolute bottom-[28%] left-[22%] w-[2px] h-[2px] bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.11]" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 relative">
            <h2 className="relative text-5xl text-white mb-4 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">Proyectos</h2>
            <p className="text-[#B5C1CE] text-lg">
              Exploramos el diseño, la estrategia y la tecnología a través de proyectos que evolucionan.
            </p>
          </div>

          {/* Projects Grid - con glow atmosférico */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProjectCard 
              title="Nodux"
              description="Suite multiusuario que orquesta inventarios, ventas y compras para tiendas físicas con datos en tiempo real."
              tags={['Product Design', 'Desarrollo Web', 'Automatización']}
              image={imgImageWithFallback}
            />
            
            <ProjectCard 
              title="Pew"
              description="Asistente financiero personal que traduce tus metas en planes accionables con seguimiento inteligente y cercano."
              tags={['Product Strategy', 'Finanzas', 'UX/UI']}
              image={imgImageWithFallback1}
            />
            
            <ProjectCard 
              title="MiProveedor.app"
              description="Red digital que conecta negocios con proveedores para optimizar pedidos y entregas en línea."
              tags={['Product Design', 'E-commerce', 'Web App']}
              logo="MiProveedor.app"
            />
            
            <ProjectCard 
              title="Tiendix"
              description="Plataforma de comercio electrónico que permite a pequeños negocios vender online con herramientas profesionales."
              tags={['E-commerce', 'Desarrollo Web', 'Product Design']}
              imageUrl="https://images.unsplash.com/photo-1688561807971-728cd39eb71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzdG9yZXxlbnwxfHx8fDE3NjQ1NDYxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
          </div>
        </div>
      </section>

      {/* ⭐ EQUIPO — Premium con Aura Cálida (Energía Humana) */}
      <section id="equipo" className="relative py-40 px-8 overflow-hidden">
        {/* Aurora Cinemática - Equipo (ESTÁTICA) */}
        <CinematicAurora variant="section" animated={false} />
        
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(100, 200, 255, 0.04) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(100, 200, 255, 0.04) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Puntos luminosos - Equipo */}
          <div className="absolute top-[18%] left-[12%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.11]" />
          <div className="absolute top-[42%] right-[14%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.10]" />
          <div className="absolute bottom-[32%] left-[16%] w-[2px] h-[2px] bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] opacity-[0.09]" />
          <div className="absolute bottom-[55%] right-[20%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.08]" />
          
          {/* Stars elegantes */}
          <div className="absolute top-[22%] left-[12%] w-0.5 h-0.5 bg-cyan-300 blur-[0.5px] opacity-30 rounded-full" />
          <div className="absolute top-[32%] right-[14%] w-0.5 h-0.5 bg-pink-400 opacity-25 rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24 relative">
            <h2 className="text-xl text-white mb-3 tracking-tight drop-shadow-[0_0_18px_rgba(255,255,255,0.08)]">Equipo Cosmic Studio</h2>
            <p className="text-[#A8B3BF]">
              Personas reales, mentes creativas y energía viva detrás del sistema.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 items-start">
            {[
              {
                name: 'Jorge',
                role: 'Estrategia y Desarrollo',
                description: 'Imagina lógica, estructura y visión digital.',
                image: imgImage,
                color: 'cyan',
                colorHex: '#22D3EE'
              },
              {
                name: 'Paola',
                role: 'Diseño UX/UI y Branding',
                description: 'Crea experiencias visuales que conectan con propósito.',
                image: imgImage1,
                color: 'pink',
                colorHex: '#EC4899'
              },
              {
                name: 'Samira',
                role: 'Chief Happiness Officer',
                description: 'Guarda la energía del equipo y da alegría al sistema.',
                image: imgImage2,
                color: 'emerald',
                colorHex: '#10B981'
              }
            ].map((member, idx) => (
              <div key={idx} className="text-center flex flex-col">
                {/* Description Above */}
                <p className="text-[#A8B3BF] mb-9 leading-relaxed h-[52px] flex items-center justify-center">
                  {member.description}
                </p>

                {/* Card */}
                <div className="relative group flex-1">
                  {/* Aura cálida - Energía humana + creatividad */}
                  <div className={`absolute -inset-14 blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 ${
                    member.color === 'cyan' ? 'bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-emerald-400/10' :
                    member.color === 'pink' ? 'bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-orange-400/10' :
                    'bg-gradient-to-br from-emerald-400/30 via-teal-500/20 to-cyan-400/10'
                  }`} />
                  
                  {/* Marco holográfico premium */}
                  <div className={`relative bg-transparent border rounded-[16px] overflow-hidden h-full ${
                    member.color === 'cyan' ? 'border-cyan-400/35 shadow-[0_0_25px_rgba(34,211,238,0.25),0_20px_60px_rgba(0,0,0,0.5)]' :
                    member.color === 'pink' ? 'border-pink-500/35 shadow-[0_0_25px_rgba(236,72,153,0.25),0_20px_60px_rgba(0,0,0,0.5)]' :
                    'border-emerald-400/35 shadow-[0_0_25px_rgba(16,185,129,0.25),0_20px_60px_rgba(0,0,0,0.5)]'
                  }`} style={{ borderWidth: '0.5px' }}>
                    {/* Top Glow Line premium */}
                    <div className={`h-[0.5px] bg-gradient-to-b ${
                      member.color === 'cyan' ? 'from-cyan-400/35 via-cyan-400/25 to-transparent' :
                      member.color === 'pink' ? 'from-pink-500/35 via-pink-500/25 to-transparent' :
                      'from-emerald-400/35 via-emerald-400/25 to-transparent'
                    }`} />

                    {/* Image */}
                    <div 
                      className="relative h-[271px] overflow-hidden cursor-pointer flex-shrink-0"
                      onMouseEnter={() => setRevealedCards({ ...revealedCards, [idx]: true })}
                      onMouseLeave={() => setRevealedCards({ ...revealedCards, [idx]: false })}
                      onClick={() => toggleCardReveal(idx)}
                    >
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay Reveal Layer */}
                      <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: revealedCards[idx] ? 1 : 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        style={{ pointerEvents: 'none' }}
                      >
                        <span className="text-white text-sm tracking-wide opacity-20">
                          Foto real
                        </span>
                      </motion.div>
                      
                      {/* Inner Shadow */}
                      <div className="absolute inset-0 shadow-[0_0_20px_0_inset_rgba(0,0,0,0.4)]" />

                      {/* Corner Frames holográficos */}
                      <div className={`absolute top-0 left-0 w-8 h-8 border-l border-t rounded-tl-xl opacity-30 ${
                        member.color === 'cyan' ? 'border-cyan-400/30' :
                        member.color === 'pink' ? 'border-pink-500/30' :
                        'border-emerald-400/30'
                      }`} style={{ borderWidth: '0.5px' }} />
                      <div className={`absolute top-0 right-0 w-8 h-8 border-r border-t rounded-tr-xl opacity-30 ${
                        member.color === 'cyan' ? 'border-cyan-400/30' :
                        member.color === 'pink' ? 'border-pink-500/30' :
                        'border-emerald-400/30'
                      }`} style={{ borderWidth: '0.5px' }} />
                    </div>

                    {/* Info Footer */}
                    <div className={`relative bg-gradient-to-b from-black/90 to-black/70 border-t px-4 py-3 ${
                      member.color === 'cyan' ? 'border-cyan-400/20' :
                      member.color === 'pink' ? 'border-pink-500/20' :
                      'border-emerald-400/20'
                    }`} style={{ borderTopWidth: '0.5px' }}>
                      <p className="text-white tracking-wide mb-1">{member.name}</p>
                      <p className={`text-xs opacity-90 tracking-wide ${
                        member.color === 'cyan' ? 'text-cyan-400' :
                        member.color === 'pink' ? 'text-pink-500' :
                        'text-emerald-400'
                      }`}>
                        {member.role}
                      </p>
                    </div>

                    {/* LinkedIn Badge */}
                    <div className="absolute bottom-[59px] right-3 w-7 h-7 bg-[#0077b5] rounded-lg shadow-[0_2px_12px_rgba(0,119,181,0.6)] flex items-center justify-center">
                      <Linkedin className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span className="text-emerald-400 tracking-wide">RED ACTIVA</span>
            <span className="text-[#6A7282]">•</span>
            <span className="text-[#A8B3BF] tracking-wide">COLABORACIÓN EN TIEMPO REAL</span>
          </div>
        </div>
      </section>

      {/* ⭐ CONTACTO — Plasma Reactor Premium con Glow */}
      <section id="contacto" className="relative py-40 px-8 overflow-hidden">
        {/* Aurora Cinemática - Contacto (ANIMADA) */}
        <CinematicAurora variant="contact" animated={true} />
        
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{ 
              backgroundImage: 'linear-gradient(44.82deg, rgba(30, 42, 53, 0.5) 0.5px, transparent 0.5px), linear-gradient(-44.82deg, rgba(30, 42, 53, 0.5) 0.5px, transparent 0.5px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Puntos luminosos - Contacto */}
          <div className="absolute top-[25%] left-[16%] w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-[0.11]" />
          <div className="absolute top-[50%] right-[18%] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.5)] opacity-[0.10]" />
          <div className="absolute bottom-[35%] left-[20%] w-[2px] h-[2px] bg-purple-300 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)] opacity-[0.09]" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-20 relative">
            
            <h2 className="relative text-5xl mb-8 tracking-wide drop-shadow-[0_0_25px_rgba(168,85,247,0.12)]">
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                ¿Listo para crear tu
              </span>
              {' '}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                sistema
              </span>
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                ?
              </span>
            </h2>
            <p className="text-[#D4DBE1] text-lg">
              Conectemos y diseñemos experiencias digitales que evolucionan.
            </p>
          </div>

          {/* Form Card - Plasma Premium */}
          <div className="max-w-[1008px] mx-auto relative">
            {/* Nebulosa optimizada */}
            <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.03] to-pink-500/[0.02] rounded-[50px] blur-[100px] opacity-40" />
            
            <div 
              className="relative backdrop-blur-[18px] border rounded-[28px] p-12 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
              style={{ 
                background: 'linear-gradient(157.6deg, rgba(34, 211, 238, 0.015) 0%, rgba(168, 85, 247, 0.02) 50%), rgba(0, 0, 0, 0.2)',
                borderWidth: '0.5px',
                borderColor: 'rgba(34, 211, 238, 0.1)'
              }}
            >
              {/* Líneas holográficas tipo panel */}
              <div className="absolute top-0 left-8 right-8 h-[0.5px] bg-gradient-to-r from-transparent via-cyan-500/[0.15] to-transparent" />
              
              <form className="space-y-8">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-[#9BA8B5] text-[11px] tracking-[1.2px] uppercase">
                    Tu nombre / Negocio
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9BA8B5]" />
                    <input
                      type="text"
                      placeholder="Nombre o negocio"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0F171E]/50 border rounded-xl px-12 py-4 text-white placeholder:text-[#5A6775] focus:outline-none focus:border-cyan-400/35 focus:ring-1 focus:ring-cyan-400/15 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
                      style={{ borderWidth: '0.5px', borderColor: 'rgba(42, 54, 66, 0.5)' }}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block text-[#9BA8B5] text-[11px] tracking-[1.2px] uppercase">
                    Mensaje
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-[#9BA8B5]" />
                    <textarea
                      placeholder="Me interesa crear un sistema para mi negocio"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#0F171E]/50 border rounded-xl px-12 py-4 text-white placeholder:text-[#5A6775] focus:outline-none focus:border-cyan-400/35 focus:ring-1 focus:ring-cyan-400/15 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all resize-none"
                      style={{ borderWidth: '0.5px', borderColor: 'rgba(42, 54, 66, 0.5)' }}
                    />
                  </div>
                </div>

                {/* Submit Button - VisionOS con Glow aumentado */}
                <div className="flex justify-center pt-4">
                  <div className="relative group">
                    {/* Glow estático optimizado */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/[0.08] via-purple-500/[0.06] to-pink-500/[0.05] rounded-full blur-[40px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <button
                      type="submit"
                      className="relative px-10 py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] rounded-full overflow-hidden shadow-[0_0_32px_rgba(168,85,247,0.35),0_0_18px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_48px_rgba(168,85,247,0.5),0_0_28px_rgba(34,211,238,0.4),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
                    >
                      {/* Borde holográfico */}
                      <div className="absolute inset-0 rounded-full border border-cyan-400/[0.12] shadow-[inset_0_0_15px_rgba(34,211,238,0.08)]" />
                      
                      {/* Reflejo superior */}
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Glow interno aumentado */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] opacity-[0.15] group-hover:opacity-[0.45] transition-opacity blur-xl" />
                      
                      <div className="relative flex items-center gap-3">
                        <span className="text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-[Space_Grotesk]">Contactar equipo</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ⭐ FOOTER — Cinematic Premium */}
          <div className="text-center mt-20 space-y-6 bg-black/40 backdrop-blur-xl rounded-2xl py-12 px-8 relative border border-white/[0.02]">
            {/* Fade atmospheric hacia arriba */}
            <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            
            {/* Puntitos estelares */}
            <div className="absolute top-4 left-[20%] w-0.5 h-0.5 bg-cyan-200 rounded-full opacity-[0.08]" />
            <div className="absolute top-6 right-[25%] w-0.5 h-0.5 bg-purple-200 rounded-full opacity-[0.07]" />
            <div className="absolute bottom-4 left-[30%] w-0.5 h-0.5 bg-pink-200 rounded-full opacity-[0.08]" />
            
            <div className="flex justify-center">
              <ChevronRight className="w-5 h-5 text-[#4A5661]" />
            </div>
            <a 
              href="mailto:info.cosmicst@gmail.com"
              className="block text-[#9FAEBA] hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]"
            >
              info.cosmicst@gmail.com
            </a>
            <div className="flex items-center justify-center gap-8">
              <a href="#" className="text-[#9FAEBA] text-[15px] hover:text-white transition-colors">LinkedIn</a>
              <span className="text-[#2A3641]">—</span>
              <a href="#" className="text-[#9FAEBA] text-[15px] hover:text-white transition-colors">Instagram</a>
              <span className="text-[#2A3641]">—</span>
              <a href="#" className="text-[#9FAEBA] text-[15px] hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
