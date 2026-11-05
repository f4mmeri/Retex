import React from 'react';
import { RefreshCw, Scissors, HeartHandshake } from 'lucide-react';

interface DestinoScreenProps {
  onNext: () => void;
}

export const DestinoScreen: React.FC<DestinoScreenProps> = ({ onNext }) => {
  const destinations = [
    {
      title: 'Planta Recicladora',
      desc: 'Telas desgastadas se trituran para crear nueva fibra textil o relleno aislante.',
      tag: 'Fibra recuperada',
      icon: RefreshCw,
    },
    {
      title: 'Taller de Upcycling',
      desc: 'Piezas aprovechables son rediseñadas en bolsos, mochilas y gorras.',
      tag: 'Transformación',
      icon: Scissors,
    },
    {
      title: 'Emprendimientos Sociales',
      desc: 'Ropa en excelente condición para iniciativas locales de segunda mano.',
      tag: 'Impacto social',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
            Destino circular de tus prendas
          </h2>
          <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
            Paso 5 de 7
          </span>
        </div>
        <p className="text-[12.5px] text-[#60796b] mb-3.5 leading-relaxed">
          El algoritmo de RETEX dirige cada prenda al canal con mayor impacto sostenible.
        </p>

        <div className="space-y-2.5">
          {destinations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 flex items-start gap-3 shadow-xs hover:border-[#1e5c3c] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaf4ed] text-[#1e5c3c] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <b className="text-[13px] text-[#132a1c] font-bold">
                      {item.title}
                    </b>
                    <span className="text-[9.5px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#60796b] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Continuar al estado de recojo</span>
        </button>
      </div>
    </div>
  );
};
