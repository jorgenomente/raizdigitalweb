'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTheme } from '@/components/providers/theme-provider';
import { defaultLocale, type Locale } from '@/lib/i18n/dictionaries';

export type CosmicNavItem = { label: string; href: string };

export function CosmicHeader({
  navItems,
  serviceItems,
  locale,
}: {
  navItems: CosmicNavItem[];
  serviceItems?: CosmicNavItem[];
  locale: Locale;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.href.replace('#', '') ?? '');
  const [servicesOpen, setServicesOpen] = useState(false);
  const serviceHint = locale === 'en' ? 'Explore service' : 'Explorar servicio';
  const { theme, toggleTheme } = useTheme();
  const isThemeDark = theme === 'dark';
  const headerIsDark = true;
  const homeHref = locale === defaultLocale ? '/#hero' : `/${locale}#hero`;

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
      className="fixed top-0 left-0 right-0 z-40 dark"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      style={{
        background: scrolled
          ? headerIsDark
            ? 'rgba(8, 10, 20, 0.6)'
            : 'rgba(255, 255, 255, 0.32)'
          : headerIsDark
            ? 'rgba(8, 10, 20, 0.52)'
            : 'rgba(255, 255, 255, 0.24)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: headerIsDark ? '1px solid rgba(255, 255, 255, 0.045)' : '1px solid rgba(14, 165, 233, 0.1)',
        boxShadow: headerIsDark ? '0 12px 40px rgba(0, 0, 0, 0.14)' : '0 18px 48px rgba(14, 165, 233, 0.05)',
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.a
            href={homeHref}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            aria-label="Volver al inicio"
          >
            <div
              className="h-9 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              style={{
                background: headerIsDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(255, 255, 255, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: headerIsDark ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(15, 23, 42, 0.14)',
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
              const isServicesItem = item.href.includes('#services') && (serviceItems?.length ?? 0) > 0;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => isServicesItem && setServicesOpen(true)}
                  onMouseLeave={() => isServicesItem && setServicesOpen(false)}
                >
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.22 }}
                    className="relative flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] tracking-wider transition-all duration-200 group font-semibold"
                    style={{
                      border: headerIsDark ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(15, 23, 42, 0.22)',
                      color: isActive ? (headerIsDark ? 'rgba(79, 212, 228, 1)' : '#0284c7') : headerIsDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                      background: isActive
                        ? headerIsDark
                          ? 'rgba(79, 212, 228, 0.16)'
                          : 'rgba(14, 165, 233, 0.18)'
                        : headerIsDark
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(148, 163, 184, 0.2)',
                      boxShadow: isActive
                        ? headerIsDark
                          ? '0 0 14px rgba(79, 212, 228, 0.2)'
                          : '0 12px 32px rgba(14, 165, 233, 0.2)'
                        : '0 8px 22px rgba(0,0,0,0.08)',
                      textShadow: headerIsDark ? '0 6px 18px rgba(0,0,0,0.45)' : '0 6px 14px rgba(255,255,255,0.6)',
                    }}
                    whileTap={{ y: 0, scale: 0.98 }}
                  >
                    {item.label.toUpperCase()}
                    {isServicesItem && (
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                        strokeWidth={2}
                        style={{ color: headerIsDark ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.75)' }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-1 left-5 right-5 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.a>

                  {isServicesItem && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute left-0 top-[calc(100%+8px)] min-w-[280px] overflow-hidden rounded-2xl border shadow-2xl"
                          style={{
                            background: headerIsDark ? 'rgba(6, 8, 15, 0.92)' : 'rgba(255, 255, 255, 0.98)',
                            borderColor: headerIsDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.12)',
                            boxShadow: headerIsDark ? '0 20px 50px rgba(0,0,0,0.45)' : '0 20px 55px rgba(15,23,42,0.12)',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                          }}
                        >
                          <div className="p-3 flex flex-col gap-1.5">
                            {serviceItems?.map((service) => (
                              <a
                                key={service.href}
                                href={service.href}
                                className="flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-150"
                                style={{
                                  color: headerIsDark ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.9)',
                                  background: headerIsDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.03)',
                                }}
                              >
                                <span
                                  className="mt-1 h-2 w-2 rounded-full"
                                  style={{ background: 'linear-gradient(135deg, #22D3EE, #A855F7)' }}
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold tracking-wide">{service.label}</span>
                                  <span className="text-xs text-slate-400 dark:text-white/60">{serviceHint}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isThemeDark}
              className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all"
              style={{
                borderColor: headerIsDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.16)',
                color: headerIsDark ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.95)',
                background: headerIsDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.96)',
                boxShadow: headerIsDark ? '0 10px 24px rgba(0,0,0,0.22)' : '0 12px 32px rgba(15,23,42,0.1)',
              }}
            >
              {isThemeDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-[12px] tracking-[0.1em] uppercase">{isThemeDark ? 'Claro' : 'Oscuro'}</span>
            </button>
          </div>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-all duration-200"
            style={{
              border: headerIsDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(15, 23, 42, 0.12)',
              color: headerIsDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.9)',
              background: headerIsDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
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
            <div className="flex flex-col gap-3 rounded-2xl border p-4" style={{ borderColor: headerIsDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)', background: headerIsDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)' }}>
              {navItems.map((item) => {
                const isServicesItem = item.href.includes('#services') && (serviceItems?.length ?? 0) > 0;
                return (
                  <div key={item.href} className="flex flex-col gap-2">
                    <a
                      href={item.href}
                      className="px-4 py-2 rounded-xl text-sm transition-colors"
                      style={{
                        background: headerIsDark ? 'rgba(255,255,255,0.06)' : 'rgba(14,165,233,0.12)',
                        border: headerIsDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.12)',
                        color: headerIsDark ? 'white' : '#0f172a',
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    {isServicesItem && (
                      <div className="ml-2 flex flex-col gap-1.5">
                        {serviceItems?.map((service) => (
                          <a
                            key={service.href}
                            href={service.href}
                            className="rounded-lg px-3 py-2 text-[13px] transition-colors"
                            style={{
                              background: headerIsDark ? 'rgba(255,255,255,0.03)' : 'rgba(226,232,240,0.8)',
                              color: headerIsDark ? 'rgba(255,255,255,0.9)' : '#0f172a',
                              border: headerIsDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(15,23,42,0.08)',
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="pt-3 border-t"
                style={{ borderColor: headerIsDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)' }}
              >
                <LanguageSwitcher locale={locale} />
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-pressed={isThemeDark}
                  className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                  style={{
                    borderColor: headerIsDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.1)',
                    color: headerIsDark ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.9)',
                  }}
                >
                  {isThemeDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="text-[12px] tracking-[0.08em] uppercase">{isThemeDark ? 'Modo claro' : 'Modo oscuro'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
