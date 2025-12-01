import image_48494285e5c5279834b8d6c6c8e87d8626aed8bd from 'figma:asset/48494285e5c5279834b8d6c6c8e87d8626aed8bd.png';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoIsotipo from 'figma:asset/b5b934a1e8184d13b12f077a5507b8d2d2414e74.png';

export default function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Manifiesto', href: '#manifiesto' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detectar sección activa
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'rgba(10, 10, 15, 0.75)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)',
      }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      style={{
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <nav className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
          >
            <a href="#inicio" className="flex items-center gap-2">
              <div 
                className="h-9 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                style={{
                  background: 'rgba(10, 10, 10, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img 
                  src={image_48494285e5c5279834b8d6c6c8e87d8626aed8bd} 
                  alt="Cosmic Studio" 
                  className="h-[13.5px] w-[13.5px]"
                />
                <span 
                  className="text-[15px] tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #4FD4E4 0%, #C45BFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  COSMIC
                </span>
              </div>
            </a>
          </motion.div>
          
          {/* Left section - Main navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.22 }}
                  className="relative px-5 py-2 rounded-full text-[13px] tracking-wider transition-all duration-220 group"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: isActive ? 'rgba(79, 212, 228, 1)' : 'rgba(255, 255, 255, 0.85)',
                    background: isActive ? 'rgba(79, 212, 228, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                    boxShadow: isActive ? '0 0 12px rgba(79, 212, 228, 0.15)' : 'none'
                  }}
                  whileHover={{ 
                    y: -2,
                    background: 'rgba(79, 212, 228, 0.08)',
                    borderColor: 'rgba(79, 212, 228, 0.3)',
                    boxShadow: '0 0 20px rgba(79, 212, 228, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  {item.label.toUpperCase()}
                  
                  {/* Subrayado animado */}
                  <motion.div
                    className="absolute bottom-1 left-5 right-5 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1 lg:flex-none" />

          {/* Right section - Language selector */}
          <motion.div 
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.22 }}
          >
            <span 
              className="text-[11px] tracking-[0.15em]"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              IDIOMA
            </span>
            <div className="flex items-center gap-1">
              <motion.button
                className="px-4 py-1.5 rounded-full text-[12px] tracking-wide"
                style={{
                  border: '1px solid rgba(79, 212, 228, 0.4)',
                  color: 'rgba(79, 212, 228, 1)',
                  background: 'rgba(79, 212, 228, 0.12)',
                  boxShadow: '0 0 12px rgba(79, 212, 228, 0.15)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ES
              </motion.button>
              <motion.button
                className="px-4 py-1.5 rounded-full text-[12px] tracking-wide transition-all duration-220"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  color: 'rgba(255, 255, 255, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.25)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                EN
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-all duration-220"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.85)',
              background: 'rgba(255, 255, 255, 0.03)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 pt-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-5 py-3 rounded-xl text-[13px] tracking-wider transition-all duration-220"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.18 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label.toUpperCase()}
                </motion.a>
              ))}
              
              {/* Mobile language selector */}
              <motion.div 
                className="flex items-center gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.18 }}
              >
                <span 
                  className="text-[11px] tracking-[0.15em]"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                >
                  IDIOMA
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="px-4 py-1.5 rounded-full text-[12px] tracking-wide"
                    style={{
                      border: '1px solid rgba(79, 212, 228, 0.4)',
                      color: 'rgba(79, 212, 228, 1)',
                      background: 'rgba(79, 212, 228, 0.12)',
                      boxShadow: '0 0 12px rgba(79, 212, 228, 0.15)'
                    }}
                  >
                    ES
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-full text-[12px] tracking-wide"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    EN
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}