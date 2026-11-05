import React from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ClothCondition, GarmentType } from '../../types';

interface SolicitarScreenProps {
  garmentType: GarmentType;
  condition: ClothCondition;
  quantity: number;
  onGarmentTypeChange: (type: GarmentType) => void;
  onConditionChange: (cond: ClothCondition) => void;
  onQuantityChange: (qty: number) => void;
  onNext: () => void;
  onCancel: () => void;
}

const GARMENT_OPTIONS: GarmentType[] = [
  'Polo / Camiseta',
  'Pantalón / Jeans',
  'Casaca / Abrigo',
  'Vestido / Falda',
  'Prendas Mixtas',
];

export const SolicitarScreen: React.FC<SolicitarScreenProps> = ({
  garmentType,
  condition,
  quantity,
  onGarmentTypeChange,
  onConditionChange,
  onQuantityChange,
  onNext,
  onCancel,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div>
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
            ¿Qué prendas deseas entregar?
          </h2>
          <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
            Paso 1 de 7
          </span>
        </div>
        <p className="text-[12.5px] text-[#60796b] mb-3">
          Configura tu paquete de prendas para reciclaje o reutilización.
        </p>

        {/* Form Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-xs space-y-4">
          {/* Garment Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Tipo de prenda
            </label>
            <select
              value={garmentType}
              onChange={(e) => onGarmentTypeChange(e.target.value as GarmentType)}
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-[#132a1c] outline-none focus:border-[#1e5c3c] transition-all cursor-pointer"
            >
              {GARMENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Chips */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Estado de la tela
            </label>
            <div className="flex gap-2">
              {(['Buen estado', 'Deteriorada'] as ClothCondition[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onConditionChange(c)}
                  className={`flex-1 py-2.5 px-2 text-center rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                    condition === c
                      ? 'bg-[#eaf4ed] border-[#1e5c3c] text-[#1e5c3c]'
                      : 'bg-white border-[#e2ece5] text-[#60796b] hover:bg-[#f8faf8]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Cantidad de prendas
            </label>
            <div className="flex items-center bg-white border-[1.5px] border-[#e2ece5] rounded-xl p-1">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] hover:text-[#1e5c3c] text-[#132a1c] text-lg font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                −
              </button>
              <div className="flex-1 text-center text-[20px] font-extrabold text-[#132a1c]">
                {quantity}
              </div>
              <button
                type="button"
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-[#f8faf8] hover:bg-[#eaf4ed] hover:text-[#1e5c3c] text-[#132a1c] text-lg font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Warning or Success Callout */}
        {quantity < 5 ? (
          <div className="mt-3 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3 flex items-start gap-2 text-[#92400e] text-[12px] leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <span>
              Tienes <strong>{quantity} {quantity === 1 ? 'prenda' : 'prendas'}</strong>. Se sugiere un mínimo de <strong>5 prendas</strong> para recojo a domicilio sin costo adicional.
            </span>
          </div>
        ) : (
          <div className="mt-3 bg-[#eaf4ed] border border-[#c9e4d3] rounded-xl p-3 flex items-start gap-2 text-[#1a4d33] text-[12px] leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-[#1e5c3c] shrink-0 mt-0.5" />
            <span>
              ¡Excelente! Tienes {quantity} prendas y calificas para <strong>recojo gratis</strong> a domicilio.
            </span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Continuar a programación</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={onCancel}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-transparent hover:border-[#1e5c3c] rounded-xl font-bold text-[13px] transition-all cursor-pointer"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};
