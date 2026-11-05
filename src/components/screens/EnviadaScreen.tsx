import React from 'react';
import { Check, Clock, ImageIcon } from 'lucide-react';
import { GarmentType } from '../../types';

interface EnviadaScreenProps {
  quantity: number;
  garmentType: string;
  photoUrl: string | null;
  onSimulateAccept: () => void;
  onSimulateReject: () => void;
}

export const EnviadaScreen: React.FC<EnviadaScreenProps> = ({
  quantity,
  garmentType,
  photoUrl,
  onSimulateAccept,
  onSimulateReject,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-4 text-center">
      <div className="my-auto">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-4 shadow-[0_0_0_8px_rgba(220,252,231,0.5)]">
          <Check className="w-10 h-10 stroke-[2.8]" />
        </div>

        <h2 className="text-[22px] font-extrabold text-[#132a1c] tracking-tight">
          ¡Solicitud recibida!
        </h2>
        <p className="text-[13px] text-[#60796b] max-w-[290px] mx-auto mt-2 mb-4 leading-relaxed">
          Estamos validando la ruta y el centro de acopio más cercano. Recibirás respuesta en 24 a 48 horas.
        </p>

        {/* Current status card */}
        <div className="bg-[#eaf4ed] border border-[#c9e4d3] rounded-xl py-2 px-3 mb-3 inline-flex items-center gap-1.5 text-[#1e5c3c] text-[12.5px] font-bold">
          <Clock className="w-4 h-4 text-[#1e5c3c]" />
          <span>Estado actual: En evaluación</span>
        </div>

        {/* Donation preview card */}
        <div className="bg-white border border-[#e2ece5] rounded-xl p-3 text-left flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Prendas donadas"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-lg object-cover border border-[#e2ece5] shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-lg bg-[#f8faf8] border border-[#e2ece5] flex items-center justify-center text-[#60796b] shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <b className="text-[12.5px] text-[#132a1c] block truncate">
                {quantity} prendas ({garmentType})
              </b>
              <span className="text-[11px] text-[#60796b]">
                📸 Foto: {photoUrl ? (
                  <strong className="text-[#15803d]">Adjunta y cargada</strong>
                ) : (
                  'Sin foto previa'
                )}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full shrink-0">
            Paso 3 de 7
          </span>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="flex flex-col gap-2 pt-4">
        <button
          onClick={onSimulateAccept}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Simular: Solicitud Aceptada</span>
        </button>

        <button
          onClick={onSimulateReject}
          className="w-full py-3 px-4 bg-transparent hover:bg-red-50 text-[#dc2626] border-[1.5px] border-[#dc2626] rounded-xl font-bold text-[13.5px] transition-colors cursor-pointer"
        >
          <span>Simular: Solicitud Rechazada</span>
        </button>
      </div>
    </div>
  );
};
