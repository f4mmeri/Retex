import { Product } from '../types';

export const RETEX_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBK_8teYeb7AN8jOytCLdBJgdGnvhfP_FfAdpccAFuxoHJjdgPTzWHsyzlBTShCV-a5wpepgDBIAppAMBhtZa8lYhW6NrLr3gkoOa5PA9B89hAutsqsK3YP57otszfkH4y2yjcf9A56Rq-di_F4vOH2gofVMPgPobAT-sk6VsR_cdmuFe9iwNKrXdjc7P6VJdsPabQkTINdhJmFyArjpGZ5nmkDvdrSam4Q9WrObtbm1ZjuF95jGrkrxH74uCn_rGZf_w';

export const SAMPLE_DONATION_PHOTO =
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';

import canastaTextilImg from '../assets/images/canasta_textil_1793910157094.jpg';
import fundaAlmohadaImg from '../assets/images/funda_almohada_1793910170652.jpg';
import gorroBucketHatImg from '../assets/images/gorro_bucket_hat_1793910182450.jpg';
import gorroBeanieImg from '../assets/images/gorro_beanie_1793910194393.jpg';
import canastaOrganizadorImg from '../assets/images/canasta_organizador_1793910206458.jpg';
import fundaCojinImg from '../assets/images/funda_cojin_1793910218137.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-canasta-1',
    n: 'Canasta Nido de Retazos',
    c: 'Canastas',
    p: 75,
    img: canastaTextilImg,
    desc: 'Cesta redonda tejida artesanalmente con tiras de tela recuperada en tonos tierra y salvia. Asas resistentes para ordenar toallas, plantas o accesorios.',
  },
  {
    id: 'prod-funda-1',
    n: 'Funda de Almohada Algodón',
    c: 'Fundas de Almohadas',
    p: 60,
    img: fundaAlmohadaImg,
    desc: 'Confeccionada con excedentes de algodón peruano suave con tejido espigado, transpirable y botones de madera reciclada. Medida estándar 45x45 cm.',
  },
  {
    id: 'prod-gorro-1',
    n: 'Gorro Bucket Hat Denim',
    c: 'Gorros',
    p: 70,
    img: gorroBucketHatImg,
    desc: 'Sombrero pescador moderno elaborado a partir de retazos de pantalones jean reciclados y lona verde olivo. Forro interior de algodón fresco.',
  },
  {
    id: 'prod-gorro-2',
    n: 'Gorro Beanie Eco-Weave',
    c: 'Gorros',
    p: 55,
    img: gorroBeanieImg,
    desc: 'Gorro tejido de punto elástico y térmico creado con hilado 100% de fibras textiles recuperadas. Acabado abrigador en verde bosque y mostaza.',
  },
  {
    id: 'prod-canasta-2',
    n: 'Canasta Organizadora Canvas',
    c: 'Canastas',
    p: 65,
    img: canastaOrganizadorImg,
    desc: 'Caja organizadora rectangular con asas de cuerda de algodón natural y base en lona verde salvia. Perfecta para estantes, ropa doblada o escritorio.',
  },
  {
    id: 'prod-funda-2',
    n: 'Funda de Cojín Patchwork',
    c: 'Fundas de Almohadas',
    p: 70,
    img: fundaCojinImg,
    desc: 'Funda decorativa geométrica hecha a mano uniendo cortes de lino y algodón recuperados. Aporta calidez y estilo eco-chic a salas y dormitorios.',
  },
];

export const GIFT_CARD_TIERS = [
  { points: 30, discountPercent: 5, approxDeliveries: '1 entrega (5 prendas)' },
  { points: 60, discountPercent: 10, approxDeliveries: '2 entregas' },
  { points: 90, discountPercent: 15, approxDeliveries: '3 entregas' },
  { points: 150, discountPercent: 25, approxDeliveries: '5 entregas' },
  { points: 200, discountPercent: 30, isMaxTier: true, approxDeliveries: '~7 entregas' },
];

export const PARTNER_BRANDS = [
  {
    id: 'Falabella' as const,
    name: 'Falabella',
    badge: 'Tiendas por Departamento',
    themeColor: '#006f3c',
    bgGradient: 'from-[#004e2a] via-[#006f3c] to-[#0a8c4f]',
    accentSoft: '#eaf5ee',
    borderColor: '#7ac195',
    logoText: 'falabella.',
    description: 'Válido en tiendas físicas y falabella.com en moda mujer, hombre y calzado.',
    codePrefix: 'RTX-FALA',
  },
  {
    id: 'Oechsle' as const,
    name: 'Oechsle',
    badge: 'Moda & Retail',
    themeColor: '#d6004b',
    bgGradient: 'from-[#8b0031] via-[#d6004b] to-[#f43f7d]',
    accentSoft: '#fdf0f4',
    borderColor: '#f59ebc',
    logoText: 'oechsle',
    description: 'Aplica a todas las marcas de vestuario, calzado y textil hogar en Oechsle.',
    codePrefix: 'RTX-OECH',
  },
  {
    id: 'Mango' as const,
    name: 'Mango',
    badge: 'Moda Internacional',
    themeColor: '#171717',
    bgGradient: 'from-[#0a0a0a] via-[#1a1a1a] to-[#383838]',
    accentSoft: '#f4f4f4',
    borderColor: '#a3a3a3',
    logoText: 'MANGO',
    description: 'Válido en tiendas oficiales Mango Perú y colección Committed sostenible.',
    codePrefix: 'RTX-MNGO',
  },
  {
    id: 'RETEX Sostenible' as const,
    name: 'RETEX',
    badge: 'Economía Circular',
    themeColor: '#1e5c3c',
    bgGradient: 'from-[#0d2919] via-[#164e32] to-[#1e5c3c]',
    accentSoft: '#eaf4ed',
    borderColor: '#bcd6c5',
    logoText: 'RETEX ECO',
    description: 'Aplica como descuento directo en cualquier producto del catálogo suprarreciclado.',
    codePrefix: 'RTX-ECO',
  },
];

export const SCREEN_LABELS: Record<string, string> = {
  welcome: 'Bienvenida',
  login: 'Acceso',
  panel_donar: 'Tab: Donar Ropa',
  panel_tienda: 'Tab: Catálogo',
  giftcards: 'Gift Cards Aliadas',
  panel_perfil: 'Tab: Perfil',
  solicitar: '1. Donar Ropa',
  programar: '2. Programar',
  enviada: '3. Enviada',
  resp: '4. Aprobación',
  clasif: '5. Destino',
  recojo: '6. Recojo',
  puntos: '7. Puntos',
  eval1: 'Valoración 1',
  detalle: 'Detalle Producto',
  pago: 'Canje / Pago',
  pedido: 'Confirmado',
  eval2: 'Valoración 2',
};
