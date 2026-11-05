import React from 'react';
import { Check, X, Calendar, Clock, MapPin } from 'lucide-react';

interface AprobacionScreenProps {
  isDenied: boolean;
  address: string;
  scheduledDate: string;
  timeWindow: string;
  photoUrl: string | null;
  onNext: () => void;
  onReturnToDashboard: () => void;
}

export const AprobacionScreen: React.FC<AprobacionScreenProps> = ({
  isDenied,
  address,
  scheduledDate,
  timeWindow,
  photoUrl,
  onNext,
  onReturnToDashboard,
}) => {
  if (isDenied) {
    return (
      <div className="flex-1 flex flex-col justify-between py-6 text-center">
        <div className="my-auto">
          {/* Denied Red Icon */}
          <div className="w-20 h-20 rounded-full bg-[#fee2e2] text-[#dc2626] flex items-center justify-center mx-auto mb-4 shadow-[0_0_0_8px_rgba(254,226,226,0.5)]">
            <X className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-[22px] font-extrabold text-[#dc2626] tracking-tight">
            Solicitud no aceptada
          </h2>
          <p className="text-[13px] text-[#60796b] max-w-[290px] mx-auto mt-2 mb-4 leading-relaxed">
            Lamentablemente tu zona o el tipo de prenda especificado no cumplen con la cobertura actual de recojo gratuito.
          </p>
        </div>

        <button
          onClick={onReturnToDashboard}
          className="w-full py-3.5 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border-[1.5px] border-[#1e5c3c] rounded-xl font-bold text-[14px] transition-colors cursor-pointer"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between py-4 text-center">
      <div className="my-auto">
        {/* Approved Green Icon */}
        <div className="w-20 h-20 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-4 shadow-[0_0_0_8px_rgba(220,252,231,0.5)]">
          <Check className="w-10 h-10 stroke-[2.8]" />
        </div>

        <h2 className="text-[22px] font-extrabold text-[#132a1c] tracking-tight">
          ¡Tu solicitud fue aprobada!
        </h2>
        <p className="text-[13px] text-[#60796b] max-w-[280px] mx-auto mt-1.5 mb-4 leading-relaxed">
          Asignamos tu recojo al transportista ecológico.
        </p>

        {/* Confirmed Appointment Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 text-left shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#1e5c3c] uppercase tracking-wider">
              Cita confirmada
            </span>
            {photoUrl && (
              <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                Foto verificada
              </span>
            )}
          </div>

          <div className="space-y-2.5 text-[13px] text-[#132a1c]">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#1e5c3c] shrink-0" />
              <span>{scheduledDate || 'Viernes, 15/09/2026'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#1e5c3c] shrink-0" />
              <span>{timeWindow || '8:00 a. m. – 12:00 p. m.'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#1e5c3c] shrink-0" />
              <span className="truncate">{address || 'Av. Los Álamos 123, Miraflores'}</span>
            </div>

            {photoUrl && (
              <div className="pt-2.5 mt-2 border-t border-dashed border-[#e2ece5] flex items-center gap-2.5">
                <img
                  src={photoUrl}
                  alt="Prendas validadas"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-md object-cover border border-[#e2ece5]"
                />
                <div className="text-[11.5px] text-[#60796b]">
                  <b className="text-[#132a1c] block">Inspección digital aprobada</b>
                  Lote clasificado preliminarmente
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Continuar al proceso de destino</span>
        </button>
      </div>
    </div>
  );
};
