import React, { useState } from 'react';
import {
  Gift,
  Star,
  Copy,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Info,
  Lock,
  Trophy,
  ArrowRight,
  ChevronRight,
  X,
  ExternalLink,
  Tag,
  Check,
} from 'lucide-react';
import { PartnerBrand, RedeemedGiftCard } from '../../types';
import {
  COUPON_TIERS,
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
  const [selectedBrandId, setSelectedBrandId] = useState<PartnerBrand | 'all'>('Falabella');
  const [justRedeemedCard, setJustRedeemedCard] = useState<RedeemedGiftCard | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [sentWhatsApp, setSentWhatsApp] = useState<boolean>(false);
  const [infoModalTier, setInfoModalTier] = useState<{
    brand: (typeof PARTNER_BRANDS)[0];
    tier: (typeof COUPON_TIERS)[0];
  } | null>(null);
  const [showMyCouponsOnly, setShowMyCouponsOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'recompensas' | 'gana_puntos'>('recompensas');

  const currentBrand =
    selectedBrandId === 'all'
      ? PARTNER_BRANDS[0]
      : PARTNER_BRANDS.find((b) => b.id === selectedBrandId) || PARTNER_BRANDS[0];

  const handleRedeemCoupon = (
    brand: (typeof PARTNER_BRANDS)[0],
    tier: (typeof COUPON_TIERS)[0]
  ) => {
    if (userPoints < tier.points) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `${brand.codePrefix}-${tier.discountPercent}OFF-${randomSuffix}`;

    const newCoupon: RedeemedGiftCard = {
      id: `CUP-${Date.now().toString().slice(-6)}`,
      brand: brand.id,
      discountPercent: tier.discountPercent,
      code,
      pointsUsed: tier.points,
      redeemedAt: '05 Nov 2026',
      expiresAt: '05 Feb 2027',
    };

    onRedeemGiftCard(newCoupon);
    setJustRedeemedCard(newCoupon);
    setCopiedCode(false);
    setSentWhatsApp(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 pb-3 text-left">
      {/* Top Points Bar (Inspired by adiClub green bar) */}
      <div className="bg-[#1e5c3c] text-white rounded-2xl p-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-black text-amber-300">
            ✪
          </div>
          <div>
            <div className="text-[14px] font-black tracking-tight leading-tight">
              {userPoints} puntos RETEX
            </div>
            <span className="text-[10px] text-white/80">
              Disponibles para cupones oficiales
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('gana_puntos')}
          className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Cómo ganar más</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <img
            src={RETEX_LOGO_URL}
            alt="RETEX"
            referrerPolicy="no-referrer"
            className="h-8 w-auto object-contain"
          />
          <div>
            <h2 className="text-[16px] font-extrabold text-[#132a1c] leading-tight">
              Cupones de Empresas Aliadas 🎟️
            </h2>
            <span className="text-[11px] text-[#60796b]">
              Canjea tus puntos por descuentos oficiales en marcas asociadas
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Switcher: Productos vs Cupones Aliados */}
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
          <span>Cupones de Empresas</span>
        </button>
      </div>

      {/* Sub Tabs: Recompensas vs Cómo Ganar Puntos */}
      <div className="flex border-b border-[#e2ece5]">
        <button
          type="button"
          onClick={() => {
            setActiveTab('recompensas');
            setShowMyCouponsOnly(false);
          }}
          className={`flex-1 py-2 text-center text-[12px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
            activeTab === 'recompensas' && !showMyCouponsOnly
              ? 'border-[#1e5c3c] text-[#1e5c3c]'
              : 'border-transparent text-[#60796b] hover:text-[#132a1c]'
          }`}
        >
          Recompensas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('gana_puntos')}
          className={`flex-1 py-2 text-center text-[12px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
            activeTab === 'gana_puntos'
              ? 'border-[#1e5c3c] text-[#1e5c3c]'
              : 'border-transparent text-[#60796b] hover:text-[#132a1c]'
          }`}
        >
          Gana Puntos
        </button>
      </div>

      {activeTab === 'gana_puntos' ? (
        /* Explanatory Tab: Cómo Ganar Puntos */
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-4 space-y-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#eaf4ed] text-[#1e5c3c] flex items-center justify-center font-bold">
              🌿
            </div>
            <div>
              <h3 className="text-[14px] font-black text-[#132a1c]">
                ¿Cómo acumular puntos RETEX?
              </h3>
              <p className="text-[11px] text-[#60796b]">
                Cada entrega de prendas textiles suma a tu saldo para canjear cupones.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-[12px]">
            <div className="bg-[#f8faf8] p-2.5 rounded-xl border border-[#e2ece5] flex items-center justify-between">
              <div>
                <b className="text-[#132a1c] block">1 entrega (5 prendas)</b>
                <span className="text-[#60796b] text-[11px]">Ropa apta para reciclaje o donación</span>
              </div>
              <span className="text-[#1e5c3c] font-black">+30 pts (5% DCTO)</span>
            </div>

            <div className="bg-[#f8faf8] p-2.5 rounded-xl border border-[#e2ece5] flex items-center justify-between">
              <div>
                <b className="text-[#132a1c] block">2 entregas (10 prendas)</b>
                <span className="text-[#60796b] text-[11px]">Recojo programado a domicilio</span>
              </div>
              <span className="text-[#1e5c3c] font-black">+60 pts (10% DCTO)</span>
            </div>

            <div className="bg-[#f8faf8] p-2.5 rounded-xl border border-[#e2ece5] flex items-center justify-between">
              <div>
                <b className="text-[#132a1c] block">3 entregas (15 prendas)</b>
                <span className="text-[#60796b] text-[11px]">Entrega confirmada a aprovechadores</span>
              </div>
              <span className="text-[#1e5c3c] font-black">+90 pts (15% DCTO)</span>
            </div>

            <div className="bg-[#f8faf8] p-2.5 rounded-xl border border-[#e2ece5] flex items-center justify-between">
              <div>
                <b className="text-[#132a1c] block">5 a 7 entregas (Tope 30%)</b>
                <span className="text-[#60796b] text-[11px]">Impacto circular constante</span>
              </div>
              <span className="text-[#1e5c3c] font-black">150 a 200 pts</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('recompensas')}
            className="w-full py-2.5 px-3 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[12.5px] transition-colors cursor-pointer text-center"
          >
            Ver cupones y barras de progreso
          </button>
        </div>
      ) : (
        <>
          {/* Prominent Banner: TUS CUPONES (adiClub style) */}
          <div
            onClick={() => setShowMyCouponsOnly(!showMyCouponsOnly)}
            className="bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-2xl p-3 shadow-xs cursor-pointer transition-all flex items-center justify-between active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="text-[13px] font-black tracking-tight leading-tight flex items-center gap-1.5">
                  <span>TUS CUPONES</span>
                  <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {redeemedGiftCards.length}
                  </span>
                </div>
                <span className="text-[10.5px] text-white/80">
                  {redeemedGiftCards.length > 0
                    ? `${redeemedGiftCards.length} cupones activos listos para usar`
                    : 'Aún no has canjeado cupones'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
              <span>{showMyCouponsOnly ? 'Ver todas las ofertas' : 'Ver cupones'}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${showMyCouponsOnly ? 'rotate-90' : ''}`}
              />
            </div>
          </div>

          {/* If user clicked "Tus Cupones" banner, show their active coupons directly */}
          {showMyCouponsOnly ? (
            <div className="space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                  Cupones canjeados activos ({redeemedGiftCards.length})
                </span>
                <button
                  onClick={() => setShowMyCouponsOnly(false)}
                  className="text-[11px] font-bold text-[#1e5c3c] hover:underline cursor-pointer"
                >
                  Volver a ofertas →
                </button>
              </div>

              {redeemedGiftCards.length === 0 ? (
                <div className="bg-white border border-dashed border-[#bcd6c5] rounded-2xl p-6 text-center space-y-2">
                  <Tag className="w-8 h-8 text-[#60796b] mx-auto" />
                  <p className="text-[13px] font-bold text-[#132a1c]">
                    No tienes cupones canjeados todavía
                  </p>
                  <p className="text-[11.5px] text-[#60796b]">
                    Explora las ofertas de abajo y canjea tus puntos con las barras de progreso.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowMyCouponsOnly(false)}
                    className="mt-2 py-2 px-4 bg-[#1e5c3c] text-white rounded-xl font-bold text-[12px] cursor-pointer"
                  >
                    Ver ofertas disponibles
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {redeemedGiftCards.map((gc) => (
                    <div
                      key={gc.id}
                      className="bg-white border-2 border-[#1e5c3c]/20 rounded-2xl p-3 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <b className="text-[14px] text-[#132a1c] font-black">{gc.brand}</b>
                          <span className="text-[11px] text-[#60796b] block">
                            Canjeado el {gc.redeemedAt} · Vence: {gc.expiresAt}
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-[#15803d] bg-[#dcfce7] px-2.5 py-1 rounded-full">
                          {gc.discountPercent}% OFF
                        </span>
                      </div>

                      <div className="bg-[#f8faf8] border border-dashed border-[#bcd6c5] rounded-xl p-2.5 flex items-center justify-between">
                        <span className="font-mono text-[14px] font-black text-[#1e5c3c] tracking-wider select-all">
                          {gc.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(gc.code)}
                          className="px-2.5 py-1 bg-white hover:bg-[#eaf4ed] text-[#1e5c3c] border border-[#bcd6c5] rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Brand Filter Pills */}
              <div>
                <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider block mb-1.5 px-0.5">
                  Filtrar por marca aliada
                </label>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  <button
                    type="button"
                    onClick={() => setSelectedBrandId('all')}
                    className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
                      selectedBrandId === 'all'
                        ? 'bg-[#1e5c3c] text-white border-[#1e5c3c] shadow-xs'
                        : 'bg-white border-[#e2ece5] text-[#60796b] hover:bg-[#eaf4ed]'
                    }`}
                  >
                    Todas las marcas
                  </button>

                  {PARTNER_BRANDS.map((brand) => {
                    const isSelected = selectedBrandId === brand.id;
                    return (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => setSelectedBrandId(brand.id)}
                        className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
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
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: brand.themeColor }}
                        />
                        <span>{brand.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: CUPONES CON BARRAS DE PROGRESO (Exact layout from user screenshots) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-0.5">
                  <div>
                    <h3 className="text-[13px] font-black text-[#132a1c] uppercase tracking-wide">
                      {selectedBrandId === 'all'
                        ? 'Cupones de Descuento RETEX'
                        : `Cupones en ${currentBrand.name}`}
                    </h3>
                    <span className="text-[10.5px] text-[#60796b]">
                      El progreso avanza con cada entrega textil realizada
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
                    {COUPON_TIERS.length} niveles
                  </span>
                </div>

                {/* Vertical list of Progress-Bar Coupon Cards */}
                <div className="space-y-3">
                  {COUPON_TIERS.map((tier) => {
                    const brandToUse = currentBrand;
                    const canAfford = userPoints >= tier.points;
                    const missingPoints = Math.max(0, tier.points - userPoints);
                    const progressPercent = Math.min(
                      100,
                      Math.max(0, Math.round((userPoints / tier.points) * 100))
                    );

                    return (
                      <div
                        key={tier.points}
                        className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-xs transition-all hover:border-[#1e5c3c]/50 flex flex-col gap-2.5 relative overflow-hidden"
                      >
                        {/* Top Row: Title + Info Button */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: brandToUse.themeColor }}
                            />
                            <h4 className="text-[15px] font-black text-[#132a1c] tracking-tight uppercase">
                              {tier.discountPercent}% OFF {brandToUse.name}
                            </h4>
                            {tier.isMaxTier && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-1.5 py-0.2 rounded-full">
                                Tope Máximo
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setInfoModalTier({ brand: brandToUse, tier })
                            }
                            className="w-6 h-6 rounded-full border border-[#d1d5db] text-[#60796b] hover:text-[#132a1c] hover:border-[#9ca3af] flex items-center justify-center text-[12px] font-bold cursor-pointer transition-colors shrink-0"
                            title="Términos y condiciones del cupón"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* PROGRESS BAR (Key adiClub Feature) */}
                        <div className="space-y-1 pt-0.5">
                          {/* Track and Fill */}
                          <div className="w-full h-2 rounded-full bg-[#eaf4ed] overflow-hidden relative">
                            <div
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{
                                width: `${progressPercent}%`,
                                backgroundColor: canAfford ? '#15803d' : '#1e5c3c',
                              }}
                            />
                          </div>

                          {/* Progress Text Sub-row */}
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span
                              className={
                                canAfford
                                  ? 'text-[#15803d] flex items-center gap-1'
                                  : 'text-[#60796b]'
                              }
                            >
                              {canAfford ? (
                                <>
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Puntos suficientes</span>
                                </>
                              ) : (
                                <span>Puntos insuficientes</span>
                              )}
                            </span>
                            <span className="text-[#132a1c] font-black">
                              {tier.points} puntos
                            </span>
                          </div>
                        </div>

                        {/* ACTION BUTTON (Locked vs Available) */}
                        <div className="pt-1">
                          {canAfford ? (
                            <button
                              type="button"
                              onClick={() => handleRedeemCoupon(brandToUse, tier)}
                              className="w-full py-2.5 px-3 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-black text-[12.5px] shadow-[0_3px_10px_rgba(30,92,60,0.2)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4 text-amber-300" />
                              <span>
                                Canjear cupón de {tier.discountPercent}% OFF
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="w-full py-2.5 px-3 bg-[#f3f4f6] text-[#6b7280] rounded-xl font-bold text-[12px] flex items-center justify-between cursor-not-allowed border border-[#e5e7eb]"
                            >
                              <span>Gana {missingPoints} puntos más</span>
                              <Lock className="w-3.5 h-3.5 text-[#9ca3af]" />
                            </button>
                          )}
                        </div>

                        {/* Equivalency Hint */}
                        <div className="flex items-center justify-between text-[10px] text-[#60796b] pt-0.5 border-t border-[#f1f5f2]">
                          <span>Equivale a: <strong>{tier.approxDeliveries}</strong></span>
                          <span className="text-[#1e5c3c] font-semibold">
                            {progressPercent}% completado
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: OFERTAS DE MARCAS AMIGAS (adiClub style) */}
              <div className="mt-2 bg-[#f8faf8] border border-[#e2ece5] rounded-2xl p-3.5 space-y-2.5">
                <div>
                  <h3 className="text-[13px] font-black text-[#132a1c] uppercase tracking-wide">
                    Ofertas de Marcas Amigas
                  </h3>
                  <p className="text-[11px] text-[#60796b] mt-0.5 leading-snug">
                    RETEX se une a los mejores aliados del retail y la moda sostenible para ofrecerte grandes beneficios.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {PARTNER_BRANDS.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => setSelectedBrandId(brand.id)}
                      className="bg-white border border-[#e2ece5] hover:border-[#1e5c3c] rounded-xl p-2.5 cursor-pointer transition-all hover:shadow-xs text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <b className="text-[12px] text-[#132a1c] font-black">{brand.name}</b>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: brand.themeColor }}
                        />
                      </div>
                      <span className="text-[10px] text-[#60796b] line-clamp-2 leading-tight block">
                        {brand.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* MODAL: Cupón Canjeado con Éxito */}
      {justRedeemedCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-[340px] w-full shadow-2xl text-center border border-[#e2ece5] space-y-3 relative">
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-7 h-7 text-[#15803d]" />
            </div>

            <h3 className="text-[18px] font-black text-[#132a1c]">
              ¡Cupón Canjeado con Éxito!
            </h3>

            <p className="text-[12px] text-[#60796b] leading-relaxed">
              Has canjeado <strong>{justRedeemedCard.pointsUsed} puntos RETEX</strong> por un cupón de{' '}
              <strong>{justRedeemedCard.discountPercent}% de descuento</strong> en{' '}
              <strong>{justRedeemedCard.brand}</strong>.
            </p>

            {/* Voucher Box with Code */}
            <div className="bg-[#f8faf8] border-2 border-dashed border-[#bcd6c5] rounded-2xl p-3 text-center space-y-1">
              <span className="text-[10px] font-bold text-[#60796b] uppercase tracking-wider block">
                Tu código de cupón
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
                    <span>¡Cupón copiado al portapapeles!</span>
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

      {/* MODAL: Términos del Cupón (Info button) */}
      {infoModalTier && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 max-w-[320px] w-full shadow-xl border border-[#e2ece5] space-y-3 relative text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: infoModalTier.brand.themeColor }}
                />
                <h4 className="text-[14px] font-black text-[#132a1c]">
                  {infoModalTier.tier.discountPercent}% OFF {infoModalTier.brand.name}
                </h4>
              </div>
              <button
                onClick={() => setInfoModalTier(null)}
                className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11.5px] text-[#60796b] space-y-2 leading-relaxed">
              <p>
                <strong>Marca aliada:</strong> {infoModalTier.brand.name} ({infoModalTier.brand.badge})
              </p>
              <p>
                <strong>Validez:</strong> {infoModalTier.brand.description}
              </p>
              <p>
                <strong>Costo de canje:</strong> {infoModalTier.tier.points} puntos RETEX (equivale a {infoModalTier.tier.approxDeliveries}).
              </p>
              <p>
                <strong>Vigencia del cupón:</strong> 90 días calendario a partir del momento de canje. No acumulable con otras promociones de liquidación.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setInfoModalTier(null)}
              className="w-full py-2 bg-[#1e5c3c] text-white rounded-xl font-bold text-[12px] cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
