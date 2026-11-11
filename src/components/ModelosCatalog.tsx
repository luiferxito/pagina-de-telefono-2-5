import React, { useState } from 'react';
import {
  PHONE_CATALOG,
  PhoneModelConfig,
  DeviceCondition,
  StorageTier,
  CONDITION_MULTIPLIERS,
  STORAGE_SURCHARGES,
  calculateFinalPrice,
  calculateSavings,
  calculateFinancingMonthly,
} from '../utils/pricing';
import {
  ShieldCheck,
  Zap,
  Check,
  ChevronRight,
  ArrowRight,
  Calculator,
  Cpu,
  Layers,
  Battery,
  Camera,
  Smartphone,
} from 'lucide-react';

interface ModelosCatalogProps {
  onSelectForOrder: (config: {
    model: PhoneModelConfig;
    condition: DeviceCondition;
    storage: StorageTier;
    colorName: string;
    finalPrice: number;
    monthlyFinancing: string;
  }) => void;
  onOpenInspection: () => void;
}

export const ModelosCatalog: React.FC<ModelosCatalogProps> = ({
  onSelectForOrder,
  onOpenInspection,
}) => {
  // Active selected model in configurator
  const [selectedModelId, setSelectedModelId] = useState<string>('iphone-16');
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>('refurbished_excellent');
  const [selectedStorage, setSelectedStorage] = useState<StorageTier>('128GB');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [financingMonths, setFinancingMonths] = useState<number>(12);

  const activeModel = PHONE_CATALOG.find((m) => m.id === selectedModelId) || PHONE_CATALOG[0];
  const activeColor = activeModel.availableColors[selectedColorIndex] || activeModel.availableColors[0];

  const currentPrice = calculateFinalPrice(activeModel.basePrice, selectedCondition, selectedStorage);
  const savings = calculateSavings(activeModel.officialRrpNew, currentPrice);
  const financing = calculateFinancingMonthly(currentPrice, financingMonths);

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    setSelectedColorIndex(0); // Reset color index on model switch
  };

  const handleOrderClick = () => {
    onSelectForOrder({
      model: activeModel,
      condition: selectedCondition,
      storage: selectedStorage,
      colorName: activeColor.name,
      finalPrice: currentPrice,
      monthlyFinancing: financing.formatted,
    });
  };

  return (
    <section id="modelos" className="section py-16 md:py-24 bg-[#ebebeb] border-y border-[#0d2a1c]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0d2a1c]/70 mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Catálogo Celucosta</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-[-0.015em] text-[#0d2a1c] mb-3">
            Modelos de iPhone
          </h2>
          <p className="text-xl text-[#0d2a1c] font-medium mb-2">
            iPhone 16, 15 y 14, nuevos o reacondicionados.
          </p>
          <p className="text-base text-[#5f6b64] leading-relaxed">
            Elige el tamaño y el estado. Todos los equipos incluyen 12 meses de garantía y envío en 24 h.
          </p>
        </div>

        {/* Quick Model Selector Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {PHONE_CATALOG.map((phone) => {
            const isSelected = phone.id === selectedModelId;
            return (
              <button
                key={phone.id}
                onClick={() => handleModelChange(phone.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm sm:text-base transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d2a1c] text-[#f7f7f7] shadow-md scale-102'
                    : 'bg-[#f7f7f7] text-[#0d2a1c] hover:bg-white border border-[#0d2a1c]/10'
                }`}
              >
                <span>{phone.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#f6e016] text-[#0d2a1c] font-semibold' : 'bg-black/5 text-[#5f6b64]'
                  }`}
                >
                  Desde {phone.basePrice} €
                </span>
              </button>
            );
          })}
        </div>

        {/* Specifications List with Magnetic Dynamics (.rows--spec) */}
        <div className="mb-8 max-w-xl">
          <ul className="rows rows--spec bg-white/70 backdrop-blur-xs rounded-2xl p-2 border border-[#0d2a1c]/10 shadow-xs">
            {PHONE_CATALOG.map((phone) => {
              const isSelected = phone.id === selectedModelId;
              return (
                <li
                  key={phone.id}
                  onClick={() => handleModelChange(phone.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer ${
                    isSelected ? 'bg-[#ebebeb] font-semibold' : ''
                  }`}
                >
                  <span className="rows__name flex items-center gap-2.5 text-base text-[#0d2a1c]">
                    <span className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-[#0d2a1c]' : 'bg-[#0d2a1c]/30'}`}></span>
                    {phone.name}
                  </span>
                  <span className="rows__value text-sm font-semibold text-[#0d2a1c] bg-[#0d2a1c]/5 px-2.5 py-1 rounded-lg">
                    Desde {phone.basePrice} €
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Interactive Customizer Panel */}
        <div className="bg-[#f7f7f7] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#0d2a1c]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Device Visual Card & Specifications */}
            <div className="lg:col-span-5 bg-[#ebebeb] p-6 sm:p-7 rounded-2xl border border-[#0d2a1c]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#0d2a1c]/60">
                    Gama Oficial Apple
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#0d2a1c] text-[#f6e016] rounded-full">
                    Garantía 12 Meses
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-[#0d2a1c] mb-1">
                  {activeModel.name}
                </h3>
                <p className="text-sm text-[#5f6b64] mb-6">
                  {activeModel.tagline}
                </p>

                {/* Simulated Device Graphic with Chosen Color */}
                <div className="relative py-8 flex flex-col items-center justify-center">
                  <div
                    className="w-44 h-72 sm:w-48 sm:h-80 rounded-[2.5rem] p-3 shadow-xl transition-all duration-300 border-4 border-neutral-800 flex flex-col justify-between relative overflow-hidden"
                    style={{ backgroundColor: activeColor.hex }}
                  >
                    {/* Camera bump simulation */}
                    <div className="w-16 h-28 bg-black/20 backdrop-blur-xs rounded-2xl self-start p-2 flex flex-col justify-around border border-white/20">
                      <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-700 mx-auto shadow-inner"></div>
                      <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-700 mx-auto shadow-inner"></div>
                    </div>

                    {/* Apple Logo placeholder in center */}
                    <div className="self-center opacity-30 my-auto text-black">
                      <Smartphone className="w-8 h-8" />
                    </div>

                    {/* Bottom reflection accent */}
                    <div className="w-full text-center text-[10px] tracking-widest uppercase font-mono font-bold text-black/40 pb-1">
                      {activeColor.name}
                    </div>
                  </div>

                  <p className="text-xs text-[#5f6b64] mt-4 font-medium text-center">
                    Color seleccionado: <strong className="text-[#0d2a1c]">{activeColor.name}</strong>
                  </p>
                </div>
              </div>

              {/* Hardware Specs list */}
              <div className="mt-4 pt-4 border-t border-[#0d2a1c]/10 space-y-2.5 text-xs text-[#0d2a1c]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#0d2a1c]/70 shrink-0" />
                  <span>{activeModel.chip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0d2a1c]/70 shrink-0" />
                  <span>{activeModel.screen}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#0d2a1c]/70 shrink-0" />
                  <span>{activeModel.camera}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-[#0d2a1c]/70 shrink-0" />
                  <span>{activeModel.batteryHealthText}</span>
                </div>
              </div>
            </div>

            {/* Right: Configuration Selectors & Price Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Condition Selector */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-2">
                  1. Estado del equipo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['refurbished_excellent', 'refurbished_very_good', 'new'] as DeviceCondition[]).map((cond) => {
                    const isSelected = selectedCondition === cond;
                    const info = CONDITION_MULTIPLIERS[cond];
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setSelectedCondition(cond)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c] shadow-xs'
                            : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent hover:border-[#0d2a1c]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{info.label.split('(')[0]}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#f6e016]" />}
                        </div>
                        <span className={`text-[11px] block leading-tight ${isSelected ? 'text-[#f7f7f7]/80' : 'text-[#5f6b64]'}`}>
                          {cond === 'new' ? 'Precintado original' : cond === 'refurbished_excellent' ? 'Grado A+ impoluto' : 'Grado A testado'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Storage Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70">
                    2. Capacidad de almacenamiento
                  </label>
                  <span className="text-xs text-[#5f6b64]">Espacio libre recomendado</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['128GB', '256GB', '512GB'] as StorageTier[]).map((tier) => {
                    const isSelected = selectedStorage === tier;
                    const surcharge = STORAGE_SURCHARGES[tier];
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedStorage(tier)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c] shadow-xs'
                            : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent hover:border-[#0d2a1c]/20'
                        }`}
                      >
                        <span className="block font-bold text-base">{tier}</span>
                        <span className={`text-[11px] ${isSelected ? 'text-[#f6e016]' : 'text-[#5f6b64]'}`}>
                          {surcharge === 0 ? 'Incluido' : `+${surcharge} €`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Color Picker */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-2">
                  3. Acabado y Color
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {activeModel.availableColors.map((color, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        title={color.name}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0d2a1c] bg-[#0d2a1c]/5 shadow-xs'
                            : 'border-transparent bg-[#ebebeb] hover:bg-neutral-200'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                        <span className="text-xs font-medium text-[#0d2a1c]">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="bg-[#ebebeb] p-6 rounded-2xl border border-[#0d2a1c]/10">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#5f6b64] block">
                      Precio final Celucosta (IVA inc.)
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl sm:text-5xl text-[#0d2a1c] font-normal">
                        {currentPrice} €
                      </span>
                      {activeModel.officialRrpNew > currentPrice && (
                        <span className="text-sm line-through text-[#5f6b64]">
                          {activeModel.officialRrpNew} € oficial
                        </span>
                      )}
                    </div>
                  </div>

                  {savings.amount > 0 && (
                    <div className="bg-[#0d2a1c] text-[#f6e016] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Ahorras {savings.amount} € (-{savings.percentage}%)</span>
                    </div>
                  )}
                </div>

                {/* 0% TAE Financing Simulator */}
                <div className="pt-4 mt-4 border-t border-[#0d2a1c]/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#0d2a1c]">
                    <Calculator className="w-4 h-4 text-[#0d2a1c]" />
                    <span>
                      Financiación al 0% TAE:{' '}
                      <strong className="text-[#0d2a1c] font-bold">{financing.formatted}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[3, 6, 10, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFinancingMonths(m)}
                        className={`px-2 py-0.5 rounded text-xs cursor-pointer font-medium ${
                          financingMonths === m
                            ? 'bg-[#0d2a1c] text-white font-bold'
                            : 'bg-white/80 text-[#5f6b64] hover:bg-white'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleOrderClick}
                    className="btn-celucosta-primary flex-1 justify-center py-3.5 text-base font-semibold cursor-pointer shadow-md"
                  >
                    <span>Reservar este iPhone</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenInspection}
                    className="btn-celucosta-secondary text-xs sm:text-sm py-3.5 px-4 justify-center cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-[#0d2a1c]" />
                    <span>Ver las 50 pruebas</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#5f6b64] text-center mt-3">
                  Pago seguro • Envío gratuito en 24h a toda España o recogida en tienda Sevilla-Nervión.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Model Price Comparison Grid from original layout */}
        <div className="mt-12 pt-8 border-t border-[#0d2a1c]/10">
          <h3 className="font-semibold text-lg text-[#0d2a1c] mb-4">
            Resumen de modelos disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHONE_CATALOG.map((item) => (
              <div
                key={item.id}
                onClick={() => handleModelChange(item.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  item.id === selectedModelId
                    ? 'bg-[#f7f7f7] border-[#0d2a1c] shadow-md scale-101'
                    : 'bg-[#f7f7f7]/60 border-[#0d2a1c]/10 hover:bg-[#f7f7f7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg text-[#0d2a1c]">{item.name}</h4>
                  <span className="font-display text-xl text-[#0d2a1c]">Desde {item.basePrice} €</span>
                </div>
                <p className="text-xs text-[#5f6b64] mb-3 line-clamp-2">{item.tagline}</p>
                <div className="flex items-center justify-between text-xs font-medium text-[#0d2a1c]">
                  <span>12 meses garantía</span>
                  <span className="flex items-center text-[#0d2a1c] group-hover:translate-x-1">
                    Configurar <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
