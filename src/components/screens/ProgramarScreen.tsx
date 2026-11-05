import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Check, Trash2, ArrowLeft } from 'lucide-react';
import { ClothCondition, GarmentType } from '../../types';
import { SAMPLE_DONATION_PHOTO } from '../../data/products';

interface ProgramarScreenProps {
  address: string;
  scheduledDate: string;
  timeWindow: string;
  quantity: number;
  garmentType: string;
  condition: ClothCondition;
  qtyBuenEstado?: number;
  qtyDeteriorada?: number;
  photoUrl: string | null;
  photoName: string;
  onAddressChange: (address: string) => void;
  onDateChange: (date: string) => void;
  onTimeWindowChange: (time: string) => void;
  onPhotoUpload: (fileUrl: string, fileName: string) => void;
  onRemovePhoto: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProgramarScreen: React.FC<ProgramarScreenProps> = ({
  address,
  scheduledDate,
  timeWindow,
  quantity,
  garmentType,
  condition,
  qtyBuenEstado,
  qtyDeteriorada,
  photoUrl,
  photoName,
  onAddressChange,
  onDateChange,
  onTimeWindowChange,
  onPhotoUpload,
  onRemovePhoto,
  onNext,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoUpload(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSamplePhoto = () => {
    onPhotoUpload(SAMPLE_DONATION_PHOTO, 'lote_prendas_demo.jpg');
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div>
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
            Programa el recojo gratuito
          </h2>
          <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
            Paso 2 de 7
          </span>
        </div>
        <p className="text-[12.5px] text-[#60796b] mb-3">
          Un recolector aliado irá a recoger tus prendas a la dirección indicada.
        </p>

        {/* Schedule Form Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-xs space-y-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Dirección de recojo
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Dirección, Distrito, Ciudad"
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3 py-2 text-[13.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c] focus:ring-1 focus:ring-[#1e5c3c]/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Fecha estimada
            </label>
            <input
              type="text"
              value={scheduledDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3 py-2 text-[13.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c] focus:ring-1 focus:ring-[#1e5c3c]/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Ventana horaria
            </label>
            <select
              value={timeWindow}
              onChange={(e) => onTimeWindowChange(e.target.value)}
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3 py-2 text-[13.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c] transition-all cursor-pointer"
            >
              <option value="Mañana: 8:00 a. m. – 12:00 p. m.">
                Mañana: 8:00 a. m. – 12:00 p. m.
              </option>
              <option value="Tarde: 2:00 p. m. – 5:00 p. m.">
                Tarde: 2:00 p. m. – 5:00 p. m.
              </option>
            </select>
          </div>

          {/* Photo Section */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                Foto de las prendas
              </label>
              <span className="text-[10px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
                Recomendado
              </span>
            </div>
            <span className="text-[11px] text-[#60796b] leading-tight mb-1">
              Sube una foto del lote de ropa para agilizar la revisión y clasificación previa.
            </span>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {photoUrl ? (
              <div className="border-[1.5px] border-[#bcd6c5] bg-[#f8faf8] rounded-xl p-2.5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#e2ece5] border border-[#e2ece5]">
                  <img
                    src={photoUrl}
                    alt="Prendas subidas"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10.5px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Foto adjunta
                    </span>
                  </div>
                  <div className="text-[12px] font-bold text-[#132a1c] truncate">
                    {photoName || 'ropa_donacion.jpg'}
                  </div>
                  <div className="flex gap-3 mt-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#1e5c3c] font-bold hover:underline cursor-pointer"
                    >
                      Cambiar foto
                    </button>
                    <button
                      type="button"
                      onClick={onRemovePhoto}
                      className="text-[#dc2626] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#bcd6c5] hover:border-[#1e5c3c] bg-[#eaf4ed]/60 rounded-xl p-4 text-center cursor-pointer transition-colors"
              >
                <div className="flex justify-center gap-2 mb-1.5 text-[#1e5c3c]">
                  <Camera className="w-5 h-5 stroke-[2]" />
                  <ImageIcon className="w-5 h-5 stroke-[2]" />
                </div>
                <b className="text-[12.5px] text-[#1e5c3c] block">
                  Tomar foto o subir imagen
                </b>
                <span className="text-[11px] text-[#60796b] block mt-0.5">
                  PNG, JPG hasta 10 MB
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseSamplePhoto();
                  }}
                  className="mt-2 text-[11px] font-bold text-[#1e5c3c] bg-[#1e5c3c]/10 hover:bg-[#1e5c3c]/20 border border-[#1e5c3c]/25 rounded-full px-2.5 py-1 transition-colors cursor-pointer"
                >
                  + Usar foto de muestra
                </button>
              </div>
            )}
          </div>

          {/* Summary Box */}
          <div className="pt-1">
            <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block mb-1">
              Resumen del paquete
            </label>
            <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-2 text-[12px] font-semibold text-[#132a1c] space-y-0.5">
              <div className="flex items-center justify-between">
                <span>📦 {quantity} prendas en total</span>
                <span className="text-[10px] text-[#1e5c3c] font-black bg-[#eaf4ed] px-2 py-0.2 rounded-full">
                  {condition}
                </span>
              </div>
              <div className="text-[11px] text-[#60796b]">
                {garmentType}
                {qtyBuenEstado !== undefined && qtyDeteriorada !== undefined && (
                  <span> ({qtyBuenEstado} en buen estado + {qtyDeteriorada} deterioradas)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Confirmar y Enviar Solicitud</span>
        </button>

        <button
          onClick={onBack}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-transparent hover:border-[#1e5c3c] rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Atrás</span>
        </button>
      </div>
    </div>
  );
};
