import React, { useState } from 'react';
import {
  Gift,
  Star,
  Check,
  Copy,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Info,
  QrCode,
} from 'lucide-react';
import { PartnerBrand, RedeemedGiftCard } from '../../types';
import {
  GIFT_CARD_TIERS,
  PARTNER_BRANDS,
  RETEX_LOGO_URL,
} from '../../data/products';

interface GiftCardsScreenProps {
  userPoints: number;
  userName: string;
  redeemedGiftCards: RedeemedGiftCard[];
  onRedeemGiftCard: (giftCard: RedeemedGiftCard) => void;
  onGoToCatalog: () => void;
  onGoToPerfil: () => void;
}

export const GiftCardsScreen: React.FC<GiftCardsScreenProps> = ({
  userPoints,
  userName,
  redeemedGiftCards,
  onRedeemGiftCard,
  onGoToCatalog,
  onGoToPerfil,
}) => {
  const [selectedBrandId, setSelectedBrandId] = useState<PartnerBrand>('Falabella');
  const [selectedTierPoints, setSelectedTierPoints] = useState<number>(90);
  const [justRedeemedCard, setJustRedeemedCard] = useState<RedeemedGiftCard | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [sentWhatsApp, setSentWhatsApp] = useState<boolean>(false);

  const selectedBrand =
    PARTNER_BRANDS.find((b) => b.id === selectedBrandId) || PARTNER_BRANDS[0];
  const selectedTier =
    GIFT_CARD_TIERS.find((t) => t.points === selectedTierPoints) || GIFT_CARD_TIERS[2];

  const canAfford = userPoints >= selectedTier.points;
  const missingPoints = selectedTier.points - userPoints;

  const handleRedeem = () => {
    if (!canAfford) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `${selectedBrand.codePrefix}-${selectedTier.discountPercent}OFF-${randomSuffix}`;

    const newGiftCard: RedeemedGiftCard = {
      id: `GC-${Date.now().toString().slice(-6)}`,
      brand: selectedBrand.id,
      discountPercent: selectedTier.discountPercent,
      code,
      pointsUsed: selectedTier.points,
      redeemedAt: '22 Oct 2026',
      expiresAt: '22 Ene 2027',
    };

    onRedeemGiftCard(newGiftCard);
    setJustRedeemedCard(newGiftCard);
    setCopiedCode(false);
    setSentWhatsApp(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 pb-3">
      {/* Header Bar */}
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
              Gift Cards & Bonos 🎁
            </h2>
            <span className="text-[11px] text-[#60796b]">
              Descuentos en Falabella, Oechsle, Mango y RETEX
            </span>
          </div>
        </div>

        <div className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-3 py-1 rounded-full text-[12.5px] font-bold inline-flex items-center gap-1.5 shadow-xs shrink-0">
          <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
          <span>{userPoints} pts</span>
        </div>
      </div>

      {/* Segmented Switcher: Productos vs Gift Cards */}
      <div className="bg-[#eaf4ed]/80 p-1 rounded-xl flex gap-1 border border-[#bcd6c5]">
        <button
          type="button"
          onClick={onGoToCatalog}
          className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold text-[#60796b] hover:text-[#132a1c] transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Productos Upcycling</span>
        </button>

        <button
          type="button"
          className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-white text-[#1e5c3c] shadow-xs cursor-default flex items-center justify-center gap-1"
        >
          <Gift className="w-3.5 h-3.5 text-[#1e5c3c]" />
          <span>Gift Cards Aliadas</span>
        </button>
      </div>

      {/* Brand Selection Pills */}
      <div>
        <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block mb-1.5 px-0.5">
          1. Elige la marca aliada
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {PARTNER_BRANDS.map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => setSelectedBrandId(brand.id)}
                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-2 shadow-xs'
                    : 'bg-white border-[#e2ece5] text-[#60796b] hover:bg-[#f8faf8]'
                }`}
                style={{
                  borderColor: isSelected ? brand.themeColor : undefined,
                  backgroundColor: isSelected ? brand.accentSoft : undefined,
                  color: isSelected ? brand.themeColor : undefined,
                }}
              >
                <span className="text-[11.5px] font-extrabold tracking-tight">
                  {brand.name}
                </span>
                <span className="text-[9px] opacity-75 truncate max-w-full">
                  {brand.id === 'RETEX Sostenible' ? 'Oficial' : 'Aliado'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Official Ratio Reference & Tier Selector */}
      <div className="bg-white border border-[#e2ece5] rounded-2xl p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block">
            2. Selecciona el descuento y puntos
          </label>
          <span className="text-[10px] text-[#1e5c3c] bg-[#eaf4ed] font-bold px-2 py-0.5 rounded-full">
            Ratio Oficial RETEX
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {GIFT_CARD_TIERS.map((tier) => {
            const isSelected = selectedTierPoints === tier.points;
            const hasEnough = userPoints >= tier.points;

            return (
              <button
                key={tier.points}
                type="button"
                onClick={() => setSelectedTierPoints(tier.points)}
                className={`w-full py-2 px-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#eaf4ed] border-[#1e5c3c] text-[#132a1c] shadow-xs'
                    : 'bg-[#f8faf8] border-[#e2ece5] text-[#60796b] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isSelected
                        ? 'bg-[#1e5c3c] text-white'
                        : 'bg-[#e2ece5] text-[#60796b]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : ''}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-black text-[#132a1c]">
                        {tier.discountPercent}% de descuento
                      </span>
                      {tier.isMaxTier && (
                        <span className="text-[9px] font-extrabold bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-1.5 py-0.2 rounded-full">
                          Tope Máximo
                        </span>
                      )}
                    </div>
                    <span className="text-[10.5px] text-[#60796b] block">
                      Equivale aprox. a {tier.approxDeliveries}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[12.5px] font-black ${
                      hasEnough ? 'text-[#1e5c3c]' : 'text-[#dc2626]'
                    }`}
                  >
                    {tier.points} pts
                  </span>
                  {!hasEnough && (
                    <span className="block text-[9px] text-[#dc2626] font-semibold">
                      Faltan {tier.points - userPoints}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Simulated Gift Card Mockup */}
      <div className="relative overflow-hidden rounded-2xl p-4 text-white shadow-md bg-gradient-to-tr transition-all duration-300 border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${selectedBrand.themeColor} 0%, #0d1a12 100%)`,
        }}
      >
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/10 blur-md pointer-events-none" />
        <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
          <QrCode className="w-20 h-20 text-white" />
        </div>

        {/* Card Top Row */}
        <div className="flex justify-between items-start mb-2 relative z-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/80 block">
              ECO-GIFTCARD RETEX
            </span>
            <span className="text-[17px] font-black tracking-tight drop-shadow-sm">
              {selectedBrand.logoText}
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-black px-2.5 py-0.5 rounded-full border border-white/20">
            {selectedTier.discountPercent}% OFF
          </div>
        </div>

        {/* Big Discount Value */}
        <div className="my-2 relative z-10">
          <div className="text-[26px] font-black tracking-tight leading-none text-white drop-shadow-md">
            {selectedTier.discountPercent}% DCTO
            {selectedTier.isMaxTier && (
              <span className="text-[11px] font-bold text-amber-300 ml-2 tracking-normal uppercase">
                (Tope)
              </span>
            )}
          </div>
          <span className="text-[11px] text-white/90 block mt-1 leading-snug">
            {selectedBrand.description}
          </span>
        </div>

        {/* Card Bottom Meta */}
        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-white/80 relative z-10 font-mono">
          <div>
            <span className="block text-white/60 text-[8.5px] uppercase font-sans">
              Equivalencia textil
            </span>
            <span className="font-sans font-bold text-white">
              {selectedTier.approxDeliveries}
            </span>
          </div>

          <div className="text-right">
            <span className="block text-white/60 text-[8.5px] uppercase font-sans">
              Costo de canje
            </span>
            <span className="font-sans font-extrabold text-amber-300 text-[12px]">
              {selectedTier.points} PUNTOS
            </span>
          </div>
        </div>
      </div>

      {/* Redemption Action Button */}
      <div className="pt-1">
        {canAfford ? (
          <button
            type="button"
            onClick={handleRedeem}
            className="w-full py-3 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[13.5px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Gift className="w-4 h-4 text-[#facc15]" />
            <span>
              Canjear Gift Card ({selectedTier.discountPercent}% en {selectedBrand.name}) por {selectedTier.points} pts
            </span>
          </button>
        ) : (
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3 text-center text-[#92400e] text-[12px]">
            <Info className="w-4 h-4 inline-block mr-1 text-[#f59e0b]" />
            <span>
              Necesitas <strong>{selectedTier.points} pts</strong> para este bono. Te faltan{' '}
              <strong>{missingPoints} puntos</strong> ({Math.ceil(missingPoints / 30)} entregas más de ropa).
            </span>
          </div>
        )}
      </div>

      {/* List of Previously Redeemed Gift Cards */}
      {redeemedGiftCards.length > 0 && (
        <div className="mt-2 pt-2 border-t border-[#e2ece5] space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
              Tus Gift Cards activas ({redeemedGiftCards.length})
            </span>
            <button
              onClick={onGoToPerfil}
              className="text-[11px] font-bold text-[#1e5c3c] hover:underline"
            >
              Ver en Perfil →
            </button>
          </div>

          <div className="space-y-1.5">
            {redeemedGiftCards.slice(0, 3).map((gc) => (
              <div
                key={gc.id}
                className="bg-white border border-[#e2ece5] rounded-xl p-2.5 flex items-center justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <b className="text-[12px] text-[#132a1c]">{gc.brand}</b>
                    <span className="text-[10px] font-extrabold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                      {gc.discountPercent}% DCTO
                    </span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#60796b] block">
                    {gc.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(gc.code)}
                  className="p-1.5 bg-[#f8faf8] hover:bg-[#eaf4ed] text-[#1e5c3c] rounded-lg border border-[#e2ece5] transition-colors cursor-pointer"
                  title="Copiar cupón"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Modal Overlay when Gift Card is redeemed */}
      {justRedeemedCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-[340px] w-full shadow-2xl text-center border border-[#e2ece5] space-y-3 relative">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-7 h-7 text-[#15803d]" />
            </div>

            <h3 className="text-[18px] font-black text-[#132a1c]">
              ¡Gift Card Canjeada con Éxito!
            </h3>

            <p className="text-[12px] text-[#60796b] leading-relaxed">
              Has canjeado <strong>{justRedeemedCard.pointsUsed} puntos RETEX</strong> por un{' '}
              <strong>{justRedeemedCard.discountPercent}% de descuento</strong> en{' '}
              <strong>{justRedeemedCard.brand}</strong>.
            </p>

            {/* Voucher Box with Code */}
            <div className="bg-[#f8faf8] border-2 border-dashed border-[#bcd6c5] rounded-2xl p-3 text-center space-y-1">
              <span className="text-[10px] font-bold text-[#60796b] uppercase tracking-wider block">
                Tu código de descuento
              </span>
              <div className="font-mono text-[16px] font-black text-[#1e5c3c] tracking-widest select-all py-1">
                {justRedeemedCard.code}
              </div>
              <span className="text-[10px] text-[#60796b] block">
                Válido hasta {justRedeemedCard.expiresAt} en tiendas físicas y web
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleCopyCode(justRedeemedCard.code)}
                className="w-full py-2.5 px-3 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[12.5px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>¡Código copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar código de cupón</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSentWhatsApp(true);
                  setTimeout(() => setSentWhatsApp(false), 3000);
                }}
                className="w-full py-2 px-3 bg-[#eaf4ed] hover:bg-[#d8ebd9] text-[#1e5c3c] rounded-xl font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#008069]" />
                <span>
                  {sentWhatsApp
                    ? '¡Enviado a tu WhatsApp!'
                    : 'Enviar comprobante a mi WhatsApp'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setJustRedeemedCard(null)}
                className="w-full py-2 text-[12px] font-bold text-[#60796b] hover:text-[#132a1c] cursor-pointer"
              >
                Cerrar y seguir explorando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
