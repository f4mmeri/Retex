import React from 'react';
import { Plus, Star, Calendar, ChevronRight, Lightbulb } from 'lucide-react';
import { RETEX_LOGO_URL } from '../../data/products';

interface DashboardDonarScreenProps {
  userName: string;
  points: number;
  address?: string;
  onStartDonation: () => void;
  onViewTracking: () => void;
}

export const DashboardDonarScreen: React.FC<DashboardDonarScreenProps> = ({
  userName,
  points,
  address,
  onStartDonation,
  onViewTracking,
}) => {
  const firstName = userName ? userName.split(' ')[0] : 'Camila';

  return (
    <div className="flex-1 flex flex-col gap-3.5 pb-2">
      {/* Top Welcome Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={RETEX_LOGO_URL}
            alt="RETEX"
            referrerPolicy="no-referrer"
            className="h-8 w-auto object-contain"
          />
          <div>
            <h2 className="text-[16px] font-extrabold text-[#132a1c] leading-tight">
              ¡Hola, {firstName}! 👋
            </h2>
            <span className="text-[11.5px] text-[#60796b]">
              Dashboard de Donante · Lima, Perú
            </span>
          </div>
        </div>

        {/* Points Pill */}
        <div className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-3 py-1 rounded-full text-[12.5px] font-bold inline-flex items-center gap-1.5 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
          <span>{points} pts</span>
        </div>
      </div>

      {/* Eco Banner / Donation CTA Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#184c31] to-[#0d2e1c] text-white p-4 shadow-md">
        <div className="absolute -top-7 -right-7 w-32 h-32 bg-white/10 rounded-full blur-sm pointer-events-none" />

        <div className="w-12 h-12 rounded-xl bg-white/95 p-1.5 shadow-sm flex items-center justify-center mb-2.5">
          <img
            src={RETEX_LOGO_URL}
            alt="Donar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-[17px] font-extrabold tracking-tight mb-1">
          ¿Prendas en desuso?
        </h3>
        <p className="text-[12.5px] text-white/90 leading-relaxed mb-3.5">
          Solicita un recojo gratuito desde tu puerta y obtén puntos por cada kilogramo recuperado.
        </p>

        <button
          onClick={onStartDonation}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-[#1e5c3c] rounded-xl font-extrabold text-[13.5px] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Entregar / Donar ropa</span>
        </button>
      </div>

      {/* Active Donation Status Card */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13.5px] font-bold text-[#132a1c]">
            Recojos y Donaciones activas
          </h3>
          <span className="text-[10.5px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
            1 en curso
          </span>
        </div>

        <div className="bg-white border border-[#e2ece5] border-l-4 border-l-[#1e5c3c] rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <b className="text-[13px] text-[#132a1c]">Recojo programado</b>
            <span className="text-[10.5px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
              Confirmado
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-[#60796b] mt-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#1e5c3c]" />
            <span>Viernes, 15 de Septiembre · 8:00 a. m. – 12:00 p. m.</span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#e2ece5]/70 flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-[#60796b] truncate max-w-[210px]">
              5 prendas · {address?.split(',')[0] || 'Jr. Las Camelias 482'}
            </span>
            <button
              onClick={onViewTracking}
              className="text-[#1e5c3c] text-[11.5px] font-bold flex items-center gap-0.5 hover:underline cursor-pointer shrink-0"
            >
              <span>Ver tracking</span>
              <ChevronRight className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Eco Impact Summary */}
      <div>
        <h3 className="text-[13px] font-bold text-[#132a1c] mb-1.5">
          Tu impacto ecológico acumulado
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-2 text-center">
            <span className="text-[15px] font-extrabold text-[#1e5c3c] block">
              15
            </span>
            <span className="text-[10px] font-semibold text-[#60796b]">
              Prendas donadas
            </span>
          </div>

          <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-2 text-center">
            <span className="text-[15px] font-extrabold text-[#1e5c3c] block">
              3.4 kg
            </span>
            <span className="text-[10px] font-semibold text-[#60796b]">
              CO₂ ahorrados
            </span>
          </div>

          <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-2 text-center">
            <span className="text-[15px] font-extrabold text-[#1e5c3c] block">
              {points}
            </span>
            <span className="text-[10px] font-semibold text-[#60796b]">
              Puntos ganados
            </span>
          </div>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-1 text-[#132a1c]">
          <Lightbulb className="w-4 h-4 text-[#f59e0b]" />
          <b className="text-[12px]">Guía rápida: ¿Qué textiles aceptamos?</b>
        </div>
        <p className="text-[11.5px] text-[#60796b] leading-relaxed">
          Aceptamos polos, pantalones, jeans, ropa de cama y abrigos. No importa si están desgastados o con roturas; nuestro proceso clasifica para upcycling o triturado de fibra.
        </p>
      </div>
    </div>
  );
};
