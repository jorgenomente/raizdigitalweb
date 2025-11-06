import { Menu } from 'lucide-react';
import { RaizButton } from './RaizButton';

export const RaizNavbar = () => {
  return (
    <nav className="bg-[var(--deep-blue)] border-b border-[var(--neural-cyan)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg"></div>
            <span className="text-gradient">Raíz Digital</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[var(--silver-gray)] hover:text-[var(--neural-cyan)] transition-colors">
              Products
            </a>
            <a href="#" className="text-[var(--silver-gray)] hover:text-[var(--neural-cyan)] transition-colors">
              Services
            </a>
            <a href="#" className="text-[var(--silver-gray)] hover:text-[var(--neural-cyan)] transition-colors">
              About
            </a>
            <a href="#" className="text-[var(--silver-gray)] hover:text-[var(--neural-cyan)] transition-colors">
              Contact
            </a>
          </div>
          
          {/* CTA */}
          <div className="hidden md:block">
            <RaizButton size="sm">Get Started</RaizButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-[var(--neural-cyan)]">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
