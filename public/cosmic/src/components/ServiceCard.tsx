import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag: string;
  ideal: string;
  color: 'amber' | 'blue' | 'cyan' | 'pink' | 'teal';
  glowColor: string;
  index: number;
}

export function ServiceCard({ icon, title, description, tag, ideal, color, glowColor, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    amber: { text: 'text-amber-400', bg: 'bg-amber-400/[0.05]', border: 'border-amber-400/[0.12]', gradient: 'from-transparent via-amber-400/50 to-transparent' },
    blue: { text: 'text-blue-500', bg: 'bg-blue-500/[0.05]', border: 'border-blue-500/[0.12]', gradient: 'from-transparent via-blue-500/50 to-transparent' },
    cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500/[0.05]', border: 'border-cyan-500/[0.12]', gradient: 'from-transparent via-cyan-500/50 to-transparent' },
    pink: { text: 'text-pink-500', bg: 'bg-pink-500/[0.05]', border: 'border-pink-500/[0.12]', gradient: 'from-transparent via-pink-500/50 to-transparent' },
    teal: { text: 'text-teal-500', bg: 'bg-teal-500/[0.05]', border: 'border-teal-500/[0.12]', gradient: 'from-transparent via-teal-500/50 to-transparent' }
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      className="group relative h-full flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow atmosférico detrás - panel activo */}
      <motion.div 
        className="absolute -inset-4 rounded-[36px] blur-[300px]"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Card - Glassmorphism Premium */}
      <motion.div 
        className="relative w-full flex flex-col bg-white/[0.02] backdrop-blur-[15px] border border-white/[0.08] rounded-[32px] p-6 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
        whileHover={{ 
          y: -5,
          scale: 1.01,
          borderColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 70px -20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          transition: { duration: 0.24, ease: 'easeOut' }
        }}
      >
        {/* Línea holográfica superior */}
        <div className={`absolute top-0 left-6 right-6 h-[0.5px] opacity-30 bg-gradient-to-r ${classes.gradient}`} />
        
        {/* Brillo interior */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent rounded-[32px] pointer-events-none" />
        
        {/* Icon - con animación orbital */}
        <motion.div 
          className={`mb-6 ${classes.text} drop-shadow-[0_0_12px_currentColor] opacity-90`}
          animate={isHovered ? { 
            rotate: [0, -2, 2, -2, 2, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ 
            duration: 1.8, 
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut'
          }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-white text-xl mb-4 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#B5C1CE] text-[13px] leading-relaxed mb-6 tracking-tight flex-grow">
          {description}
        </p>

        {/* Tag */}
        <div className={`inline-flex items-center px-3 py-2 rounded-lg mb-3 ${classes.bg} border ${classes.border}`}>
          <span className={`text-[10px] tracking-[0.9px] uppercase ${classes.text}`}>
            {tag}
          </span>
        </div>

        {/* Ideal For */}
        <p className="text-[#8A99A8] text-xs leading-relaxed">
          {ideal}
        </p>
      </motion.div>
    </motion.div>
  );
}
