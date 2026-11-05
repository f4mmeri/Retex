import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  MapPin,
  LogOut,
  Award,
  CheckCircle2,
  Clock,
  Edit3,
  Save,
  ExternalLink,
  Phone,
  Calendar,
  Gift,
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { RedeemedGiftCard } from '../../types';

interface PerfilScreenProps {
  userName: string;
  userEmail: string;
  userPhone?: string;
  points: number;
  address: string;
  redeemedGiftCards?: RedeemedGiftCard[];
  onAddressChange: (newAddress: string) => void;
  onGoToDonations: () => void;
  onGoToCatalog: () => void;
  onGoToGiftCards?: () => void;
  onLogout: () => void;
}

interface DonationHistoryItem {
  id: string;
  date: string;
  quantity: number;
  type: string;
  destination: string;
  status: 'Culminada' | 'En curso';
  points: number;
}

interface RedemptionHistoryItem {
  id: string;
  name: string;
  category: string;
  date: string;
  pointsUsed: number;
  cashPaid: string;
  img: string;
  status: 'Entregado' | 'En camino';
}

const DONATION_HISTORY: DonationHistoryItem[] = [
  {
    id: 'DON-2026-092',
    date: '18 Oct 2026',
    quantity: 6,
    type: 'Polos y camisetas',
    destination: 'Planta Recicladora (Fibra recuperada)',
    status: 'Culminada',
    points: 180,
  },
  {
    id: 'DON-2026-081',
    date: '02 Oct 2026',
    quantity: 8,
    type: 'Casacas y abrigos',
    destination: 'Taller de Upcycling Textil',
    status: 'Culminada',
    points: 240,
  },
  {
    id: 'DON-2026-068',
    date: '15 Sep 2026',
    quantity: 5,
    type: 'Pantalones y jeans',
    destination: 'Centro de Clasificación Miraflores',
    status: 'En curso',
    points: 150,
  },
  {
    id: 'DON-2026-045',
    date: '20 Ago 2026',
    quantity: 10,
    type: 'Prendas mixtas y sábanas',
    destination: 'Emprendimientos Sociales Aliados',
    status: 'Culminada',
    points: 300,
  },
];

const REDEMPTION_HISTORY: RedemptionHistoryItem[] = [
  {
    id: 'CNJ-9481',
    name: PRODUCTS[0].n,
    category: PRODUCTS[0].c,
    date: '12 Oct 2026',
    pointsUsed: PRODUCTS[0].p,
    cashPaid: 'S/ 0.00',
    img: PRODUCTS[0].img,
    status: 'Entregado',
  },
  {
    id: 'CNJ-8204',
    name: PRODUCTS[3].n,
    category: PRODUCTS[3].c,
    date: '28 Sep 2026',
    pointsUsed: PRODUCTS[3].p,
    cashPaid: 'S/ 0.00',
    img: PRODUCTS[3].img,
    status: 'Entregado',
  },
  {
    id: 'CNJ-7190',
    name: PRODUCTS[1].n,
    category: PRODUCTS[1].c,
    date: '14 Ago 2026',
    pointsUsed: PRODUCTS[1].p,
    cashPaid: 'S/ 0.00',
    img: PRODUCTS[1].img,
    status: 'Entregado',
  },
];

export const PerfilScreen: React.FC<PerfilScreenProps> = ({
  userName,
  userEmail,
  userPhone,
  points,
  address,
  redeemedGiftCards = [],
  onAddressChange,
  onGoToDonations,
  onGoToCatalog,
  onGoToGiftCards,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'donaciones' | 'canjes' | 'direccion'>('donaciones');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [streetAddress, setStreetAddress] = useState(
    address || 'Jr. Las Camelias 482, Dpto. 402'
  );
  const [district, setDistrict] = useState('Urb. Los Rosales, San Isidro, Lima');
  const [reference, setReference] = useState('Frente al Parque El Olivar (Timbre 402-B)');
  const [contactPhone, setContactPhone] = useState(userPhone || '+51 987 654 321');
  const [addressSavedNotification, setAddressSavedNotification] = useState(false);

  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'CM';

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${streetAddress}, ${district}`;
    onAddressChange(fullAddress);
    setIsEditingAddress(false);
    setAddressSavedNotification(true);
    setTimeout(() => setAddressSavedNotification(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="space-y-3">
        {/* User Badge Header */}
        <div className="text-center pt-1 pb-1">
          <div className="w-[68px] h-[68px] rounded-full bg-[#eaf4ed] text-[#1e5c3c] text-[22px] font-extrabold flex items-center justify-center mx-auto mb-1.5 border-2 border-[#bcd6c5] shadow-xs">
            {initials}
          </div>
          <h2 className="text-[16.5px] font-extrabold text-[#132a1c] leading-tight">
            {userName || 'Camila Morales'}
          </h2>
          <span className="text-[11.5px] text-[#60796b]">
            {userEmail || 'camila.retex@gmail.com'} · {userPhone || contactPhone}
          </span>
        </div>

        {/* Balance & Eco Level Card */}
        <div className="bg-white border border-[#e2ece5] rounded-2xl p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11.5px] font-bold text-[#60796b]">
              Balance disponible
            </span>
            <span className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-2.5 py-0.5 rounded-full text-[12px] font-extrabold">
              {points} pts
            </span>
          </div>

          <div className="flex items-center justify-between text-[12px] border-t border-[#e2ece5] pt-2">
            <span className="text-[#60796b]">Nivel de impacto</span>
            <div className="flex items-center gap-1 font-bold text-[#1e5c3c]">
              <Award className="w-3.5 h-3.5 text-[#1e5c3c]" />
              <span>Eco-Aliada Plata 🌿</span>
            </div>
          </div>
        </div>

        {/* Profile Segmented Controls */}
        <div className="bg-[#eaf4ed]/60 p-1 rounded-xl flex gap-1 border border-[#e2ece5]">
          <button
            type="button"
            onClick={() => setActiveTab('donaciones')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'donaciones'
                ? 'bg-white text-[#1e5c3c] shadow-xs'
                : 'text-[#60796b] hover:text-[#132a1c]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Donaciones (4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('canjes')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'canjes'
                ? 'bg-white text-[#1e5c3c] shadow-xs'
                : 'text-[#60796b] hover:text-[#132a1c]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Canjes (3)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('direccion')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'direccion'
                ? 'bg-white text-[#1e5c3c] shadow-xs'
                : 'text-[#60796b] hover:text-[#132a1c]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Dirección</span>
          </button>
        </div>

        {/* TAB 1: Solicitudes de Donación */}
        {activeTab === 'donaciones' && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                Historial de Donaciones
              </span>
              <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                3 Culminadas · 1 En curso
              </span>
            </div>

            <div className="space-y-2">
              {DONATION_HISTORY.map((item) => {
                const isCulminada = item.status === 'Culminada';
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e2ece5] rounded-xl p-3 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#132a1c]">
                        #{item.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isCulminada
                            ? 'bg-[#dcfce7] text-[#15803d]'
                            : 'bg-[#fef3c7] text-[#92400e]'
                        }`}
                      >
                        {isCulminada ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                            <span>Culminada</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 stroke-[2.5]" />
                            <span>En curso</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="text-[12.5px] font-bold text-[#132a1c]">
                      {item.quantity} prendas · {item.type}
                    </div>

                    <div className="text-[11px] text-[#60796b] flex items-center justify-between">
                      <span>Destino: {item.destination}</span>
                      <span className="font-mono text-[10.5px] text-[#60796b]">
                        {item.date}
                      </span>
                    </div>

                    <div className="pt-1 border-t border-[#e2ece5]/70 flex items-center justify-between text-[11px]">
                      <span className="text-[#60796b]">Puntos acumulados</span>
                      <span
                        className={`font-extrabold ${
                          isCulminada ? 'text-[#1e5c3c]' : 'text-[#92400e]'
                        }`}
                      >
                        {isCulminada
                          ? `+${item.points} pts acreditados`
                          : `+${item.points} pts estimados`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onGoToDonations}
              className="w-full py-2 px-3 bg-[#eaf4ed] hover:bg-[#d8ebd9] text-[#1e5c3c] rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 mt-1"
            >
              <span>+ Programar nueva donación</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* TAB 2: Historial de Canjes */}
        {activeTab === 'canjes' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Gift Cards Section */}
            <div>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                  Gift Cards Aliadas ({redeemedGiftCards.length})
                </span>
                {onGoToGiftCards && (
                  <button
                    onClick={onGoToGiftCards}
                    className="text-[10.5px] font-bold text-[#1e5c3c] hover:underline cursor-pointer"
                  >
                    + Canjear nueva →
                  </button>
                )}
              </div>

              {redeemedGiftCards.length > 0 ? (
                <div className="space-y-1.5">
                  {redeemedGiftCards.map((gc) => (
                    <div
                      key={gc.id}
                      className="bg-white border border-[#bcd6c5] rounded-xl p-2.5 shadow-xs flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <b className="text-[12.5px] text-[#132a1c]">{gc.brand}</b>
                          <span className="text-[10px] font-black text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                            {gc.discountPercent}% DCTO
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#1e5c3c] font-bold block select-all">
                          {gc.code}
                        </span>
                        <span className="text-[10px] text-[#60796b] block">
                          Canjeado el {gc.redeemedAt} · Válido hasta {gc.expiresAt}
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-1 rounded-lg shrink-0">
                        −{gc.pointsUsed} pts
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#f8faf8] border border-dashed border-[#e2ece5] rounded-xl p-3 text-center text-[#60796b] text-[11.5px]">
                  <span>No tienes gift cards activas aún.</span>
                  {onGoToGiftCards && (
                    <button
                      onClick={onGoToGiftCards}
                      className="block mx-auto mt-1 text-[#1e5c3c] font-bold underline cursor-pointer"
                    >
                      Canjear descuentos en Falabella, Oechsle o Mango →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Upcycled Products Redemptions */}
            <div>
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                  Prendas Upcycling Canjeadas ({REDEMPTION_HISTORY.length})
                </span>
                <span className="text-[10px] font-bold text-[#1e5c3c]">
                  Entregados a domicilio
                </span>
              </div>

              <div className="space-y-2">
                {REDEMPTION_HISTORY.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e2ece5] rounded-xl p-2.5 shadow-xs flex items-center gap-2.5"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-lg object-cover border border-[#e2ece5] shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#60796b]">
                          #{item.id}
                        </span>
                        <span className="text-[9.5px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.2 rounded">
                          {item.status}
                        </span>
                      </div>
                      <b className="text-[12.5px] text-[#132a1c] block truncate font-bold">
                        {item.name}
                      </b>
                      <div className="flex items-center justify-between text-[11px] text-[#60796b] mt-0.5">
                        <span>{item.date}</span>
                        <span className="font-extrabold text-[#1e5c3c]">
                          −{item.pointsUsed} pts ({item.cashPaid})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onGoToCatalog}
                className="flex-1 py-2 px-2 bg-[#eaf4ed] hover:bg-[#d8ebd9] text-[#1e5c3c] rounded-xl text-[11.5px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Catálogo Upcycling</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              {onGoToGiftCards && (
                <button
                  onClick={onGoToGiftCards}
                  className="flex-1 py-2 px-2 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl text-[11.5px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                >
                  <Gift className="w-3 h-3 text-[#facc15]" />
                  <span>Canjear Gift Card</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Dirección de Recojo Ficticia */}
        {activeTab === 'direccion' && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider">
                Dirección Predeterminada de Recojo
              </span>
              <span className="text-[10px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
                Lima Centro
              </span>
            </div>

            {addressSavedNotification && (
              <div className="bg-[#dcfce7] border border-[#86efac] text-[#15803d] text-[11.5px] p-2 rounded-xl flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Dirección de recojo actualizada correctamente.</span>
              </div>
            )}

            {!isEditingAddress ? (
              <div className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs space-y-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#eaf4ed] text-[#1e5c3c] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <b className="text-[13px] text-[#132a1c] block">
                        {streetAddress}
                      </b>
                      <span className="text-[11.5px] text-[#60796b]">
                        {district}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-[#1e5c3c] hover:bg-[#eaf4ed] p-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Editar dirección"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-2 border-t border-[#e2ece5] space-y-1.5 text-[11.5px] text-[#60796b]">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#132a1c] shrink-0">Referencia:</span>
                    <span>{reference}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#1e5c3c] shrink-0" />
                    <span>Contacto: {contactPhone} ({userName || 'Camila Morales'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-[#1e5c3c] shrink-0" />
                    <span>Horario preferente: Lunes a Viernes · 8:00 a. m. – 12:00 p. m.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="w-full mt-1 py-2 px-3 border border-[#bcd6c5] hover:bg-[#f8faf8] text-[#1e5c3c] rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modificar datos de recojo</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSaveAddress}
                className="bg-white border border-[#e2ece5] rounded-2xl p-3.5 shadow-xs space-y-2.5"
              >
                <div>
                  <label className="text-[10.5px] font-bold text-[#60796b] uppercase block mb-1">
                    Dirección (Calle, Av., Nro. y Dpto.)
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-1.5 text-[12.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-[#60796b] uppercase block mb-1">
                    Urbanización, Distrito y Ciudad
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-1.5 text-[12.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-[#60796b] uppercase block mb-1">
                    Punto de Referencia
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-1.5 text-[12.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold text-[#60796b] uppercase block mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-3 py-1.5 text-[12.5px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar cambios</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="py-2 px-3 bg-transparent border border-[#e2ece5] hover:bg-[#f8faf8] text-[#60796b] rounded-xl text-[12px] font-bold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl p-2.5 text-[11px] text-[#60796b] leading-relaxed">
              💡 <strong>Nota sobre recojos:</strong> Tu repartidor ecológico asignado utilizará esta dirección para todas tus recolecciones gratuitas en Lima Metropolitana.
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="pt-3">
        <button
          onClick={onLogout}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-red-50 text-[#dc2626] border border-[#dc2626]/40 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 stroke-[2]" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
