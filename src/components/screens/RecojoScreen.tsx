import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Truck,
  Building2,
  Factory,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface RecojoScreenProps {
  quantity: number;
  showWhatsAppModal: boolean;
  onToggleWhatsApp: () => void;
  onCompletePickup: () => void;
}

export const RecojoScreen: React.FC<RecojoScreenProps> = ({
  quantity,
  showWhatsAppModal,
  onToggleWhatsApp,
  onCompletePickup,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(3);
  const [activeMessageFilter, setActiveMessageFilter] = useState<'all' | 'step1' | 'step3'>('all');

  const pointsToEarn = quantity * 30;

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="space-y-3">
        {/* Step Indicator Header */}
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
              Seguimiento del Recojo
            </h2>
            <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
              Paso 6 de 7
            </span>
          </div>
          <p className="text-[12.5px] text-[#60796b] leading-relaxed">
            Rastrea en tiempo real el traslado y llegada de tus prendas al aprovechador.
          </p>
        </div>

        {/* Timeline Tracker Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2ece5] mb-3">
            <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Estado de la ruta
            </span>
            <span className="text-[10.5px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
              {currentStep === 3
                ? 'Llegada al aprovechador'
                : currentStep === 2
                ? 'En clasificación'
                : 'Recojo en camino'}
            </span>
          </div>

          <div className="flex flex-col gap-4 relative pl-1">
            {/* Step 1 */}
            <div
              onClick={() => {
                setCurrentStep(1);
                setActiveMessageFilter('step1');
              }}
              className="flex items-start gap-3 relative cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 z-10 shadow-xs transition-colors ${
                  currentStep >= 1
                    ? 'bg-[#1e5c3c] text-white'
                    : 'bg-[#e2ece5] text-[#60796b]'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-[13px] text-[#132a1c] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#1e5c3c]" />
                    <span>1. Recojo en camino</span>
                  </b>
                  <span className="text-[10px] font-mono text-[#15803d] font-bold">
                    Completado
                  </span>
                </div>
                <span className="text-[11.5px] text-[#60796b]">
                  Transportista eco-friendly recogió el paquete en tu puerta.
                </span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="absolute left-4.5 top-5 bottom-8 w-0.5 bg-[#cbdad1] -z-0" />

            {/* Step 2 */}
            <div
              onClick={() => setCurrentStep(2)}
              className="flex items-start gap-3 relative cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 z-10 shadow-xs transition-colors ${
                  currentStep >= 2
                    ? 'bg-[#1e5c3c] text-white'
                    : 'bg-[#e2ece5] text-[#60796b]'
                }`}
              >
                {currentStep >= 2 ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>2</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-[13px] text-[#132a1c] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1e5c3c]" />
                    <span>2. Centro de Clasificación</span>
                  </b>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      currentStep >= 2 ? 'text-[#15803d]' : 'text-[#60796b]'
                    }`}
                  >
                    {currentStep >= 2 ? 'Verificado' : 'En proceso'}
                  </span>
                </div>
                <span className="text-[11.5px] text-[#60796b]">
                  Inspección técnica, pesaje ({quantity} prendas) y triage de fibras.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => {
                setCurrentStep(3);
                setActiveMessageFilter('step3');
              }}
              className="flex items-start gap-3 relative cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 z-10 shadow-xs transition-colors ${
                  currentStep >= 3
                    ? 'bg-[#15803d] text-white ring-4 ring-[#dcfce7]'
                    : 'bg-[#e2ece5] text-[#60796b]'
                }`}
              >
                {currentStep >= 3 ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>3</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-[13px] text-[#132a1c] flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-[#15803d]" />
                    <span>3. Entrega al Aprovechador</span>
                  </b>
                  <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                    ¡Prendas recibidas!
                  </span>
                </div>
                <span className="text-[11.5px] text-[#15803d] font-semibold block">
                  Llegada confirmada al Taller de Suprarreciclaje y Planta de Fibra.
                </span>
                <span className="text-[11px] text-[#60796b]">
                  Reincorporación directa al ciclo de vida sostenible.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Notification Center */}
        {showWhatsAppModal ? (
          <div className="bg-[#efeae2] rounded-2xl overflow-hidden border border-[#d9d3c7] shadow-sm animate-in fade-in duration-200">
            {/* WhatsApp Header */}
            <div className="bg-[#008069] text-white py-2 px-3 text-[12px] font-bold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 leading-tight">
                    <span>RETEX Bot Oficial</span>
                    <span className="text-[10px] bg-white/20 px-1 rounded text-white font-medium">✓</span>
                  </div>
                  <span className="text-[9.5px] text-white/80 font-normal">Cuenta empresarial verificada</span>
                </div>
              </div>
              <span className="text-[10px] bg-[#006a57] px-2 py-0.5 rounded-full text-white/90">
                2 avisos
              </span>
            </div>

            {/* Filter Pills inside WhatsApp */}
            <div className="bg-[#e2ded5] px-3 py-1.5 flex gap-1.5 border-b border-[#d4cfc5]">
              <button
                type="button"
                onClick={() => setActiveMessageFilter('all')}
                className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold transition-colors cursor-pointer ${
                  activeMessageFilter === 'all'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                Todos (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveMessageFilter('step1')}
                className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold transition-colors cursor-pointer ${
                  activeMessageFilter === 'step1'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                1. Recojo en camino
              </button>
              <button
                type="button"
                onClick={() => setActiveMessageFilter('step3')}
                className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold transition-colors cursor-pointer ${
                  activeMessageFilter === 'step3'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                3. Llegada al aprovechador
              </button>
            </div>

            {/* Chat Conversation Thread */}
            <div className="p-3 space-y-2.5 max-h-[260px] overflow-y-auto">
              {/* Date divider */}
              <div className="text-center my-1">
                <span className="bg-[#e1ded7] text-[#54656f] text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  HOY
                </span>
              </div>

              {/* Message 1: Recojo en camino */}
              {(activeMessageFilter === 'all' || activeMessageFilter === 'step1') && (
                <div className="bg-white p-2.5 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xs text-[11.5px] text-[#111b21] leading-relaxed relative border-l-3 border-[#008069]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#008069] mb-1">
                    <span>🚚 AVISO 1: RECOJO EN CAMINO</span>
                    <span className="text-[#667781] font-normal">08:30 a. m.</span>
                  </div>
                  <div>
                    <strong>¡Hola Camila!</strong> Tu recojo está en marcha. Nuestro transportista ecológico se encuentra en ruta hacia tu domicilio registrado en San Isidro. Te timbrará al llegar para retirar las {quantity} prendas.
                  </div>
                  <div className="text-right text-[10px] text-[#667781] mt-1 flex items-center justify-end gap-1">
                    <span>08:30 a. m.</span>
                    <span className="text-[#53bdeb] font-bold">✓✓</span>
                  </div>
                </div>
              )}

              {/* Message 2: Entrega al aprovechador */}
              {(activeMessageFilter === 'all' || activeMessageFilter === 'step3') && (
                <div className="bg-[#d9fdd3] p-2.5 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xs text-[11.5px] text-[#111b21] leading-relaxed relative border-l-3 border-[#15803d]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#15803d] mb-1">
                    <span>🏭 AVISO 2: ENTREGA AL APROVECHADOR</span>
                    <span className="text-[#667781] font-normal">11:45 a. m.</span>
                  </div>
                  <div>
                    ✨ <strong>¡Tus prendas ya llegaron al aprovechador!</strong>
                    <br />
                    Tus <strong>{quantity} prendas</strong> han sido recibidas exitosamente en nuestro <em>Taller de Upcycling Textil y Planta de Hilado Sostenible</em>.
                    <br />
                    <br />
                    Han superado la verificación técnica de fibras y han sido asignadas a confección de mochilas y triturado textil. ¡Gracias por cerrar el ciclo ecológico! 🌿♻️
                  </div>
                  <div className="text-right text-[10px] text-[#667781] mt-1 flex items-center justify-end gap-1">
                    <span className="text-[#15803d] font-bold text-[10px]">¡Llegada confirmada!</span>
                    <span>11:45 a. m.</span>
                    <span className="text-[#53bdeb] font-bold">✓✓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* WhatsApp Teaser Banner */
          <div className="bg-[#efeae2] border border-[#d9d3c7] rounded-xl p-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#008069] flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div>
                <b className="text-[12px] text-[#111b21] block">
                  Avisos de WhatsApp disponibles
                </b>
                <span className="text-[11px] text-[#60796b]">
                  Recojo en camino + Llegada al aprovechador
                </span>
              </div>
            </div>
            <button
              onClick={onToggleWhatsApp}
              className="text-[11.5px] font-bold text-[#008069] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Ver chat</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        )}

        <button
          onClick={onToggleWhatsApp}
          className="w-full py-2 px-3 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-[#bcd6c5] rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>
            {showWhatsAppModal
              ? 'Ocultar chat de WhatsApp'
              : 'Ver notificaciones de WhatsApp (Ruta y Aprovechador)'}
          </span>
        </button>
      </div>

      {/* Completion Simulation Action */}
      <div className="pt-3">
        <button
          onClick={onCompletePickup}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#facc15]" />
          <span>Finalizar entrega y acreditar (+{pointsToEarn} pts)</span>
        </button>
      </div>
    </div>
  );
};
