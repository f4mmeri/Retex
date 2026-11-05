import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RETEX_LOGO_URL } from '../../data/products';
import { GoogleAuthModal, GoogleIcon } from '../GoogleAuthModal';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onGoogleLogin?: (name: string, email: string, phone: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onLogin,
  onRegister,
  onGoogleLogin,
}) => {
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between py-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        {/* Logo Card */}
        <div className="w-[110px] h-[110px] mb-5 rounded-[28px] bg-white flex items-center justify-center shadow-[0_12px_30px_rgba(30,92,60,0.18)] border border-[#e2ece5] p-3 transition-transform hover:scale-105 duration-300">
          <img
            src={RETEX_LOGO_URL}
            alt="RETEX Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
          />
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-extrabold text-[#132a1c] tracking-tight mb-2">
          RETEX
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] text-[#60796b] leading-relaxed max-w-[270px]">
          Tu ropa todavía tiene mucho que aportar al planeta y a tu comunidad.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-4">
        {/* Google Quick Sign-in */}
        <button
          onClick={() => setShowGoogleModal(true)}
          className="w-full py-3.5 px-4 bg-white hover:bg-[#f6faf8] text-[#132a1c] border-[1.5px] border-[#d3ded7] hover:border-[#1e5c3c] rounded-xl font-bold text-[14px] shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer group"
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <GoogleIcon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
          </div>
          <span>Continuar con Google</span>
        </button>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#e2ece5]"></div>
          <span className="shrink mx-3 text-[10.5px] font-bold text-[#8ca395] uppercase tracking-wider">
            o utiliza tu correo
          </span>
          <div className="flex-grow border-t border-[#e2ece5]"></div>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14.5px] cursor-pointer shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Iniciar sesión</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={onRegister}
          className="w-full py-3 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border-[1.5px] border-[#1e5c3c] rounded-xl font-bold text-[13.5px] cursor-pointer flex items-center justify-center transition-all active:scale-[0.98]"
        >
          <span>Crear cuenta</span>
        </button>
      </div>

      {/* Google Modal */}
      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={(name, email, phone) => {
          setShowGoogleModal(false);
          if (onGoogleLogin) {
            onGoogleLogin(name, email, phone);
          }
        }}
        mode="login"
      />
    </div>
  );
};
