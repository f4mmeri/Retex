import React from 'react';
import { Home, RotateCcw, Shirt, ShoppingBag, User } from 'lucide-react';
import { AppState, ScreenId } from '../types';
import { RETEX_LOGO_URL, SCREEN_LABELS } from '../data/products';

interface PhoneShellProps {
  state: AppState;
  goToScreen: (screen: ScreenId) => void;
  resetDemo: () => void;
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({
  state,
  goToScreen,
  resetDemo,
  children,
}) => {
  const isAuthScreen = state.screen === 'welcome' || state.screen === 'login';
  const showBottomNav = state.isLoggedIn && !isAuthScreen;

  const isDonarActive = [
    'panel_donar',
    'solicitar',
    'programar',
    'enviada',
    'resp',
    'clasif',
    'recojo',
    'puntos',
    'eval1',
  ].includes(state.screen);

  const isTiendaActive = [
    'panel_tienda',
    'giftcards',
    'detalle',
    'pago',
    'pedido',
    'eval2',
  ].includes(state.screen);

  const isPerfilActive = state.screen === 'panel_perfil';

  return (
    <div className="w-full max-w-[390px] h-[844px] max-h-[92vh] bg-white rounded-[44px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5),0_0_0_10px_#1c2e23,0_0_0_12px_#2f4e3b] flex flex-col overflow-hidden relative border border-[#2f4e3b]/30">
      {/* Status Bar & Dynamic Island */}
      <div className="pt-3 px-6 pb-1.5 flex justify-between items-center text-xs font-semibold text-[#132a1c] bg-white z-20 shrink-0 select-none">
        <span className="font-bold tracking-tight text-[13px] ml-1">9:41</span>
        
        {/* Dynamic Island */}
        <div className="w-[112px] h-[26px] bg-[#0c1610] rounded-[16px] flex items-center justify-between px-3 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#172b1d] border border-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1b3524]/60 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#22c55e]/70" />
          </div>
        </div>

        {/* Signal, Wifi, Battery */}
        <div className="flex items-center gap-1.5 text-[#132a1c] mr-1">
          {/* Signal */}
          <svg className="w-4 h-3.5 fill-current" viewBox="0 0 15 11">
            <path d="M1 10.5h2.5V8.5H1v2zm4 0h2.5V6H5v4.5zm4 0h2.5V3.5H9v7zm4 0h2V0h-2v10.5z" />
          </svg>
          {/* Wifi */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 11">
            <path d="M7 2.2C4.5 2.2 2.3 3.3.8 5.1L0 4C1.8 1.8 4.3.5 7 .5s5.2 1.3 7 3.5l-.8 1.1C11.7 3.3 9.5 2.2 7 2.2zm0 3.8c-1.6 0-3 .7-4 1.8l-.8-.9C3.4 5.6 5.1 4.7 7 4.7s3.6.9 4.8 2.2l-.8.9c-1-1.1-2.4-1.8-4-1.8zm0 3.8c-.8 0-1.5.3-2 .9L7 12.5l2-1.8c-.5-.6-1.2-.9-2-.9z" />
          </svg>
          {/* Battery */}
          <div className="w-5 h-2.5 border-[1.5px] border-current rounded-[3px] p-[1.5px] flex items-center">
            <div className="h-full w-full bg-current rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* App Header Nav */}
      <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-[#e2ece5] z-10 shrink-0">
        <button
          onClick={() => goToScreen(state.isLoggedIn ? 'panel_donar' : 'welcome')}
          className="flex items-center gap-2 font-extrabold text-[15px] text-[#1e5c3c] tracking-tight hover:opacity-85 transition-opacity"
          title="Ir a inicio de RETEX"
        >
          <img
            src={RETEX_LOGO_URL}
            alt="Logo RETEX"
            referrerPolicy="no-referrer"
            className="h-[30px] w-auto object-contain block drop-shadow-sm"
          />
          <span className="font-black text-[#1e5c3c] tracking-normal">RETEX</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => goToScreen(state.isLoggedIn ? 'panel_donar' : 'welcome')}
            className="bg-[#f8faf8] text-[#132a1c] hover:bg-[#eaf4ed] hover:text-[#1e5c3c] hover:border-[#1e5c3c] border border-[#e2ece5] rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-all inline-flex items-center gap-1"
            title="Inicio"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>

          <select
            value={state.screen}
            onChange={(e) => goToScreen(e.target.value as ScreenId)}
            className="bg-[#f8faf8] text-[#1e5c3c] border border-[#e2ece5] rounded-full text-[11px] font-bold px-2 py-1 outline-none cursor-pointer max-w-[130px] focus:ring-1 focus:ring-[#1e5c3c]"
            title="Selector de Pantallas"
          >
            {Object.entries(SCREEN_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <button
            onClick={resetDemo}
            className="w-7 h-7 bg-[#f8faf8] text-[#132a1c] hover:bg-[#eaf4ed] hover:text-[#1e5c3c] hover:border-[#1e5c3c] border border-[#e2ece5] rounded-full flex items-center justify-center transition-all"
            title="Reiniciar a Bienvenida"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Viewport */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-[#f4f7f4] flex flex-col custom-scrollbar relative">
        {children}
      </div>

      {/* Bottom Tab Bar */}
      {showBottomNav && (
        <div className="flex justify-around items-center bg-white border-t border-[#e2ece5] px-3 pt-2 pb-5 z-20 shrink-0">
          <button
            onClick={() => goToScreen('panel_donar')}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-4 rounded-xl transition-all cursor-pointer font-sans ${
              isDonarActive
                ? 'text-[#1e5c3c] font-bold bg-[#eaf4ed]'
                : 'text-[#60796b] font-medium hover:text-[#132a1c]'
            }`}
          >
            <Shirt className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[11px]">Donar ropa</span>
          </button>

          <button
            onClick={() => goToScreen('panel_tienda')}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-4 rounded-xl transition-all cursor-pointer font-sans ${
              isTiendaActive
                ? 'text-[#1e5c3c] font-bold bg-[#eaf4ed]'
                : 'text-[#60796b] font-medium hover:text-[#132a1c]'
            }`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[11px]">Tienda</span>
          </button>

          <button
            onClick={() => goToScreen('panel_perfil')}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-4 rounded-xl transition-all cursor-pointer font-sans ${
              isPerfilActive
                ? 'text-[#1e5c3c] font-bold bg-[#eaf4ed]'
                : 'text-[#60796b] font-medium hover:text-[#132a1c]'
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[11px]">Perfil</span>
          </button>
        </div>
      )}
    </div>
  );
};
