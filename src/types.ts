export type ScreenId =
  | 'welcome'
  | 'login'
  | 'panel_donar'
  | 'panel_tienda'
  | 'giftcards'
  | 'panel_perfil'
  | 'solicitar'
  | 'programar'
  | 'enviada'
  | 'resp'
  | 'clasif'
  | 'recojo'
  | 'puntos'
  | 'eval1'
  | 'detalle'
  | 'pago'
  | 'pedido'
  | 'eval2';

export type PartnerBrand = 'Falabella' | 'Oechsle' | 'Mango' | 'RETEX Sostenible';

export interface GiftCardTier {
  points: number;
  discountPercent: number;
  isMaxTier?: boolean;
  approxDeliveries: string;
}

export type CouponTier = GiftCardTier;

export interface RedeemedGiftCard {
  id: string;
  brand: PartnerBrand;
  discountPercent: number;
  code: string;
  pointsUsed: number;
  redeemedAt: string;
  expiresAt: string;
}

export type RedeemedCoupon = RedeemedGiftCard;

export interface Product {
  id: string;
  n: string;
  c: string;
  p: number;
  img: string;
  desc: string;
}

export type GarmentType =
  | 'Polo / Camiseta'
  | 'Pantalón / Jeans'
  | 'Casaca / Abrigo'
  | 'Vestido / Falda'
  | 'Ropa Infantil / Bebé'
  | 'Ropa Mixta / Retazos'
  | 'Prendas Mixtas';

export type ClothCondition =
  | 'Buen estado'
  | 'Deteriorada'
  | 'Buen estado y Deteriorada'
  | 'Mixta';

export type PaymentMethod = 'Yape' | 'Plin' | 'Tarjeta Débito/Crédito';

export interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

export interface AppState {
  screen: ScreenId;
  isRegistered: boolean;
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  userPhone: string;
  garmentType: string;
  garmentTypes?: string[];
  condition: ClothCondition;
  qtyBuenEstado: number;
  qtyDeteriorada: number;
  quantity: number;
  isDenied: boolean;
  showWhatsAppModal: boolean;
  points: number;
  lastAwardedPoints: number;
  selectedProductIndex: number;
  paymentMethod: PaymentMethod;
  cardData: CardData;
  applyPointsDiscount: boolean;
  rating1: number;
  rating2: number;
  reviewComment1: string;
  reviewComment2: string;
  photoUrl: string | null;
  photoName: string;
  address: string;
  scheduledDate: string;
  timeWindow: string;
  redeemedGiftCards: RedeemedGiftCard[];
}
