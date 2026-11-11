import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Truck, Store, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreModels: () => void;
  onOpenHelp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreModels, onOpenHelp }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  // Parallax tilt on mouse move matching script.js specification
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let rafId: number | null = null;
    const maxTilt = 4;
    const maxMove = 10;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        const cx = e.clientX / w - 0.5;
        const cy = e.clientY / h - 0.5;
        const rotateX = (-cy * maxTilt).toFixed(2);
        const rotateY = (cx * maxTilt).toFixed(2);
        const tx = (cx * maxMove).toFixed(1);
        const ty = (cy * maxMove).toFixed(1);

        setTiltStyle({
          transform: `perspective(1000px) translate3d(${tx}px, ${ty}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        });
        rafId = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="top" className="pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d2a1c]/5 border border-[#0d2a1c]/10 text-xs font-medium text-[#0d2a1c] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#f6e016] inline-block animate-pulse"></span>
          <span>Stock disponible en Sevilla-Nervión • Envío urgente 24h</span>
        </div>

        {/* Hero Head Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 hero__head">
          <div className="lg:col-span-7">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.04] tracking-[-0.02em] text-[#0d2a1c] mb-6">
              iPhone nuevo y reacondicionado
            </h1>
            <p className="text-lg sm:text-xl text-[#5f6b64] leading-relaxed max-w-xl">
              Más de 50 pruebas funcionales por equipo. 12 meses de garantía. Envío en 24 h.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onExploreModels}
                className="btn-celucosta-primary group cursor-pointer text-base"
              >
                <span>Encuentra tu iPhone</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenHelp}
                className="btn-celucosta-secondary cursor-pointer text-base"
              >
                <span>Pide ayuda</span>
              </button>
            </div>

            {/* Quick Micro-Trust badges */}
            <div className="grid grid-cols-2 gap-2 text-xs text-[#0d2a1c]/80 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d2a1c]" /> 12 meses garantía
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d2a1c]" /> Recogida en 60 min
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d2a1c]" /> Financiación 0% TAE
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d2a1c]" /> 50 pruebas superadas
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Stage with Responsive Presentation & Parallax */}
        <div
          ref={stageRef}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0d2a1c] border border-[#0d2a1c]/10 shadow-xl"
          style={{ willChange: 'transform' }}
        >
          <div
            className="w-full relative transition-transform duration-200 h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden"
            style={tiltStyle}
          >
            {/* The photo part of share.jpg starts at ~44% from the top */}
            <img
              src="/share.jpg"
              alt="Smartphone con la pantalla encendida sobre una superficie neutra"
              className="w-full h-[185%] object-cover object-bottom select-none -translate-y-[44%]"
              width="1280"
              height="811"
              fetchPriority="high"
            />

            {/* Subtle gradient overlay to smoothly blend bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1c]/70 via-transparent to-transparent pointer-events-none"></div>

            {/* Subtly positioned overlay card with real technical guarantee */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md bg-[#0d2a1c]/90 backdrop-blur-md text-[#f7f7f7] p-4 sm:p-5 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-1.5 text-[#f6e016]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  Certificado Celucosta Sevilla
                </span>
              </div>
              <p className="text-sm font-normal text-white/90 leading-snug">
                Batería original certificada, pantalla original True Tone calibrada y componentes sin alertas de sistema.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillar feature badges below hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="bg-[#ebebeb] p-5 rounded-xl border border-[#0d2a1c]/5 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#0d2a1c] text-[#f6e016] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0d2a1c] text-base mb-1">Garantía real de 12 meses</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Sin intermediarios ni esperas en el extranjero. Atención y sustitución directa en nuestra tienda de Sevilla.
              </p>
            </div>
          </div>

          <div className="bg-[#ebebeb] p-5 rounded-xl border border-[#0d2a1c]/5 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#0d2a1c] text-[#f6e016] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0d2a1c] text-base mb-1">Envío 24h o Recogida 60 min</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Empaquetado protector y mensajería asegurada a península o recogida express en Nervión hoy mismo.
              </p>
            </div>
          </div>

          <div className="bg-[#ebebeb] p-5 rounded-xl border border-[#0d2a1c]/5 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#0d2a1c] text-[#f6e016] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0d2a1c] text-base mb-1">50 pruebas antes de la venta</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Revisamos microcomponentes, puertos, cámaras y Face ID. Entregamos informe funcional completo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
