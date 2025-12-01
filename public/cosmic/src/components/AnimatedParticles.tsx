import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const particles: Particle[] = [
  { id: 1, x: '15%', y: '20%', size: 1.5, duration: 8, delay: 0, opacity: 0.08 },
  { id: 2, x: '75%', y: '15%', size: 1, duration: 10, delay: 1, opacity: 0.06 },
  { id: 3, x: '35%', y: '60%', size: 2, duration: 9, delay: 2, opacity: 0.10 },
  { id: 4, x: '85%', y: '70%', size: 1.5, duration: 11, delay: 0.5, opacity: 0.07 },
  { id: 5, x: '25%', y: '40%', size: 1, duration: 10, delay: 1.5, opacity: 0.05 },
  { id: 6, x: '65%', y: '85%', size: 2, duration: 12, delay: 0, opacity: 0.09 },
  { id: 7, x: '50%', y: '30%', size: 1, duration: 9, delay: 2.5, opacity: 0.06 },
  { id: 8, x: '10%', y: '75%', size: 1.5, duration: 11, delay: 1, opacity: 0.08 },
];

export function AnimatedParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 6px rgba(34, 211, 238, 0.4)'
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
