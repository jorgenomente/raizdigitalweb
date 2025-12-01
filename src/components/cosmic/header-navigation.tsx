'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Locale } from '@/lib/i18n/dictionaries';

export type CosmicNavItem = { label: string; href: string };

export function CosmicHeader({ navItems, locale }: { navItems: CosmicNavItem[]; locale: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.href.replace('#', '') ?? '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      style={{
        background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'rgba(10, 10, 15, 0.75)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.a
            href="#hero"
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="h-9 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              style={{
                background: 'rgba(10, 10, 10, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Image
                src="/cosmic/src/assets/48494285e5c5279834b8d6c6c8e87d8626aed8bd.png"
                alt="Cosmic"
                width={16}
                height={16}
                className="h-[13.5px] w-[13.5px]"
                priority
              />
              <span
                className="text-[15px] tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #4FD4E4 0%, #C45BFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                COSMIC
              </span>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => {
              const section = item.href.replace('#', '');
              const isActive = activeSection === section;

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.22 }}
                  className="relative px-5 py-2 rounded-full text-[13px] tracking-wider transition-all duration-200 group"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: isActive ? 'rgba(79, 212, 228, 1)' : 'rgba(255, 255, 255, 0.85)',
                    background: isActive ? 'rgba(79, 212, 228, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                    boxShadow: isActive ? '0 0 12px rgba(79, 212, 228, 0.15)' : 'none',
                  }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  {item.label.toUpperCase()}
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

          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[11px] tracking-[0.15em] text-white/50">IDIOMA</span>
            <LanguageSwitcher locale={locale} />
          </div>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-all duration-200"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.85)',
              background: 'rgba(255, 255, 255, 0.03)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden px-6 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
