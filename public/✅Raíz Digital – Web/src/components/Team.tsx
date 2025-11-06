import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const teamMembers = [
  {
    name: "Jorge",
    role: "Estrategia y Desarrollo",
    description: "Integra lógica, estructura y visión digital.",
    image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjE0ODc4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#4FD4E4",
    position: { x: 20, y: 50 }
  },
  {
    name: "Paola",
    role: "Diseño UX/UI y Branding",
    description: "Crea experiencias visuales que conectan con propósito.",
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2MTQ1MjA1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#D55FA3",
    position: { x: 50, y: 50 }
  },
  {
    name: "Samira",
    role: "Chief Happiness Officer 🐾",
    description: "Guarda la energía del equipo y da alegría al sistema.",
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTQ2NDY0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#4FD4E4",
    position: { x: 80, y: 50 }
  }
];

function Particle({ delay, color, radius = 150, index }: { delay: number; color: string; radius?: number; index: number }) {
  const angle = (index / 6) * Math.PI * 2;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}40`,
        left: '50%',
        top: '50%',
      }}
      animate={{
        x: [
          Math.cos(angle) * radius,
          Math.cos(angle + Math.PI * 2) * radius
        ],
        y: [
          Math.sin(angle) * radius,
          Math.sin(angle + Math.PI * 2) * radius
        ],
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

function TeamMemberCard({ member, index }: { member: typeof teamMembers[0], index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center max-w-xs"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* Avatar Container */}
      <motion.div 
        className="relative mb-6 group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute -inset-12 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${member.color}20 0%, transparent 70%)`,
            filter: 'blur(30px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Orbital Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, particleIndex) => (
            <Particle 
              key={particleIndex} 
              delay={particleIndex * 0.3 + index * 0.5} 
              color={member.color}
              radius={80}
              index={particleIndex}
            />
          ))}
        </div>

        {/* Pulsing Outer Border Ring */}
        <motion.div
          className="absolute -inset-6 rounded-full border-2"
          style={{
            borderColor: `${member.color}40`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Middle Glowing Ring */}
        <motion.div
          className="absolute -inset-3 rounded-full border-2"
          style={{
            borderColor: member.color,
            boxShadow: `0 0 20px ${member.color}60, inset 0 0 20px ${member.color}20`
          }}
          animate={{
            rotate: [0, -360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Rotating dots on the ring */}
          <motion.div
            className="absolute w-2 h-2 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: member.color,
              boxShadow: `0 0 10px ${member.color}`
            }}
          />
        </motion.div>

        {/* Avatar Circle */}
        <div 
          className="relative w-40 h-40 rounded-full overflow-hidden border-4 bg-[#0E1C26] z-10"
          style={{ 
            borderColor: member.color,
            boxShadow: `
              0 0 40px ${member.color}60,
              inset 0 0 30px ${member.color}15,
              0 10px 30px rgba(0, 0, 0, 0.5)
            `
          }}
        >
          <ImageWithFallback
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay on Hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${member.color}60 100%)`
            }}
          />
        </div>

        {/* Active Pulse Indicator */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 bg-[#111418] flex items-center justify-center z-20"
          style={{ borderColor: member.color }}
          animate={{
            boxShadow: [
              `0 0 0 0 ${member.color}80`,
              `0 0 0 8px ${member.color}00`,
              `0 0 0 0 ${member.color}80`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ 
              backgroundColor: member.color,
              boxShadow: `0 0 8px ${member.color}`
            }}
          />
        </motion.div>
      </motion.div>

      {/* Name & Role */}
      <motion.div 
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.2 }}
      >
        <h3 
          className="text-2xl md:text-3xl mb-2 text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {member.name}
        </h3>
        <p 
          className="text-sm mb-1 tracking-wider"
          style={{ 
            fontFamily: 'Geist Mono, monospace',
            color: member.color
          }}
        >
          {member.role}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p 
        className="text-center text-[#AAB7C4] leading-relaxed max-w-xs"
        style={{ fontFamily: 'Inter, sans-serif' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {member.description}
      </motion.p>
    </motion.div>
  );
}

export function Team() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] via-[#0E1C26] to-[#111418]" />
      
      {/* Neural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(#4FD4E4 1px, transparent 1px), 
              linear-gradient(90deg, #D55FA3 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4FD4E4]/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D55FA3]/10 rounded-full blur-[140px]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Equipo Raíz Digital
          </h2>
          <p className="text-xl text-[#AAB7C4] max-w-3xl mx-auto leading-relaxed">
            Personas reales, mentes creativas y energía viva detrás del sistema.
          </p>
        </motion.div>
        
        {/* Team Network Container */}
        <div className="relative max-w-6xl mx-auto min-h-[500px]">
          {/* Connection Lines SVG */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="teamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4FD4E4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D55FA3" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="teamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D55FA3" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4FD4E4" stopOpacity="0.6" />
              </linearGradient>
              
              <filter id="teamGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection: Jorge to Paola */}
            <motion.line
              x1="25%" y1="50%" x2="50%" y2="50%"
              stroke="url(#teamGradient1)"
              strokeWidth="2"
              strokeDasharray="8,4"
              filter="url(#teamGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />

            {/* Connection: Paola to Samira */}
            <motion.line
              x1="50%" y1="50%" x2="75%" y2="50%"
              stroke="url(#teamGradient2)"
              strokeWidth="2"
              strokeDasharray="8,4"
              filter="url(#teamGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 }}
            />

            {/* Triangle connection: Jorge to Samira (top arc) */}
            <motion.path
              d="M 25% 50% Q 50% 30%, 75% 50%"
              stroke="#4FD4E4"
              strokeWidth="1.5"
              strokeDasharray="6,3"
              fill="none"
              opacity="0.4"
              filter="url(#teamGlow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.2 }}
            />

            {/* Data Flow Particles on Lines */}
            <motion.circle
              r="3"
              fill="#4FD4E4"
              style={{ filter: 'drop-shadow(0 0 8px #4FD4E4)' }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 25% 50% L 50% 50%"
              />
            </motion.circle>

            <motion.circle
              r="3"
              fill="#D55FA3"
              style={{ filter: 'drop-shadow(0 0 8px #D55FA3)' }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin="1s"
                path="M 50% 50% L 75% 50%"
              />
            </motion.circle>
          </svg>

          {/* Team Members Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 items-start justify-items-center">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Status Indicator */}
        <motion.div
          className="mt-24 flex justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          {/* Network Status */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#4FD4E4' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <p 
              className="text-xs text-[#AAB7C4]/60 tracking-widest"
              style={{ fontFamily: 'Geist Mono, monospace' }}
            >
              RED ACTIVA · COLABORACIÓN EN TIEMPO REAL
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Neural Lines */}
      <svg className="absolute left-0 right-0 bottom-20 h-px pointer-events-none opacity-15 overflow-visible">
        <motion.line
          x1="15%" y1="0" x2="85%" y2="0"
          stroke="url(#teamDecoGradient)"
          strokeWidth="2"
          strokeDasharray="10,5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 2 }}
        />
        <defs>
          <linearGradient id="teamDecoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4FD4E4" />
            <stop offset="50%" stopColor="#D55FA3" />
            <stop offset="100%" stopColor="#4FD4E4" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
