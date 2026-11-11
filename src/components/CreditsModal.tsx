import React from 'react';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#f7f7f7] w-full max-w-lg rounded-3xl border border-[#0d2a1c]/15 shadow-2xl overflow-hidden relative">
        <div className="px-6 py-4 bg-[#ebebeb] border-b border-[#0d2a1c]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#0d2a1c]" />
            <h3 className="font-display text-xl text-[#0d2a1c]">
              Créditos de las fotografías
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

        <div className="p-6 space-y-4 text-sm text-[#0d2a1c]">
          <p className="text-xs text-[#5f6b64] leading-relaxed bg-[#ebebeb] p-3.5 rounded-xl border border-[#0d2a1c]/5">
            Los fotógrafos, las licencias y las páginas de origen de las fotografías de referencia de la web de Celucosta. Todas las imágenes que aparecen en esta página son fotografías de referencia (stand-ins); se publicarán en el informe de entrega y el cliente las sustituirá por sus propias fotografías de iPhone antes de que el sitio se publique.
          </p>

          <ul className="space-y-3 pt-2">
            <li className="p-3 rounded-xl bg-white border border-[#0d2a1c]/10">
              <strong className="block text-[#0d2a1c] mb-0.5">
                Smartphone con la pantalla encendida
              </strong>
              <div className="text-xs text-[#5f6b64] flex items-center justify-between">
                <span>Skitterphoto • Licencia CC0</span>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Smartphone_display_screen.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0d2a1c] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Wikimedia Commons <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </li>

            <li className="p-3 rounded-xl bg-white border border-[#0d2a1c]/10">
              <strong className="block text-[#0d2a1c] mb-0.5">
                Varios iPhone de distintos modelos
              </strong>
              <div className="text-xs text-[#5f6b64] flex items-center justify-between">
                <span>Ka Kit Pang • Licencia CC BY-SA 4.0</span>
                <a
                  href="https://commons.wikimedia.org/wiki/File:IPhone_models.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0d2a1c] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Wikimedia Commons <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </li>

            <li className="p-3 rounded-xl bg-white border border-[#0d2a1c]/10">
              <strong className="block text-[#0d2a1c] mb-0.5">
                Dos iPhone de generaciones distintas
              </strong>
              <div className="text-xs text-[#5f6b64] flex items-center justify-between">
                <span>CGBR • Licencia CC BY-SA 4.0</span>
                <a
                  href="https://commons.wikimedia.org/wiki/File:IPhone_13_iPhone_4s_frontside.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0d2a1c] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Wikimedia Commons <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </li>
          </ul>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="btn-celucosta-secondary text-xs py-2 px-6 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
