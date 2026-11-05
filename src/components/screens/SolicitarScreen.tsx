import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Check,
  Sparkles,
  Heart,
  Recycle,
  Layers,
  Info,
} from 'lucide-react';
import { ClothCondition, GarmentType } from '../../types';

interface SolicitarScreenProps {
  garmentType: string;
  garmentTypes?: string[];
  condition: ClothCondition;
  qtyBuenEstado?: number;
  qtyDeteriorada?: number;
  quantity: number;
  onGarmentTypesChange?: (types: string[]) => void;
  onGarmentTypeChange: (type: string) => void;
  onConditionChange: (cond: ClothCondition) => void;
  onQuantityChange: (qty: number) => void;
  onCountersChange?: (buen: number, det: number) => void;
  onNext: () => void;
  onCancel: () => void;
}

const AVAILABLE_GARMENT_TYPES: { id: string; label: string; icon: string }[] = [
  { id: 'Polo / Camiseta', label: 'Polos y Camisetas', icon: '👕' },
  { id: 'Pantalón / Jeans', label: 'Pantalones y Jeans', icon: '👖' },
  { id: 'Casaca / Abrigo', label: 'Casacas y Abrigos', icon: '🧥' },
  { id: 'Vestido / Falda', label: 'Vestidos y Faldas', icon: '👗' },
  { id: 'Ropa Infantil / Bebé', label: 'Ropa de Niños y Bebé', icon: '🧒' },
  { id: 'Ropa Mixta / Retazos', label: 'Telas y Retazos Mixtos', icon: '🧺' },
];

export const SolicitarScreen: React.FC<SolicitarScreenProps> = ({
  garmentType,
  garmentTypes,
  condition,
  qtyBuenEstado = 3,
  qtyDeteriorada = 2,
  quantity,
  onGarmentTypesChange,
  onGarmentTypeChange,
  onConditionChange,
  onQuantityChange,
  onCountersChange,
  onNext,
  onCancel,
}) => {
  // Local state for multi-select garment types
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    if (garmentTypes && garmentTypes.length > 0) return garmentTypes;
    if (garmentType) {
      const split = garmentType.split(',').map((s) => s.trim()).filter(Boolean);
      return split.length > 0 ? split : ['Polo / Camiseta', 'Pantalón / Jeans'];
    }
    return ['Polo / Camiseta', 'Pantalón / Jeans'];
  });

  // Local state for dual counters
  const [buenEstadoCount, setBuenEstadoCount] = useState<number>(qtyBuenEstado);
  const [deterioradaCount, setDeterioradaCount] = useState<number>(qtyDeteriorada);

  const totalQuantity = buenEstadoCount + deterioradaCount;
  const isMinimumMet = totalQuantity >= 5;
  const missingCount = Math.max(0, 5 - totalQuantity);

  // Sync back to parent when counters change
  const handleUpdateCounters = (buen: number, det: number) => {
    const validBuen = Math.max(0, buen);
    const validDet = Math.max(0, det);
    setBuenEstadoCount(validBuen);
    setDeterioradaCount(validDet);

    const total = validBuen + validDet;
    onQuantityChange(total);

    let calculatedCond: ClothCondition = 'Buen estado y Deteriorada';
    if (validBuen > 0 && validDet === 0) calculatedCond = 'Buen estado';
    else if (validBuen === 0 && validDet > 0) calculatedCond = 'Deteriorada';
    onConditionChange(calculatedCond);

    if (onCountersChange) {
      onCountersChange(validBuen, validDet);
    }
  };

  const handleToggleGarmentType = (typeId: string) => {
    let next: string[];
    if (selectedTypes.includes(typeId)) {
      // Don't allow unselecting everything
      if (selectedTypes.length === 1) return;
      next = selectedTypes.filter((t) => t !== typeId);
    } else {
      next = [...selectedTypes, typeId];
    }
    setSelectedTypes(next);
    const summary = next.join(', ');
    onGarmentTypeChange(summary);
    if (onGarmentTypesChange) {
      onGarmentTypesChange(next);
    }
  };

  const handleSelectAll = () => {
    const all = AVAILABLE_GARMENT_TYPES.map((g) => g.id);
    setSelectedTypes(all);
    onGarmentTypeChange(all.join(', '));
    if (onGarmentTypesChange) {
      onGarmentTypesChange(all);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-1 text-left">
      <div className="space-y-3 pb-2">
        {/* Step Indicator Header */}
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
              ¿Qué prendas deseas entregar?
            </h2>
            <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
              Paso 1 de 7
            </span>
          </div>
          <p className="text-[12px] text-[#60796b]">
            Elige los tipos de prendas y especifica cuántas tienes en cada estado.
          </p>
        </div>

        {/* SECTION 1: Multi-Select Garment Types */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Tipos de prenda (Opción múltiple)</span>
              <span className="text-[10px] font-black text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.2 rounded-full normal-case">
                {selectedTypes.length} seleccionadas
              </span>
            </label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[10.5px] font-bold text-[#1e5c3c] hover:underline cursor-pointer"
            >
              Marcar todas
            </button>
          </div>

          {/* Grid of Multi-Choice Garments */}
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_GARMENT_TYPES.map((g) => {
              const isSelected = selectedTypes.includes(g.id);
              return (
                <div
                  key={g.id}
                  onClick={() => handleToggleGarmentType(g.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
                    isSelected
                      ? 'bg-[#eaf4ed] border-[#1e5c3c] text-[#132a1c] shadow-xs'
                      : 'bg-[#f8faf8] border-[#e2ece5] text-[#60796b] hover:bg-white hover:border-[#bcd6c5]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[16px] shrink-0">{g.icon}</span>
                    <span className="text-[12px] font-bold truncate leading-tight">
                      {g.label}
                    </span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#1e5c3c] border-[#1e5c3c] text-white'
                        : 'border-[#cbd5e1] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-[10px] text-[#60796b] block">
            Puedes marcar una o más categorías de prendas que tengas listas en casa.
          </span>
        </div>

        {/* SECTION 2: Dual Counters for Fabric Condition */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block">
              2. Estado de la tela (Ambos disponibles)
            </label>
            <span className="text-[10.5px] font-black text-[#132a1c] bg-[#f1f5f2] px-2 py-0.5 rounded-full">
              Total: {totalQuantity} prendas
            </span>
          </div>

          <p className="text-[11px] text-[#60796b] leading-relaxed">
            Puedes entregar prendas en ambos estados. Asigna la cantidad en cada contador:
          </p>

          <div className="space-y-2.5">
            {/* Counter 1: Buen Estado */}
            <div className="bg-[#f8faf8] border border-[#e2ece5] hover:border-[#bcd6c5] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center text-[11px]">
                    <Heart className="w-3 h-3 fill-[#15803d]" />
                  </div>
                  <b className="text-[13px] font-bold text-[#132a1c]">
                    En Buen Estado
                  </b>
                  <span className="text-[9.5px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                    Donación
                  </span>
                </div>
                <span className="text-[10.5px] text-[#60796b] block leading-tight">
                  Limpias, sin roturas. Van a albergues benéficos y segunda mano.
                </span>
              </div>

              {/* Stepper */}
              <div className="flex items-center bg-white border border-[#bcd6c5] rounded-xl p-0.5 shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateCounters(buenEstadoCount - 1, deterioradaCount)
                  }
                  className="w-8 h-8 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] text-[#132a1c] hover:text-[#1e5c3c] font-black text-[15px] flex items-center justify-center transition-colors cursor-pointer"
                  disabled={buenEstadoCount <= 0}
                >
                  −
                </button>
                <div className="w-10 text-center text-[15px] font-black text-[#1e5c3c]">
                  {buenEstadoCount}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateCounters(buenEstadoCount + 1, deterioradaCount)
                  }
                  className="w-8 h-8 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] text-[#132a1c] hover:text-[#1e5c3c] font-black text-[15px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Counter 2: Deteriorada */}
            <div className="bg-[#f8faf8] border border-[#e2ece5] hover:border-[#bcd6c5] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-5 h-5 rounded-full bg-[#fef3c7] text-[#92400e] flex items-center justify-center text-[11px]">
                    <Recycle className="w-3 h-3 text-[#b45309]" />
                  </div>
                  <b className="text-[13px] font-bold text-[#132a1c]">
                    Deteriorada o Desgastada
                  </b>
                  <span className="text-[9.5px] font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.2 rounded">
                    Reciclaje
                  </span>
                </div>
                <span className="text-[10.5px] text-[#60796b] block leading-tight">
                  Telas rotas o manchadas. Se trituran o transforman en upcycling.
                </span>
              </div>

              {/* Stepper */}
              <div className="flex items-center bg-white border border-[#bcd6c5] rounded-xl p-0.5 shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateCounters(buenEstadoCount, deterioradaCount - 1)
                  }
                  className="w-8 h-8 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] text-[#132a1c] hover:text-[#1e5c3c] font-black text-[15px] flex items-center justify-center transition-colors cursor-pointer"
                  disabled={deterioradaCount <= 0}
                >
                  −
                </button>
                <div className="w-10 text-center text-[15px] font-black text-[#1e5c3c]">
                  {deterioradaCount}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateCounters(buenEstadoCount, deterioradaCount + 1)
                  }
                  className="w-8 h-8 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] text-[#132a1c] hover:text-[#1e5c3c] font-black text-[15px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Minimum 5 Garments Combined Validation Notice */}
        {isMinimumMet ? (
          <div className="bg-[#eaf4ed] border border-[#c9e4d3] rounded-2xl p-3 flex items-start gap-2.5 text-[#1a4d33] text-[12px] leading-relaxed shadow-xs animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
            <div>
              <b className="font-extrabold text-[#15803d] block mb-0.5">
                ¡Mínimo de prendas alcanzado! ({totalQuantity} prendas en total)
              </b>
              <span>
                Tienes <strong>{buenEstadoCount} en buen estado</strong> y{' '}
                <strong>{deterioradaCount} deterioradas</strong>. Cumples con el requisito de 5 prendas o más y calificas para <strong>recojo gratis a domicilio</strong>.
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-3 flex items-start gap-2.5 text-[#92400e] text-[12px] leading-relaxed shadow-xs animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div>
              <b className="font-extrabold text-[#b45309] block mb-0.5">
                Total actual: {totalQuantity} prendas (Faltan {missingCount})
              </b>
              <span>
                Para habilitar el paso de programación, la suma de ambos contadores debe ser de <strong>5 prendas o más</strong>. Agrega {missingCount} prenda(s) más en buen estado o deterioradas.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 pt-3">
        <button
          onClick={onNext}
          disabled={!isMinimumMet}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isMinimumMet
              ? 'bg-[#1e5c3c] hover:bg-[#17482f] text-white shadow-[0_4px_14px_rgba(30,92,60,0.22)] active:scale-[0.98]'
              : 'bg-[#e2ece5] text-[#86968d] cursor-not-allowed border border-[#d1ded4]'
          }`}
        >
          <span>Continuar a programación ({totalQuantity} prendas)</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={onCancel}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-transparent hover:border-[#1e5c3c] rounded-xl font-bold text-[13px] transition-all cursor-pointer text-center"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};
