import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  Smartphone,
  Award,
  MessageCircle,
  Truck,
  PackageCheck,
  Scissors,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CardData, PaymentMethod, Product } from '../../types';

interface PedidoConfirmadoScreenProps {
  product: Product;
  userPoints: number;
  userName?: string;
  address?: string;
  paymentMethod?: PaymentMethod;
  cardData?: CardData;
  onNext: () => void;
}

export const PedidoConfirmadoScreen: React.FC<PedidoConfirmadoScreenProps> = ({
  product,
  userPoints,
  userName = 'Camila Morales',
  address = 'Jr. Las Camelias 482, San Isidro, Lima',
  paymentMethod,
  cardData,
  onNext,
}) => {
  const [deliveryStep, setDeliveryStep] = useState<1 | 2 | 3>(3);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [chatFilter, setChatFilter] = useState<'all' | 'dispatch' | 'delivered'>('all');

  const firstName = userName ? userName.split(' ')[0] : 'Camila';
  const shortAddress = address ? address.split(',')[0] : 'tu domicilio';
  const last4 = cardData?.cardNumber?.replace(/\s/g, '').slice(-4) || '8821';

  return (
    <div className="flex-1 flex flex-col justify-between py-1 text-center">
      <div className="space-y-3 pb-3">
        {/* Header Success Badge */}
        <div className="pt-1">
          <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-2 shadow-[0_0_0_6px_rgba(220,252,231,0.5)]">
            <Check className="w-8 h-8 stroke-[2.8]" />
          </div>

          <h2 className="text-[20px] font-extrabold text-[#132a1c] tracking-tight">
            ¡Canje confirmado y despachado!
          </h2>
          <p className="text-[12px] text-[#60796b] max-w-[290px] mx-auto mt-0.5 leading-relaxed">
            Tu artículo de moda circular ha sido preparado y entregado con éxito.
          </p>
        </div>

        {/* Product Voucher Card & Payment Method */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3 text-left shadow-xs space-y-2">
          <div className="flex items-center gap-2.5">
            <img
              src={product.img}
              alt={product.n}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#e2ece5]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#60796b]">Cód. #CNJ-9481</span>
                <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                  Entregado
                </span>
              </div>
              <b className="text-[12.5px] text-[#132a1c] block truncate font-bold">
                {product.n}
              </b>
              <span className="text-[11px] text-[#60796b]">
                Saldo restante: <strong className="text-[#1e5c3c]">{userPoints} pts</strong>
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e2ece5] flex items-center justify-between text-[11.5px] text-[#132a1c]">
            <span className="text-[#60796b]">Método utilizado:</span>
            <div className="flex items-center gap-1.5 font-bold">
              {paymentMethod === 'Tarjeta Débito/Crédito' ? (
                <>
                  <CreditCard className="w-3.5 h-3.5 text-[#1e5c3c]" />
                  <span>Tarjeta •••• {last4}</span>
                </>
              ) : paymentMethod === 'Yape' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#742284]" />
                  <span>Yape</span>
                </>
              ) : paymentMethod === 'Plin' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#008080]" />
                  <span>Plin</span>
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5 text-[#1e5c3c]" />
                  <span>Puntos RETEX</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Timeline Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 text-left shadow-xs">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#e2ece5]">
            <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Seguimiento de Entrega
            </span>
            <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
              {deliveryStep === 3
                ? '3/3 Paquete Entregado'
                : deliveryStep === 2
                ? '2/3 En camino'
                : '1/3 En taller'}
            </span>
          </div>

          <div className="flex flex-col gap-3 relative pl-1">
            {/* Step 1 */}
            <div
              onClick={() => {
                setDeliveryStep(1);
                setChatFilter('dispatch');
              }}
              className="flex items-start gap-2.5 relative cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#1e5c3c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 z-10 shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="text-[12px] text-[#132a1c] flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#1e5c3c]" />
                  <span>1. Confección en Taller de Upcycling</span>
                </b>
                <span className="text-[11px] text-[#60796b] block">
                  Pieza inspeccionada y empaquetada en bolsa compostable.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => {
                setDeliveryStep(2);
                setChatFilter('dispatch');
              }}
              className="flex items-start gap-2.5 relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 z-10 shadow-xs transition-colors ${
                  deliveryStep >= 2
                    ? 'bg-[#1e5c3c] text-white'
                    : 'bg-[#e2ece5] text-[#60796b]'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="text-[12px] text-[#132a1c] flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#1e5c3c]" />
                  <span>2. Pedido en camino</span>
                </b>
                <span className="text-[11px] text-[#60796b] block">
                  Repartidor eco-friendly en ruta a {shortAddress}.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => {
                setDeliveryStep(3);
                setChatFilter('delivered');
              }}
              className="flex items-start gap-2.5 relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 z-10 shadow-xs transition-colors ${
                  deliveryStep >= 3
                    ? 'bg-[#15803d] text-white ring-4 ring-[#dcfce7]'
                    : 'bg-[#e2ece5] text-[#60796b]'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-[12px] text-[#15803d] flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5 text-[#15803d]" />
                    <span>3. ¡Entregado con éxito!</span>
                  </b>
                  <span className="text-[9.5px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                    Recepción confirmada
                  </span>
                </div>
                <span className="text-[11px] text-[#15803d] font-semibold block">
                  Recibido en tu domicilio registrado.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Delivery Notifications Card */}
        {showWhatsApp ? (
          <div className="bg-[#efeae2] rounded-2xl overflow-hidden border border-[#d9d3c7] shadow-sm text-left animate-in fade-in duration-200">
            {/* WhatsApp Top Header */}
            <div className="bg-[#008069] text-white py-2 px-3 text-[12px] font-bold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 leading-tight">
                    <span>RETEX Bot Oficial</span>
                    <span className="text-[9.5px] bg-white/20 px-1 rounded text-white font-medium">✓</span>
                  </div>
                  <span className="text-[9.5px] text-white/80 font-normal">Entrega de pedidos</span>
                </div>
              </div>
              <span className="text-[10px] bg-[#006a57] px-2 py-0.5 rounded-full text-white/90">
                2 mensajes
              </span>
            </div>

            {/* Filter Pills */}
            <div className="bg-[#e2ded5] px-3 py-1.5 flex gap-1.5 border-b border-[#d4cfc5]">
              <button
                type="button"
                onClick={() => setChatFilter('all')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                  chatFilter === 'all'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                Todos (2)
              </button>
              <button
                type="button"
                onClick={() => setChatFilter('dispatch')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                  chatFilter === 'dispatch'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                1. En camino
              </button>
              <button
                type="button"
                onClick={() => setChatFilter('delivered')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                  chatFilter === 'delivered'
                    ? 'bg-[#008069] text-white'
                    : 'bg-white/80 text-[#111b21] hover:bg-white'
                }`}
              >
                2. Entrega confirmada
              </button>
            </div>

            {/* Messages Thread */}
            <div className="p-3 space-y-2.5 max-h-[250px] overflow-y-auto">
              <div className="text-center my-0.5">
                <span className="bg-[#e1ded7] text-[#54656f] text-[9.5px] px-2 py-0.5 rounded-md font-semibold">
                  HOY
                </span>
              </div>

              {/* Message 1: Pedido en camino */}
              {(chatFilter === 'all' || chatFilter === 'dispatch') && (
                <div className="bg-white p-2.5 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xs text-[11.5px] text-[#111b21] leading-relaxed border-l-3 border-[#008069]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#008069] mb-1">
                    <span>🛍️ AVISO DE DESPACHO</span>
                    <span className="text-[#667781] font-normal">14:20</span>
                  </div>
                  <div>
                    <strong>¡Hola {firstName}!</strong> Tu producto sostenible <strong>{product.n}</strong> (#CNJ-9481) ya salió de nuestro taller aliado y se encuentra en camino a tu dirección ({shortAddress}).
                    <br />
                    El repartidor llegará en aproximadamente 35 minutos. 🛵🌱
                  </div>
                  <div className="text-right text-[10px] text-[#667781] mt-1 flex items-center justify-end gap-1">
                    <span>14:20</span>
                    <span className="text-[#53bdeb] font-bold">✓✓</span>
                  </div>
                </div>
              )}

              {/* Message 2: Confirmación de entrega */}
              {(chatFilter === 'all' || chatFilter === 'delivered') && (
                <div className="bg-[#d9fdd3] p-2.5 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xs text-[11.5px] text-[#111b21] leading-relaxed border-l-3 border-[#15803d]">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#15803d] mb-1">
                    <span>🎉 CONFIRMACIÓN DE ENTREGA</span>
                    <span className="text-[#667781] font-normal">14:55</span>
                  </div>
                  <div>
                    ✨ <strong>¡Entrega completada con éxito!</strong>
                    <br />
                    Tu <strong>{product.n}</strong> ha sido entregado en tu puerta en {shortAddress}.
                    <br />
                    <br />
                    ¡Esperamos que disfrutes de tu nueva prenda elaborada 100% con textiles recuperados! Gracias por apoyar la economía circular y a los talleres locales. 🌿📦
                  </div>
                  <div className="text-right text-[10px] text-[#667781] mt-1 flex items-center justify-end gap-1">
                    <span className="text-[#15803d] font-bold text-[10px]">¡Recibido!</span>
                    <span>14:55</span>
                    <span className="text-[#53bdeb] font-bold">✓✓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#efeae2] border border-[#d9d3c7] rounded-xl p-3 flex items-center justify-between text-left shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#008069] flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div>
                <b className="text-[12px] text-[#111b21] block">
                  Avisos de WhatsApp del pedido
                </b>
                <span className="text-[11px] text-[#60796b]">
                  Despacho en camino + Confirmación de entrega
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowWhatsApp(true)}
              className="text-[11.5px] font-bold text-[#008069] hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Ver chat</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setShowWhatsApp(!showWhatsApp)}
          className="w-full py-2 px-3 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border border-[#bcd6c5] rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>
            {showWhatsApp
              ? 'Ocultar chat de WhatsApp'
              : 'Ver notificaciones de WhatsApp (Despacho y Entrega)'}
          </span>
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#facc15]" />
          <span>Continuar a valorar el producto</span>
        </button>
      </div>
    </div>
  );
};
