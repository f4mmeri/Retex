import React from 'react';
import { Award, Check } from 'lucide-react';

interface PuntosScreenProps {
  quantity: number;
  lastAwardedPoints: number;
  totalPoints: number;
  onNext: () => void;
}

export const PuntosScreen: React.FC<PuntosScreenProps> = ({
  quantity,
  lastAwardedPoints,
  totalPoints,
  onNext,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-6 text-center">
      <div className="my-auto">
        {/* Check Icon */}
        <div className="w-20 h-20 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-4 shadow-[0_0_0_8px_rgba(220,252,231,0.5)]">
          <Check className="w-10 h-10 stroke-[2.8]" />
        </div>

        <h2 className="text-[22px] font-extrabold text-[#132a1c] tracking-tight">
          ¡Entrega completada!
        </h2>
        <p className="text-[13px] text-[#60796b] max-w-[280px] mx-auto mt-1 mb-5 leading-relaxed">
          Has donado con éxito {quantity} prendas textiles.
        </p>

        {/* Points Awarded Card */}
        <div className="bg-gradient-to-b from-white to-[#eaf4ed] border border-[#bcd6c5] rounded-2xl p-5 shadow-sm max-w-[300px] mx-auto">
          <span className="text-[11px] font-extrabold text-[#1e5c3c] uppercase tracking-wider block">
            Puntos acreditados
          </span>
          <div className="text-[36px] font-black text-[#1e5c3c] my-1 tracking-tight flex items-center justify-center gap-1.5">
            <Award className="w-8 h-8 text-[#f59e0b] fill-[#f59e0b]" />
            <span>+{lastAwardedPoints} pts</span>
          </div>
          <div className="text-[12px] text-[#60796b]">
            Saldo total actualizado:{' '}
            <strong className="text-[#132a1c] font-bold">{totalPoints} RETEX puntos</strong>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Continuar a valorar servicio</span>
        </button>
      </div>
    </div>
  );
};
