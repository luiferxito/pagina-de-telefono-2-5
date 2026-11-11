import React, { useState } from 'react';
import { INSPECTION_CATEGORIES, getTotalInspectionPoints } from '../utils/pricing';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Smartphone,
  Cpu,
  BatteryCharging,
  Eye,
  Volume2,
} from 'lucide-react';

interface InspectionSectionProps {
  onOpenOrder: () => void;
}

export const InspectionSection: React.FC<InspectionSectionProps> = ({ onOpenOrder }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const totalPoints = getTotalInspectionPoints();

  const categoryIcons = [
    <Eye className="w-5 h-5" key="eye" />,
    <BatteryCharging className="w-5 h-5" key="battery" />,
    <Sparkles className="w-5 h-5" key="sparkles" />,
    <Cpu className="w-5 h-5" key="cpu" />,
    <Volume2 className="w-5 h-5" key="audio" />,
  ];

  return (
    <section id="garantia" className="section py-20 md:py-28 bg-[#ebebeb] border-t border-[#0d2a1c]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Word-highlight moment as specified in original index.html */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-[#0d2a1c]/60 mb-4 inline-block px-3 py-1 bg-[#0d2a1c]/5 rounded-full">
            Antes de la venta
          </p>
          <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#0d2a1c] leading-[1.2] tracking-tight">
            Cada iPhone llega a nuestras manos antes que a las tuyas. Lo revisamos pieza a pieza, cambiamos lo que falla y lo probamos hasta que todo responde: batería, pantalla, cámara y{' '}
            <strong className="underline decoration-[#f6e016] decoration-4 underline-offset-4 font-semibold text-[#0d2a1c]">
              software
            </strong>.
          </p>
        </div>

        {/* 50 Points Inspection Explorer Card */}
        <div className="bg-[#f7f7f7] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#0d2a1c]/10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#0d2a1c]/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#0d2a1c]" />
                <span>Protocolo de Calidad Técnica</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#0d2a1c]">
                Las {totalPoints} pruebas funcionales
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#0d2a1c] text-[#f6e016] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certificado 100% Funcional</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
            {INSPECTION_CATEGORIES.map((cat, idx) => {
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c] shadow-sm'
                      : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent hover:border-[#0d2a1c]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={isSelected ? 'text-[#f6e016]' : 'text-[#0d2a1c]'}>
                      {categoryIcons[idx]}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-[#f6e016]' : 'bg-[#0d2a1c]/10 text-[#0d2a1c]'
                      }`}
                    >
                      {cat.pointsCount} pts
                    </span>
                  </div>
                  <span className="font-medium text-xs leading-snug line-clamp-2">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Inspection Checklist Details */}
          {(() => {
            const currentCat = INSPECTION_CATEGORIES[activeCategoryIndex];
            return (
              <div className="bg-[#ebebeb] p-6 sm:p-7 rounded-2xl border border-[#0d2a1c]/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-[#0d2a1c]">
                    {currentCat.title}
                  </h4>
                  <span className="text-xs font-medium text-[#5f6b64]">
                    {currentCat.pointsCount} comprobaciones automatizadas y manuales
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentCat.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#0d2a1c]/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0d2a1c] font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#0d2a1c]/10 text-xs text-[#5f6b64]">
                  <span>
                    Si un componente no supera el 100% del test, se sustituye por recambio original antes de salir a la venta.
                  </span>
                  <button
                    type="button"
                    onClick={onOpenOrder}
                    className="btn-celucosta-primary text-xs py-2 px-4 cursor-pointer font-semibold shrink-0"
                  >
                    Elegir mi iPhone garantizado
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
