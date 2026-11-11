import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenContact: () => void;
  onOpenCredits: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollTo,
  onOpenContact,
  onOpenCredits,
}) => {
  return (
    <footer id="contacto" className="bg-[#0d2a1c] text-[#f7f7f7] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Closing CTA Banner */}
        <div className="bg-[#1c3629] rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl text-[#f7f7f7] mb-2">
              Encuentra tu iPhone
            </h2>
            <p className="text-base text-[#f7f7f7]/80">
              Nuevo, reacondicionado, con garantía y envío en 24 h.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onScrollTo('modelos')}
              className="btn-celucosta-accent text-sm py-3 px-6 cursor-pointer gap-2 font-semibold shadow-md"
            >
              <span>Encuentra tu iPhone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center text-sm py-3 px-5 rounded-lg border border-white/25 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer"
            >
              Contactar con tienda
            </button>
          </div>
        </div>

        {/* Links Grid matching style.css structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#f6e016] text-[#0d2a1c] font-bold text-sm flex items-center justify-center">
                C
              </div>
              <span className="font-display text-2xl text-[#f7f7f7]">Celucosta</span>
            </div>
            <p className="text-sm text-[#f7f7f7]/85 font-medium">
              iPhone nuevo y usado con garantía, en Sevilla-Nervión.
            </p>
            <p className="text-xs text-[#97a39c]">
              Recogida en tienda o envío en 24 h.
            </p>
            <p className="text-xs text-[#97a39c]">
              Más de 50 pruebas por equipo. 12 meses de garantía directa.
            </p>
            <div className="pt-2 text-xs text-[#f7f7f7]/70 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f6e016]" />
              <span>Calle Luis de Morales / Eduardo Dato, 41018 Sevilla</span>
            </div>
          </div>

          {/* Tienda Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#97a39c]">
              Tienda
            </h3>
            <ul className="space-y-2 text-sm text-[#f7f7f7]/80">
              <li>
                <button
                  onClick={() => onScrollTo('modelos')}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  Modelos de iPhone
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('por-que')}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  Por qué comprar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('garantia')}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  50 Pruebas
                </button>
              </li>
            </ul>
          </div>

          {/* Ayuda Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#97a39c]">
              Ayuda
            </h3>
            <ul className="space-y-2 text-sm text-[#f7f7f7]/80">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  Reparaciones
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f6e016] transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp tienda</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#97a39c]">
              Legal y Transparencia
            </h3>
            <ul className="space-y-2 text-sm text-[#f7f7f7]/80">
              <li>
                <button
                  onClick={onOpenCredits}
                  className="hover:text-[#f6e016] transition-colors cursor-pointer text-left"
                >
                  Créditos y licencias
                </button>
              </li>
              <li>
                <a
                  href="/credits.html"
                  className="text-xs text-[#97a39c] hover:text-white transition-colors"
                >
                  Página de créditos HTML
                </a>
              </li>
              <li>
                <span className="text-xs text-[#97a39c] block">
                  Garantía regulada bajo Ley General para la Defensa de los Consumidores.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#97a39c]">
          <span>© 2026 Celucosta • Sevilla-Nervión</span>
          <button
            onClick={onOpenCredits}
            className="hover:text-[#f6e016] transition-colors cursor-pointer underline underline-offset-2"
          >
            Photographs via Wikimedia Commons
          </button>
        </div>
      </div>
    </footer>
  );
};
