import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { AppState, ScreenId, GarmentType, ClothCondition, PaymentMethod } from './types';
import { PRODUCTS, SAMPLE_DONATION_PHOTO, SCREEN_LABELS } from './data/products';
import { PhoneShell } from './components/PhoneShell';
import { Toast, ToastMessage } from './components/Toast';
import { playHapticSound } from './utils/audio';

// Screen components
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardDonarScreen } from './components/screens/DashboardDonarScreen';
import { TiendaScreen } from './components/screens/TiendaScreen';
import { PerfilScreen } from './components/screens/PerfilScreen';
import { SolicitarScreen } from './components/screens/SolicitarScreen';
import { ProgramarScreen } from './components/screens/ProgramarScreen';
import { EnviadaScreen } from './components/screens/EnviadaScreen';
import { AprobacionScreen } from './components/screens/AprobacionScreen';
import { DestinoScreen } from './components/screens/DestinoScreen';
import { RecojoScreen } from './components/screens/RecojoScreen';
import { PuntosScreen } from './components/screens/PuntosScreen';
import { Eval1Screen } from './components/screens/Eval1Screen';
import { DetalleProductoScreen } from './components/screens/DetalleProductoScreen';
import { PagoCanjeScreen } from './components/screens/PagoCanjeScreen';
import { PedidoConfirmadoScreen } from './components/screens/PedidoConfirmadoScreen';
import { Eval2Screen } from './components/screens/Eval2Screen';
import { GiftCardsScreen } from './components/screens/GiftCardsScreen';
import { RedeemedGiftCard } from './types';

const INITIAL_STATE: AppState = {
  screen: 'welcome',
  isRegistered: false,
  isLoggedIn: false,
  userName: 'Camila Morales',
  userEmail: 'camila.retex@gmail.com',
  userPhone: '+51 987 654 321',
  garmentType: 'Polo / Camiseta',
  condition: 'Buen estado',
  quantity: 5,
  isDenied: false,
  showWhatsAppModal: false,
  points: 450,
  lastAwardedPoints: 150,
  selectedProductIndex: 0,
  paymentMethod: 'Tarjeta Débito/Crédito',
  cardData: {
    cardNumber: '4557 8201 9932 8821',
    cardHolder: 'CAMILA MORALES',
    expiry: '11/28',
    cvv: '782',
    saveCard: true,
  },
  applyPointsDiscount: true,
  rating1: 0,
  rating2: 0,
  reviewComment1: '',
  reviewComment2: '',
  photoUrl: SAMPLE_DONATION_PHOTO,
  photoName: 'prendas_lote_donacion.jpg',
  address: 'Jr. Las Camelias 482, Dpto. 402, Urb. Los Rosales, San Isidro, Lima',
  scheduledDate: 'Viernes, 15 de Septiembre',
  timeWindow: 'Mañana: 8:00 a. m. – 12:00 p. m.',
  redeemedGiftCards: [
    {
      id: 'GC-94812',
      brand: 'Falabella',
      discountPercent: 15,
      code: 'RTX-FALA-15OFF-4821',
      pointsUsed: 90,
      redeemedAt: '16 Oct 2026',
      expiresAt: '16 Ene 2027',
    },
  ],
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('retex_app_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          userPhone: parsed.userPhone || INITIAL_STATE.userPhone,
          cardData: parsed.cardData || INITIAL_STATE.cardData,
          redeemedGiftCards: parsed.redeemedGiftCards || INITIAL_STATE.redeemedGiftCards,
        };
      }
    } catch {
      // Fallback
    }
    return INITIAL_STATE;
  });

  const [viewMode, setViewMode] = useState<'phone' | 'full'>('phone');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('retex_app_state', JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const showToast = (text: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToast({
      id: Math.random().toString(),
      type,
      text,
    });
  };

  const goToScreen = (newScreen: ScreenId) => {
    if (soundEnabled) playHapticSound('tap');

    setState((prev) => {
      let logged = prev.isLoggedIn;
      if (
        [
          'panel_donar',
          'panel_tienda',
          'giftcards',
          'panel_perfil',
          'solicitar',
          'programar',
          'enviada',
          'resp',
          'clasif',
          'recojo',
          'puntos',
          'eval1',
          'detalle',
          'pago',
          'pedido',
          'eval2',
        ].includes(newScreen)
      ) {
        logged = true;
      } else if (newScreen === 'welcome') {
        logged = false;
      }
      return {
        ...prev,
        screen: newScreen,
        isLoggedIn: logged,
      };
    });
  };

  const resetDemo = () => {
    if (soundEnabled) playHapticSound('tap');
    setState({
      ...INITIAL_STATE,
      screen: 'welcome',
      isLoggedIn: false,
    });
    showToast('Demo reiniciado al estado inicial de Bienvenida', 'info');
  };

  const handleLoginSubmit = (name: string, email: string, phone?: string) => {
    if (soundEnabled) playHapticSound('success');
    const formattedPhone = phone ? (phone.startsWith('+51') ? phone : `+51 ${phone.trim()}`) : undefined;
    setState((prev) => ({
      ...prev,
      userName: name || prev.userName,
      userEmail: email || prev.userEmail,
      userPhone: formattedPhone || prev.userPhone,
      isLoggedIn: true,
      screen: 'panel_donar',
    }));
    showToast(`¡Bienvenida, ${name.split(' ')[0] || 'Camila'}!`);
  };

  const handleGoogleAuth = (name: string, email: string, phone?: string) => {
    if (soundEnabled) playHapticSound('success');
    const formattedPhone = phone
      ? (phone.startsWith('+51') ? phone : `+51 ${phone.trim()}`)
      : state.userPhone || '+51 987 654 321';
    setState((prev) => ({
      ...prev,
      userName: name,
      userEmail: email,
      userPhone: formattedPhone,
      isLoggedIn: true,
      screen: 'panel_donar',
    }));
    showToast(`¡Sesión iniciada con Google como ${name}!`);
  };

  const handleCompletePickup = () => {
    const earned = state.quantity * 30;
    if (soundEnabled) playHapticSound('success');
    setState((prev) => ({
      ...prev,
      points: prev.points + earned,
      lastAwardedPoints: earned,
      screen: 'puntos',
    }));
    showToast(`¡Recojo completado! +${earned} puntos ganados`);
  };

  const handleConfirmCheckout = (pointsUsed: number) => {
    if (soundEnabled) playHapticSound('success');
    setState((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - pointsUsed),
      screen: 'pedido',
    }));
    showToast('¡Canje confirmado! Tu pedido ha sido procesado');
  };

  const handleRedeemGiftCard = (giftCard: RedeemedGiftCard) => {
    if (soundEnabled) playHapticSound('success');
    setState((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - giftCard.pointsUsed),
      redeemedGiftCards: [giftCard, ...(prev.redeemedGiftCards || [])],
    }));
    showToast(`¡Gift Card de ${giftCard.discountPercent}% en ${giftCard.brand} canjeada con éxito!`);
  };

  const currentProduct = PRODUCTS[state.selectedProductIndex] || PRODUCTS[0];

  // Render individual screen content
  const renderCurrentScreen = () => {
    switch (state.screen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onLogin={() => {
              setState((prev) => ({ ...prev, isRegistered: false }));
              goToScreen('login');
            }}
            onRegister={() => {
              setState((prev) => ({ ...prev, isRegistered: true }));
              goToScreen('login');
            }}
            onGoogleLogin={handleGoogleAuth}
          />
        );

      case 'login':
        return (
          <LoginScreen
            isRegister={state.isRegistered}
            onToggleRegister={() =>
              setState((prev) => ({
                ...prev,
                isRegistered: !prev.isRegistered,
              }))
            }
            onSubmit={handleLoginSubmit}
            onGoogleAuth={handleGoogleAuth}
          />
        );

      case 'panel_donar':
        return (
          <DashboardDonarScreen
            userName={state.userName}
            points={state.points}
            address={state.address}
            onStartDonation={() => goToScreen('solicitar')}
            onViewTracking={() => goToScreen('recojo')}
          />
        );

      case 'panel_tienda':
        return (
          <TiendaScreen
            points={state.points}
            onSelectProduct={(idx) => {
              setState((prev) => ({ ...prev, selectedProductIndex: idx }));
              goToScreen('detalle');
            }}
            onGoToGiftCards={() => goToScreen('giftcards')}
          />
        );

      case 'giftcards':
        return (
          <GiftCardsScreen
            userPoints={state.points}
            userName={state.userName}
            redeemedGiftCards={state.redeemedGiftCards || []}
            onRedeemGiftCard={handleRedeemGiftCard}
            onGoToCatalog={() => goToScreen('panel_tienda')}
            onGoToPerfil={() => goToScreen('panel_perfil')}
          />
        );

      case 'panel_perfil':
        return (
          <PerfilScreen
            userName={state.userName}
            userEmail={state.userEmail}
            userPhone={state.userPhone}
            points={state.points}
            address={state.address}
            redeemedGiftCards={state.redeemedGiftCards || []}
            onAddressChange={(newAddr: string) => {
              setState((prev) => ({ ...prev, address: newAddr }));
              showToast('Dirección de recojo actualizada');
            }}
            onGoToDonations={() => goToScreen('panel_donar')}
            onGoToCatalog={() => goToScreen('panel_tienda')}
            onGoToGiftCards={() => goToScreen('giftcards')}
            onLogout={() => goToScreen('welcome')}
          />
        );

      case 'solicitar':
        return (
          <SolicitarScreen
            garmentType={state.garmentType}
            condition={state.condition}
            quantity={state.quantity}
            onGarmentTypeChange={(t: GarmentType) =>
              setState((prev) => ({ ...prev, garmentType: t }))
            }
            onConditionChange={(c: ClothCondition) =>
              setState((prev) => ({ ...prev, condition: c }))
            }
            onQuantityChange={(q: number) =>
              setState((prev) => ({ ...prev, quantity: q }))
            }
            onNext={() => goToScreen('programar')}
            onCancel={() => goToScreen('panel_donar')}
          />
        );

      case 'programar':
        return (
          <ProgramarScreen
            address={state.address}
            scheduledDate={state.scheduledDate}
            timeWindow={state.timeWindow}
            quantity={state.quantity}
            garmentType={state.garmentType}
            condition={state.condition}
            photoUrl={state.photoUrl}
            photoName={state.photoName}
            onAddressChange={(addr) =>
              setState((prev) => ({ ...prev, address: addr }))
            }
            onDateChange={(d) =>
              setState((prev) => ({ ...prev, scheduledDate: d }))
            }
            onTimeWindowChange={(tw) =>
              setState((prev) => ({ ...prev, timeWindow: tw }))
            }
            onPhotoUpload={(url, name) => {
              if (soundEnabled) playHapticSound('success');
              setState((prev) => ({
                ...prev,
                photoUrl: url,
                photoName: name,
              }));
              showToast('Foto adjunta cargada correctamente');
            }}
            onRemovePhoto={() =>
              setState((prev) => ({
                ...prev,
                photoUrl: null,
                photoName: '',
              }))
            }
            onNext={() => goToScreen('enviada')}
            onBack={() => goToScreen('solicitar')}
          />
        );

      case 'enviada':
        return (
          <EnviadaScreen
            quantity={state.quantity}
            garmentType={state.garmentType}
            photoUrl={state.photoUrl}
            onSimulateAccept={() => {
              if (soundEnabled) playHapticSound('success');
              setState((prev) => ({ ...prev, isDenied: false }));
              goToScreen('resp');
              showToast('Simulación: Solicitud aprobada con éxito');
            }}
            onSimulateReject={() => {
              if (soundEnabled) playHapticSound('alert');
              setState((prev) => ({ ...prev, isDenied: true }));
              goToScreen('resp');
              showToast('Simulación: Solicitud rechazada', 'warn');
            }}
          />
        );

      case 'resp':
        return (
          <AprobacionScreen
            isDenied={state.isDenied}
            address={state.address}
            scheduledDate={state.scheduledDate}
            timeWindow={state.timeWindow}
            photoUrl={state.photoUrl}
            onNext={() => goToScreen('clasif')}
            onReturnToDashboard={() => goToScreen('panel_donar')}
          />
        );

      case 'clasif':
        return <DestinoScreen onNext={() => goToScreen('recojo')} />;

      case 'recojo':
        return (
          <RecojoScreen
            quantity={state.quantity}
            showWhatsAppModal={state.showWhatsAppModal}
            onToggleWhatsApp={() =>
              setState((prev) => ({
                ...prev,
                showWhatsAppModal: !prev.showWhatsAppModal,
              }))
            }
            onCompletePickup={handleCompletePickup}
          />
        );

      case 'puntos':
        return (
          <PuntosScreen
            quantity={state.quantity}
            lastAwardedPoints={state.lastAwardedPoints}
            totalPoints={state.points}
            onNext={() => goToScreen('eval1')}
          />
        );

      case 'eval1':
        return (
          <Eval1Screen
            rating={state.rating1}
            reviewComment={state.reviewComment1}
            onRatingChange={(r) => {
              if (soundEnabled) playHapticSound('tap');
              setState((prev) => ({ ...prev, rating1: r }));
            }}
            onCommentChange={(c) =>
              setState((prev) => ({ ...prev, reviewComment1: c }))
            }
            onSubmit={() => {
              if (soundEnabled) playHapticSound('success');
              showToast('¡Gracias por calificar el recojo!');
              setState((prev) => ({ ...prev, rating1: 0, reviewComment1: '' }));
              goToScreen('panel_donar');
            }}
            onSkip={() => goToScreen('panel_donar')}
          />
        );

      case 'detalle':
        return (
          <DetalleProductoScreen
            product={currentProduct}
            userPoints={state.points}
            onProceedToCheckout={() => goToScreen('pago')}
            onBackToCatalog={() => goToScreen('panel_tienda')}
          />
        );

      case 'pago':
        return (
          <PagoCanjeScreen
            product={currentProduct}
            userPoints={state.points}
            paymentMethod={state.paymentMethod}
            cardData={state.cardData}
            applyPointsDiscount={state.applyPointsDiscount}
            onPaymentMethodChange={(m: PaymentMethod) =>
              setState((prev) => ({ ...prev, paymentMethod: m }))
            }
            onCardDataChange={(card: typeof state.cardData) =>
              setState((prev) => ({ ...prev, cardData: card }))
            }
            onTogglePointsDiscount={(val: boolean) =>
              setState((prev) => ({ ...prev, applyPointsDiscount: val }))
            }
            onConfirmCheckout={handleConfirmCheckout}
          />
        );

      case 'pedido':
        return (
          <PedidoConfirmadoScreen
            product={currentProduct}
            userPoints={state.points}
            userName={state.userName}
            address={state.address}
            paymentMethod={state.paymentMethod}
            cardData={state.cardData}
            onNext={() => goToScreen('eval2')}
          />
        );

      case 'eval2':
        return (
          <Eval2Screen
            rating={state.rating2}
            reviewComment={state.reviewComment2}
            onRatingChange={(r) => {
              if (soundEnabled) playHapticSound('tap');
              setState((prev) => ({ ...prev, rating2: r }));
            }}
            onCommentChange={(c) =>
              setState((prev) => ({ ...prev, reviewComment2: c }))
            }
            onFinish={() => {
              if (soundEnabled) playHapticSound('success');
              showToast('¡Valoración enviada! Gracias por apoyar la moda circular');
              setState((prev) => ({ ...prev, rating2: 0, reviewComment2: '' }));
              goToScreen('panel_tienda');
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1a12] bg-[radial-gradient(circle_at_50%_20%,#173523_0%,#0c1610_100%)] text-[#132a1c] flex flex-col items-center justify-center p-3 select-none">
      {/* Outer Floating Control Island */}
      <header className="mb-3 w-full max-w-[540px] flex items-center justify-between gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/90 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5 pl-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            RETEX Prototipo
          </span>

          <span className="text-white/40 hidden sm:inline">|</span>

          {/* Quick jump */}
          <select
            value={state.screen}
            onChange={(e) => goToScreen(e.target.value as ScreenId)}
            className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium py-1 px-2 rounded-full border border-white/15 outline-none cursor-pointer max-w-[130px] sm:max-w-[160px] truncate"
          >
            {Object.entries(SCREEN_LABELS).map(([key, label]) => (
              <option key={key} value={key} className="bg-[#132a1c] text-white">
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playHapticSound('tap');
            }}
            className="p-1.5 hover:bg-white/15 rounded-full transition-colors"
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar efectos de audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#4ade80]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/50" />
            )}
          </button>

          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'phone' ? 'full' : 'phone')}
            className="p-1.5 hover:bg-white/15 rounded-full transition-colors hidden sm:flex items-center gap-1 text-[11px]"
            title={viewMode === 'phone' ? 'Expandir vista' : 'Ver marco iPhone'}
          >
            {viewMode === 'phone' ? (
              <Monitor className="w-3.5 h-3.5 text-white/80" />
            ) : (
              <Smartphone className="w-3.5 h-3.5 text-white/80" />
            )}
          </button>

          {/* Reset */}
          <button
            onClick={resetDemo}
            className="p-1.5 hover:bg-white/15 rounded-full text-white/70 hover:text-white transition-colors"
            title="Reiniciar demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className="relative flex items-center justify-center w-full">
        {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}

        {viewMode === 'phone' ? (
          <PhoneShell
            state={state}
            goToScreen={goToScreen}
            resetDemo={resetDemo}
          >
            {renderCurrentScreen()}
          </PhoneShell>
        ) : (
          <div className="w-full max-w-[680px] min-h-[750px] bg-white rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2ece5] mb-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[18px] text-[#1e5c3c]">RETEX</span>
                <span className="text-xs bg-[#eaf4ed] text-[#1e5c3c] font-bold px-2.5 py-0.5 rounded-full">
                  Vista Ampliada
                </span>
              </div>
              <button
                onClick={() => setViewMode('phone')}
                className="text-xs font-bold text-[#1e5c3c] hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Volver a marco iPhone</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderCurrentScreen()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
