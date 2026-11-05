import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
  Info,
  Sparkles,
} from 'lucide-react';
import { CardData, PaymentMethod, Product } from '../../types';

interface PagoCanjeScreenProps {
  product: Product;
  userPoints: number;
  paymentMethod: PaymentMethod;
  cardData: CardData;
  applyPointsDiscount: boolean;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onCardDataChange: (data: CardData) => void;
  onTogglePointsDiscount: (val: boolean) => void;
  onConfirmCheckout: (pointsUsed: number) => void;
}

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'Tarjeta Débito/Crédito', label: 'Tarjeta Débito / Crédito', icon: '💳' },
  { id: 'Yape', label: 'Yape', icon: '📱' },
  { id: 'Plin', label: 'Plin', icon: '📲' },
];

export const PagoCanjeScreen: React.FC<PagoCanjeScreenProps> = ({
  product,
  userPoints,
  paymentMethod,
  cardData,
  applyPointsDiscount,
  onPaymentMethodChange,
  onCardDataChange,
  onTogglePointsDiscount,
  onConfirmCheckout,
}) => {
  const [yapePhone, setYapePhone] = useState('987 654 321');
  const [yapeOtp, setYapeOtp] = useState('482910');
  const [plinPhone, setPlinPhone] = useState('987 654 321');
  const [cardErrors, setCardErrors] = useState<{
    number?: string;
    holder?: string;
    expiry?: string;
    cvv?: string;
  }>({});

  const pointsToDeduct = applyPointsDiscount
    ? Math.min(userPoints, product.p)
    : 0;

  const pointsRemainingToPay = product.p - pointsToDeduct;
  const cashRemaining = (pointsRemainingToPay * 0.1).toFixed(2);
  const isFreeWithPoints = +cashRemaining === 0;

  // Format card number with spaces (e.g., 4557 8201 9932 8821)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    onCardDataChange({ ...cardData, cardNumber: formatted });
    if (cardErrors.number) setCardErrors((prev) => ({ ...prev, number: undefined }));
  };

  // Format expiry date with slash (e.g., 09/28)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    onCardDataChange({ ...cardData, expiry: formatted });
    if (cardErrors.expiry) setCardErrors((prev) => ({ ...prev, expiry: undefined }));
  };

  const handleCvvChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    onCardDataChange({ ...cardData, cvv: raw });
    if (cardErrors.cvv) setCardErrors((prev) => ({ ...prev, cvv: undefined }));
  };

  // Card brand detection
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return { name: 'VISA', color: 'text-blue-600' };
    if (/^(5[1-5]|2[2-7])/.test(clean)) return { name: 'MASTERCARD', color: 'text-amber-600' };
    if (/^3[47]/.test(clean)) return { name: 'AMEX', color: 'text-cyan-600' };
    return { name: 'TARJETA', color: 'text-emerald-700' };
  };

  const cardBrand = getCardBrand(cardData.cardNumber);

  const fillDemoCard = () => {
    onCardDataChange({
      cardNumber: '4557 8201 9932 8821',
      cardHolder: 'CAMILA MORALES',
      expiry: '11/28',
      cvv: '782',
      saveCard: true,
    });
    setCardErrors({});
  };

  const handleValidateAndSubmit = () => {
    if (paymentMethod === 'Tarjeta Débito/Crédito' && !isFreeWithPoints) {
      const cleanNum = cardData.cardNumber.replace(/\s/g, '');
      const errors: typeof cardErrors = {};
      if (cleanNum.length < 13) {
        errors.number = 'Ingresa un número de tarjeta válido (16 dígitos)';
      }
      if (!cardData.cardHolder.trim()) {
        errors.holder = 'Ingresa el nombre del titular';
      }
      if (cardData.expiry.length < 5) {
        errors.expiry = 'Formato MM/AA';
      }
      if (cardData.cvv.length < 3) {
        errors.cvv = '3 dígitos';
      }

      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        return;
      }
    }

    onConfirmCheckout(pointsToDeduct);
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="space-y-3 pb-3">
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-[17px] font-extrabold text-[#132a1c] tracking-tight">
              Método de confirmación
            </h2>
            <span className="text-[10.5px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2.5 py-0.5 rounded-full shrink-0">
              Canje seguro
            </span>
          </div>
          <p className="text-[12.5px] text-[#60796b] leading-relaxed">
            Usa tus puntos acumulados o complementa con pago digital.
          </p>
        </div>

        {/* Product Being Redeemed */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3 flex items-center gap-3 shadow-xs">
          <img
            src={product.img}
            alt={product.n}
            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#e2ece5]"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#1e5c3c] uppercase tracking-wider block">
              {product.c}
            </span>
            <h3 className="text-[13px] font-extrabold text-[#132a1c] truncate">
              {product.n}
            </h3>
            <span className="text-[11.5px] font-semibold text-[#60796b]">
              Costo: <strong className="text-[#1e5c3c] font-bold">{product.p} pts</strong>
            </span>
          </div>
        </div>

        {/* Points & Math Breakdown Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={applyPointsDiscount}
              onChange={(e) => onTogglePointsDiscount(e.target.checked)}
              className="w-4 h-4 rounded text-[#1e5c3c] accent-[#1e5c3c] cursor-pointer"
            />
            <span className="text-[13px] font-bold text-[#132a1c]">
              Aplicar mis RETEX puntos ({userPoints} disponibles)
            </span>
          </label>

          <div className="mt-3 pt-2.5 border-t border-[#e2ece5] space-y-1 text-[12.5px]">
            <div className="flex justify-between text-[#60796b]">
              <span>Valor original</span>
              <span className="font-semibold">{product.p} pts</span>
            </div>

            <div className="flex justify-between text-[#1e5c3c] font-bold">
              <span>Descuento por puntos</span>
              <span>−{pointsToDeduct} pts</span>
            </div>

            <div className="flex justify-between text-[14px] font-black text-[#132a1c] pt-2 border-t border-[#e2ece5]/70">
              <span>Total a pagar</span>
              <span className="text-[#1e5c3c]">
                {+cashRemaining > 0
                  ? `S/ ${cashRemaining}`
                  : 'S/ 0.00 (Gratis con puntos)'}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs">
          <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block mb-2">
            Selecciona tu método de pago
          </label>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {PAYMENT_OPTIONS.map((opt) => {
              const isSelected = paymentMethod === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onPaymentMethodChange(opt.id)}
                  className={`py-2 px-1.5 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#eaf4ed] border-[#1e5c3c] text-[#1e5c3c] shadow-xs'
                      : 'bg-[#f8faf8] border-[#e2ece5] text-[#60796b] hover:bg-white'
                  }`}
                >
                  <span className="text-[16px]">{opt.icon}</span>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">
                    {opt.id === 'Tarjeta Débito/Crédito' ? 'Tarjeta' : opt.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expandable Form: Card Details */}
          {paymentMethod === 'Tarjeta Débito/Crédito' && (
            <div className="pt-2 border-t border-[#e2ece5] space-y-3 animate-in fade-in duration-200">
              {/* Visual Realistic Card Mockup */}
              <div className="relative overflow-hidden rounded-2xl p-4 text-white shadow-md bg-gradient-to-tr from-[#0d2919] via-[#164e32] to-[#1e5c3c] border border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {/* Metallic EMV Chip */}
                    <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#ffd700] via-[#f59e0b] to-[#b45309] shadow-inner border border-yellow-200/40 relative flex items-center justify-center">
                      <div className="w-5 h-4 border border-black/20 rounded-xs" />
                    </div>
                    {/* Contactless waves */}
                    <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8.5 16.5a5 5 0 0 1 0-7M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black tracking-widest px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs">
                    {cardBrand.name}
                  </span>
                </div>

                {/* Card Number display */}
                <div className="text-[15px] font-mono tracking-[0.18em] my-2 text-white/95 drop-shadow-sm font-semibold">
                  {cardData.cardNumber || '•••• •••• •••• ••••'}
                </div>

                <div className="flex justify-between items-end pt-1 text-[10.5px] uppercase tracking-wider text-white/80">
                  <div>
                    <span className="block text-[8.5px] text-white/60">Titular</span>
                    <span className="font-bold text-white tracking-normal font-sans">
                      {cardData.cardHolder || 'NOMBRE TITULAR'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8.5px] text-white/60">Expira</span>
                    <span className="font-mono font-bold text-white">
                      {cardData.expiry || 'MM/AA'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Fill Demo Helper */}
              <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                  Datos de la tarjeta
                </span>
                <button
                  type="button"
                  onClick={fillDemoCard}
                  className="text-[11px] font-extrabold text-[#1e5c3c] hover:underline flex items-center gap-1 cursor-pointer bg-[#eaf4ed] px-2 py-0.5 rounded-md"
                >
                  <Sparkles className="w-3 h-3 text-[#1e5c3c]" />
                  <span>Autocompletar demo</span>
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-2.5">
                {/* Card Number Input */}
                <div>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-[#60796b] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="Número de tarjeta (16 dígitos)"
                      maxLength={19}
                      className={`w-full bg-[#f8faf8] border rounded-xl pl-9 pr-3 py-2 text-[13px] text-[#132a1c] font-mono outline-none transition-all ${
                        cardErrors.number
                          ? 'border-red-500 focus:ring-1 focus:ring-red-400'
                          : 'border-[#e2ece5] focus:border-[#1e5c3c] focus:bg-white'
                      }`}
                    />
                  </div>
                  {cardErrors.number && (
                    <span className="text-[10.5px] text-red-500 font-semibold mt-0.5 block pl-1">
                      {cardErrors.number}
                    </span>
                  )}
                </div>

                {/* Cardholder Name Input */}
                <div>
                  <input
                    type="text"
                    value={cardData.cardHolder}
                    onChange={(e) => {
                      onCardDataChange({
                        ...cardData,
                        cardHolder: e.target.value.toUpperCase(),
                      });
                      if (cardErrors.holder) {
                        setCardErrors((prev) => ({ ...prev, holder: undefined }));
                      }
                    }}
                    placeholder="Nombre completo del titular"
                    className={`w-full bg-[#f8faf8] border rounded-xl px-3 py-2 text-[13px] text-[#132a1c] uppercase outline-none transition-all ${
                      cardErrors.holder
                        ? 'border-red-500 focus:ring-1 focus:ring-red-400'
                        : 'border-[#e2ece5] focus:border-[#1e5c3c] focus:bg-white'
                    }`}
                  />
                  {cardErrors.holder && (
                    <span className="text-[10.5px] text-red-500 font-semibold mt-0.5 block pl-1">
                      {cardErrors.holder}
                    </span>
                  )}
                </div>

                {/* Expiry and CVV Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM/AA"
                      maxLength={5}
                      className={`w-full bg-[#f8faf8] border rounded-xl px-3 py-2 text-[13px] text-[#132a1c] font-mono outline-none transition-all text-center ${
                        cardErrors.expiry
                          ? 'border-red-500 focus:ring-1 focus:ring-red-400'
                          : 'border-[#e2ece5] focus:border-[#1e5c3c] focus:bg-white'
                      }`}
                    />
                    {cardErrors.expiry && (
                      <span className="text-[10.5px] text-red-500 font-semibold mt-0.5 block pl-1">
                        {cardErrors.expiry}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-[#60796b] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        placeholder="CVV / CVC"
                        maxLength={4}
                        className={`w-full bg-[#f8faf8] border rounded-xl pl-8 pr-3 py-2 text-[13px] text-[#132a1c] font-mono outline-none transition-all text-center ${
                          cardErrors.cvv
                            ? 'border-red-500 focus:ring-1 focus:ring-red-400'
                            : 'border-[#e2ece5] focus:border-[#1e5c3c] focus:bg-white'
                        }`}
                      />
                    </div>
                    {cardErrors.cvv && (
                      <span className="text-[10.5px] text-red-500 font-semibold mt-0.5 block pl-1">
                        {cardErrors.cvv}
                      </span>
                    )}
                  </div>
                </div>

                {/* Save card checkbox */}
                <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    checked={cardData.saveCard}
                    onChange={(e) =>
                      onCardDataChange({ ...cardData, saveCard: e.target.checked })
                    }
                    className="w-3.5 h-3.5 rounded text-[#1e5c3c] accent-[#1e5c3c] cursor-pointer"
                  />
                  <span className="text-[11.5px] text-[#60796b]">
                    Guardar esta tarjeta de forma segura para próximos canjes
                  </span>
                </label>

                {/* Security trust badge */}
                <div className="bg-[#eaf4ed] rounded-xl p-2 flex items-center gap-2 text-[#1e5c3c] text-[11px]">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#1e5c3c]" />
                  <span>
                    Transacción encriptada con <strong>seguridad SSL bancaria de 256-bit</strong>.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Form: Yape Details */}
          {paymentMethod === 'Yape' && (
            <div className="pt-2 border-t border-[#e2ece5] space-y-2.5 animate-in fade-in duration-200">
              <div className="bg-[#742284]/10 border border-[#742284]/20 rounded-xl p-2.5 flex items-center gap-2 text-[#742284] text-[12px]">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span className="font-semibold">Paga al instante con Yape</span>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-bold text-[#60796b] block mb-1">
                    Número de celular Yape
                  </label>
                  <input
                    type="tel"
                    value={yapePhone}
                    onChange={(e) => setYapePhone(e.target.value)}
                    placeholder="987 654 321"
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] outline-none focus:border-[#742284]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#60796b] block mb-1">
                    Código de aprobación (6 dígitos)
                  </label>
                  <input
                    type="text"
                    value={yapeOtp}
                    onChange={(e) => setYapeOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Ej. 482910"
                    maxLength={6}
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] font-mono outline-none focus:border-[#742284]"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#60796b]">
                  <Info className="w-3.5 h-3.5 shrink-0 text-[#742284]" />
                  <span>Encuentra tu código de aprobación en el menú de tu app Yape.</span>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Form: Plin Details */}
          {paymentMethod === 'Plin' && (
            <div className="pt-2 border-t border-[#e2ece5] space-y-2.5 animate-in fade-in duration-200">
              <div className="bg-[#00a8a8]/10 border border-[#00a8a8]/20 rounded-xl p-2.5 flex items-center gap-2 text-[#008080] text-[12px]">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span className="font-semibold">Transferencia directa con Plin</span>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#60796b] block mb-1">
                  Número de celular Plin (BBVA, Interbank, Scotiabank)
                </label>
                <input
                  type="tel"
                  value={plinPhone}
                  onChange={(e) => setPlinPhone(e.target.value)}
                  placeholder="987 654 321"
                  className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] outline-none focus:border-[#008080]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={handleValidateAndSubmit}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>
            {+cashRemaining > 0
              ? `Pagar S/ ${cashRemaining} y Confirmar Pedido`
              : 'Confirmar Canje Gratuito con Puntos'}
          </span>
        </button>
      </div>
    </div>
  );
};
