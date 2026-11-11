import React, { useState } from 'react';
import { X, MessageCircle, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#f7f7f7] w-full max-w-lg rounded-3xl border border-[#0d2a1c]/15 shadow-2xl overflow-hidden relative">
        <div className="px-6 py-4 bg-[#ebebeb] border-b border-[#0d2a1c]/10 flex items-center justify-between">
          <h3 className="font-display text-xl text-[#0d2a1c]">Contacto y Ayuda Celucosta</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1 rounded-lg text-[#5f6b64] hover:text-[#0d2a1c] hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0d2a1c] text-[#f6e016] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display text-2xl text-[#0d2a1c]">Mensaje enviado</h4>
              <p className="text-sm text-[#5f6b64]">
                Un técnico de nuestra tienda de Sevilla-Nervión te responderá por teléfono o WhatsApp en menos de 1 hora.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-celucosta-primary text-sm py-2 px-5 mt-4 cursor-pointer"
              >
                Entendido
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick direct buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/34600000000?text=Hola%20Celucosta%2C%20quisiera%20asesoramiento%20sobre%20un%20iPhone."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0d2a1c] text-[#f7f7f7] hover:bg-[#17422d] transition-colors flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5 text-[#f6e016] shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs uppercase font-bold text-[#f6e016]">WhatsApp</span>
                    <span className="text-xs">Chat en directo</span>
                  </div>
                </a>

                <a
                  href="tel:+34954001234"
                  className="p-3.5 rounded-2xl bg-[#ebebeb] text-[#0d2a1c] hover:bg-neutral-200 transition-colors flex items-center gap-3 border border-[#0d2a1c]/10"
                >
                  <Phone className="w-5 h-5 text-[#0d2a1c] shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs uppercase font-bold text-[#0d2a1c]">Llamar</span>
                    <span className="text-xs text-[#5f6b64]">Tienda Nervión</span>
                  </div>
                </a>
              </div>

              {/* Consultation form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-[#0d2a1c]/10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0d2a1c]/70">
                  O déjanos tu consulta
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">Tu nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Alejandro Gómez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">Teléfono o WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0d2a1c] mb-1">¿En qué podemos ayudarte?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ej. Quiero saber qué iPhone tiene mejor batería o si aceptáis mi móvil antiguo como parte de pago..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl border border-[#0d2a1c]/20 text-sm text-[#0d2a1c] focus:outline-none focus:ring-2 focus:ring-[#0d2a1c]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-celucosta-primary w-full py-3 justify-center text-sm font-semibold cursor-pointer gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar consulta a tienda</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
