import React, { useState } from 'react';
import { analyzePostalCode } from '../utils/pricing';
import {
  Shield,
  Truck,
  CreditCard,
  Store,
  MapPin,
  Clock,
  Phone,
  Search,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenContact: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenContact }) => {
  const [postalInput, setPostalInput] = useState<string>('41018');
  const [postalResult, setPostalResult] = useState(() => analyzePostalCode('41018'));

  const handleCheckPostal = (e: React.FormEvent) => {
    e.preventDefault();
    setPostalResult(analyzePostalCode(postalInput));
  };

  return (
    <section id="por-que" className="section py-16 md:py-24 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Head */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0d2a1c]/70 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Confianza y Transparencia</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-[-0.015em] text-[#0d2a1c] mb-3">
            Por qué comprar en Celucosta
          </h2>
          <p className="text-xl text-[#0d2a1c] font-medium leading-relaxed mb-4">
            Cada iPhone pasa más de 50 pruebas funcionales antes de la venta y lleva 12 meses de garantía.
          </p>
          <div className="space-y-2 text-base text-[#5f6b64]">
            <p>• Entrega en 24 h o recogida en la tienda de Sevilla-Nervión.</p>
            <p>• Pago con tarjeta, Bizum o financiación a 12 meses sin interés.</p>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-[#ebebeb] p-6 rounded-2xl border border-[#0d2a1c]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0d2a1c] mb-2">12 meses de garantía</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Reparación directa o cambio de terminal en nuestra tienda física de Sevilla. Sin trámites engorrosos.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0d2a1c] mt-4 block">
              Garantía por escrito
            </span>
          </div>

          <div className="bg-[#ebebeb] p-6 rounded-2xl border border-[#0d2a1c]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0d2a1c] mb-2">Envío en 24 h gratis</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Mensajería urgente con número de seguimiento y seguro al 100% del valor del iPhone.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0d2a1c] mt-4 block">
              Península y Baleares
            </span>
          </div>

          <div className="bg-[#ebebeb] p-6 rounded-2xl border border-[#0d2a1c]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0d2a1c] mb-2">Financiación 0% TAE</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Paga a plazos en 3, 6, 10 o 12 meses sin intereses ni comisiones de apertura. O Bizum instantáneo.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0d2a1c] mt-4 block">
              Aprobación inmediata
            </span>
          </div>

          <div className="bg-[#ebebeb] p-6 rounded-2xl border border-[#0d2a1c]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0d2a1c] mb-2">Tienda en Nervión</h3>
              <p className="text-sm text-[#5f6b64] leading-relaxed">
                Ven a ver y tocar los equipos antes de decidir. Asesoramiento técnico personalizado en Sevilla.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0d2a1c] mt-4 block">
              Recogida en 60 minutos
            </span>
          </div>
        </div>

        {/* Dual Panels: Postal Code Checker & Physical Store Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Postal Code Verification */}
          <div className="lg:col-span-6 bg-[#ebebeb] p-7 sm:p-8 rounded-3xl border border-[#0d2a1c]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-2">
                <Truck className="w-4 h-4" />
                <span>Comprobador de Envío y Recogida</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#0d2a1c] mb-3">
                ¿Cuándo recibiré mi iPhone?
              </h3>
              <p className="text-sm text-[#5f6b64] mb-6">
                Introduce tu código postal para consultar el plazo de entrega a domicilio o disponibilidad en tienda.
              </p>

              <form onSubmit={handleCheckPostal} className="flex gap-2 max-w-md mb-4">
                <input
                  type="text"
                  maxLength={5}
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej. 41018"
                  className="w-36 bg-white px-4 py-2.5 rounded-xl border border-[#0d2a1c]/20 font-mono text-base font-semibold text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                />
                <button
                  type="submit"
                  className="btn-celucosta-primary text-sm py-2.5 px-4 cursor-pointer gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              </form>

              {postalResult.isValid ? (
                <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
                  postalResult.isSeville
                    ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                    : 'bg-white text-[#0d2a1c] border-[#0d2a1c]/15'
                }`}>
                  <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${postalResult.isSeville ? 'text-[#f6e016]' : 'text-emerald-600'}`} />
                  <div>
                    <strong className="block font-semibold mb-1">
                      {postalResult.isSeville ? 'Zona Sevilla y Provincia (41xxx)' : 'Península Ibérica'}
                    </strong>
                    <p className={`text-xs ${postalResult.isSeville ? 'text-white/85' : 'text-[#5f6b64]'}`}>
                      {postalResult.message}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  {postalResult.message}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#0d2a1c]/10 text-xs text-[#5f6b64] flex items-center justify-between">
              <span>Pedidos antes de las 17:00 h salen el mismo día</span>
              <button
                onClick={onOpenContact}
                className="font-medium text-[#0d2a1c] hover:underline cursor-pointer"
              >
                ¿Dudas? Escríbenos
              </button>
            </div>
          </div>

          {/* Physical Store Location in Sevilla-Nervión */}
          <div className="lg:col-span-6 bg-[#0d2a1c] text-[#f7f7f7] p-7 sm:p-8 rounded-3xl border border-[#0d2a1c] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#f6e016] mb-2">
                <Store className="w-4 h-4" />
                <span>Punto de Venta y Servicio Oficial</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#f7f7f7] mb-2">
                Tienda física en Sevilla-Nervión
              </h3>
              <p className="text-sm text-[#f7f7f7]/80 mb-6 leading-relaxed">
                Ven a ver los modelos en exposición, comprobar el estado estético y resolver cualquier pregunta en persona.
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#f6e016] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium">Calle Luis de Morales / Eduardo Dato</strong>
                    <p className="text-xs text-[#f7f7f7]/70">41018 Nervión, Sevilla (Junto al Centro Comercial Nervión Plaza)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#f6e016] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium">Horario comercial</strong>
                    <p className="text-xs text-[#f7f7f7]/70">Lunes a Viernes: 10:00 – 14:00 y 17:00 – 20:30 | Sábados: 10:30 – 14:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#f6e016] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium">Atención directa</strong>
                    <p className="text-xs text-[#f7f7f7]/70">+34 954 00 12 34 • WhatsApp disponible 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#f7f7f7]/60">
                Metro Nervión (Línea 1) • Parking Nervión Plaza
              </span>
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-celucosta-accent text-xs font-semibold px-4 py-2 cursor-pointer"
              >
                Hablar con un asesor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
