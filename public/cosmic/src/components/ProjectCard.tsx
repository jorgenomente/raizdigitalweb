import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageUrl?: string;
  logo?: string;
  index?: number;
}

export function ProjectCard({ title, description, tags, image, imageUrl, logo, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative flex flex-col bg-white/[0.02] backdrop-blur-[15px] rounded-[24px] overflow-hidden border hover:border-white/[0.12] transition-all duration-500 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ borderWidth: '0.5px', borderColor: 'rgba(255, 255, 255, 0.06)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ 
        y: -6,
        scale: 1.01,
        transition: { duration: 0.24, ease: 'easeOut' }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow atmosférico - panel activo */}
      <motion.div 
        className="absolute -inset-4 bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.03] to-pink-500/[0.02] rounded-[28px] blur-[280px] -z-10" 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Reflejo superior glassmorphism */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.04] to-transparent opacity-40 pointer-events-none rounded-t-[24px]" />
      
      {/* Holographic Scanline Effect - Ultra Sutil */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.08] via-purple-400/[0.06] to-pink-400/[0.08]"
          style={{ 
            transform: 'rotate(-45deg) translateX(-100%)',
            width: '200%',
            height: '200%',
            filter: 'blur(5px)'
          }}
          animate={isHovered ? {
            x: ['0%', '100%'],
            transition: {
              duration: 3.5,
              ease: 'linear',
              repeat: Infinity
            }
          } : {}}
        />
      </motion.div>
      
      {/* Línea holográfica superior */}
      <div className="absolute top-0 left-6 right-6 h-[0.5px] bg-gradient-to-r from-transparent via-cyan-400/[0.25] to-transparent opacity-40" />

      {/* Image con parallax */}
      <motion.div 
        className="h-[180px] bg-gradient-to-br from-slate-950/15 via-slate-900/[0.08] to-slate-950/15 relative overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {image ? (
          <motion.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ) : imageUrl ? (
          <motion.img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div 
              className="px-5 py-2.5 bg-violet-500/[0.1] border border-violet-400/25 rounded-[14px] backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
              style={{ borderWidth: '0.5px' }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">{logo}</span>
            </motion.div>
          </div>
        )}
        {/* Overlay gradient en hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] to-purple-500/[0.05]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-white text-xl mb-3 tracking-tight" style={{ filter: 'contrast(1.05)' }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#B5C1CE] text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, tagIdx) => (
            <motion.span 
              key={tagIdx}
              className="px-3 py-1.5 bg-white/[0.03] border rounded-full text-white/70 text-xs"
              style={{ borderWidth: '0.5px', borderColor: 'rgba(255, 255, 255, 0.08)' }}
              whileHover={{ 
                background: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.9)',
                scale: 1.05,
                transition: { duration: 0.18 }
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.button 
          className="group/btn inline-flex items-center gap-2 text-cyan-400 text-sm font-medium self-start"
          animate={{ gap: isHovered ? '12px' : '8px' }}
          transition={{ duration: 0.24 }}
        >
          <motion.span 
            className="drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.22 }}
          >
            Ver caso
          </motion.span>
          <motion.div
            animate={{ 
              x: isHovered ? 3 : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              x: { duration: 0.24 },
              rotate: { duration: 0.6, repeat: isHovered ? Infinity : 0 }
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Partícula esquina holográfica */}
      <motion.div 
        className="absolute top-3 right-3 w-0.5 h-0.5 bg-cyan-400/50 rounded-full shadow-[0_0_4px_rgba(34,211,238,0.4)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}