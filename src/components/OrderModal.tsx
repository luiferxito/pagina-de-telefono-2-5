import React, { useState } from 'react';
import { PhoneModelConfig, DeviceCondition, StorageTier, CONDITION_MULTIPLIERS, getDeliveryEstimate } from '../utils/pricing';
import {
  X,
  ShieldCheck,
  Truck,
  Store,
  CreditCard,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export interface OrderConfiguration {
  model: PhoneModelConfig;
  condition: DeviceCondition;
  storage: StorageTier;
  colorName: string;
  finalPrice: number;
  monthlyFinancing: string;
}

interface OrderModalProps {
  config: OrderConfiguration | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ config, onClose }) => {
  if (!config) return null;

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'bizum' | 'card' | 'financing'>('financing');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('41018');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const conditionInfo = CONDITION_MULTIPLIERS[config.condition];
  const deliveryEstimate = getDeliveryEstimate(deliveryType === 'pickup');

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const code = `CELU-${randomNum}`;
    setOrderCode(code);
    setOrderConfirmed(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Celucosta, quiero confirmar mi reserva ${orderCode}: ${config.model.name} (${config.storage}, ${config.colorName}, ${conditionInfo.label}) por ${config.finalPrice} €.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#f7f7f7] w-full max-w-xl rounded-3xl border border-[#0d2a1c]/15 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#ebebeb] border-b border-[#0d2a1c]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0d2a1c] text-[#f6e016] font-bold text-xs flex items-center justify-center">
              C
            </div>
            <h3 className="font-display text-xl text-[#0d2a1c]">
              {orderConfirmed ? '¡Reserva confirmada!' : 'Reserva de tu iPhone'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1 rounded-lg text-[#5f6b64] hover:text-[#0d2a1c] hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {orderConfirmed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-3xl text-[#0d2a1c]">
                Reserva registrada con éxito
              </h4>
              <p className="text-sm text-[#5f6b64] max-w-sm mx-auto">
                Código de seguimiento:{' '}
                <strong className="text-base font-mono text-[#0d2a1c] bg-[#ebebeb] px-2.5 py-1 rounded">
                  {orderCode}
                </strong>
              </p>

              <div className="bg-[#ebebeb] p-4 rounded-2xl text-left text-xs text-[#0d2a1c] space-y-2 border border-[#0d2a1c]/10 max-w-md mx-auto">
                <p>
                  <strong>Equipo:</strong> {config.model.name} • {config.storage} • {config.colorName}
                </p>
                <p>
                  <strong>Estado:</strong> {conditionInfo.label}
                </p>
                <p>
                  <strong>Total a abonar:</strong> {config.finalPrice} € (o {config.monthlyFinancing} al 0% TAE)
                </p>
                <p>
                  <strong>Modalidad:</strong>{' '}
                  {deliveryType === 'pickup'
                    ? 'Recogida en tienda Sevilla-Nervión (listo en 60 minutos)'
                    : `Envío urgente 24h a domicilio (${address}, C.P. ${postalCode})`}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/34600000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-celucosta-primary justify-center text-sm py-3 px-5 gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#f6e016]" />
                  <span>Confirmar por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-celucosta-secondary text-sm py-3 px-5 cursor-pointer justify-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Device summary pill */}
              <div className="bg-[#ebebeb] p-4 rounded-2xl border border-[#0d2a1c]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-[#0d2a1c]">
                    {config.model.name} • {config.storage}
                  </h4>
                  <p className="text-xs text-[#5f6b64]">
                    Color {config.colorName} • {conditionInfo.label}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl text-[#0d2a1c] block">
                    {config.finalPrice} €
                  </span>
                  <span className="text-[11px] text-[#0d2a1c] font-semibold">
                    o {config.monthlyFinancing}
                  </span>
                </div>
              </div>

              {/* Delivery method toggle */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-2">
                  Método de entrega
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                        : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent hover:border-[#0d2a1c]/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="w-4 h-4 text-[#f6e016]" />
                      <span className="font-semibold text-xs sm:text-sm">Recogida en tienda</span>
                    </div>
                    <span className="text-[11px] block opacity-85">
                      Sevilla-Nervión • Listo en 60 min
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                        : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent hover:border-[#0d2a1c]/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-[#f6e016]" />
                      <span className="font-semibold text-xs sm:text-sm">Envío a domicilio</span>
                    </div>
                    <span className="text-[11px] block opacity-85">
                      Urgente 24h gratis asegurado
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-[#5f6b64] mt-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0d2a1c]" />
                  <span>{deliveryEstimate.subtitle}</span>
                </p>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen Rodríguez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">
                      Teléfono móvil *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="600 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">
                    Email de confirmación *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carmen@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">
                        Dirección de envío *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Calle, número, piso..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="41018"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0d2a1c]/70 mb-2">
                  Forma de pago preferida
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('financing')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'financing'
                        ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                        : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent'
                    }`}
                  >
                    <span className="block font-semibold text-xs">Financiación 0%</span>
                    <span className="text-[10px] block opacity-80">Hasta 12 meses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bizum')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bizum'
                        ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                        : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent'
                    }`}
                  >
                    <span className="block font-semibold text-xs">Bizum</span>
                    <span className="text-[10px] block opacity-80">Instantáneo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#0d2a1c] text-[#f7f7f7] border-[#0d2a1c]'
                        : 'bg-[#ebebeb] text-[#0d2a1c] border-transparent'
                    }`}
                  >
                    <span className="block font-semibold text-xs">Tarjeta</span>
                    <span className="text-[10px] block opacity-80">En tienda / online</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-celucosta-primary w-full py-3.5 text-base font-semibold justify-center cursor-pointer shadow-md"
                >
                  <span>Confirmar reserva sin compromiso</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <p className="text-[11px] text-[#5f6b64] text-center mt-2">
                  No cobramos nada por adelantado. Puedes revisar el terminal y pagarlo en el momento de la entrega o recogida.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
