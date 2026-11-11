import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Smartphone, ShieldCheck, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenCredits: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenCredits }) => {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Vibration feedback helper as in original script.js
  const triggerHaptic = (ms = 10) => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(ms);
      } catch {
        // Safe ignore
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'modelos', 'por-que', 'garantia', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    triggerHaptic();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f7f7f7]/90 backdrop-blur-md border-b border-[#0d2a1c]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Skip link for accessibility */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-[#0d2a1c] focus:text-white focus:rounded"
        >
          Saltar al contenido
        </a>

        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('top')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0d2a1c] flex items-center justify-center text-[#f6e016] font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <span className="font-display text-2xl tracking-tight text-[#0d2a1c]">
            Celucosta
          </span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px]" aria-label="Navegación principal">
          <button
            onClick={() => scrollTo('modelos')}
            className={`cursor-pointer transition-colors hover:text-[#0d2a1c] pb-1 ${
              activeSection === 'modelos' ? 'text-[#0d2a1c] font-semibold nav__link--active' : 'text-[#5f6b64]'
            }`}
          >
            Modelos
          </button>
          <button
            onClick={() => scrollTo('por-que')}
            className={`cursor-pointer transition-colors hover:text-[#0d2a1c] pb-1 ${
              activeSection === 'por-que' ? 'text-[#0d2a1c] font-semibold nav__link--active' : 'text-[#5f6b64]'
            }`}
          >
            Por qué comprar
          </button>
          <button
            onClick={() => scrollTo('garantia')}
            className={`cursor-pointer transition-colors hover:text-[#0d2a1c] pb-1 ${
              activeSection === 'garantia' ? 'text-[#0d2a1c] font-semibold nav__link--active' : 'text-[#5f6b64]'
            }`}
          >
            50 Pruebas
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className={`cursor-pointer transition-colors hover:text-[#0d2a1c] pb-1 ${
              activeSection === 'contacto' ? 'text-[#0d2a1c] font-semibold nav__link--active' : 'text-[#5f6b64]'
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* CTA and Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              triggerHaptic();
              onOpenContact();
            }}
            className="text-xs uppercase tracking-wider font-semibold text-[#0d2a1c]/80 hover:text-[#0d2a1c] px-3 py-2 cursor-pointer flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Nervión</span>
          </button>
          <button
            onClick={() => scrollTo('modelos')}
            className="btn-celucosta-primary text-sm gap-2 cursor-pointer shadow-xs"
          >
            <span>Encuentra tu iPhone</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              triggerHaptic();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú"
            className="p-2 rounded-lg text-[#0d2a1c] hover:bg-[#0d2a1c]/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#f7f7f7] border-b border-[#0d2a1c]/15 px-5 py-4 space-y-3">
          <button
            onClick={() => scrollTo('modelos')}
            className="block w-full text-left py-2 font-medium text-lg text-[#0d2a1c]"
          >
            Modelos de iPhone
          </button>
          <button
            onClick={() => scrollTo('por-que')}
            className="block w-full text-left py-2 font-medium text-lg text-[#0d2a1c]"
          >
            Por qué comprar en Celucosta
          </button>
          <button
            onClick={() => scrollTo('garantia')}
            className="block w-full text-left py-2 font-medium text-lg text-[#0d2a1c]"
          >
            50 Pruebas y Garantía
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="block w-full text-left py-2 font-medium text-lg text-[#0d2a1c]"
          >
            Tienda Nervión y Contacto
          </button>
          <div className="pt-2 border-t border-[#0d2a1c]/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn-celucosta-secondary w-full justify-center text-sm py-2.5 cursor-pointer"
            >
              Contactar por WhatsApp
            </button>
            <button
              onClick={() => scrollTo('modelos')}
              className="btn-celucosta-primary w-full justify-center text-sm py-2.5 cursor-pointer"
            >
              Ver catálogo de iPhone
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
