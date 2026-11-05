import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { RETEX_LOGO_URL } from '../../data/products';
import { GoogleAuthModal, GoogleIcon } from '../GoogleAuthModal';

interface LoginScreenProps {
  isRegister: boolean;
  onToggleRegister: () => void;
  onSubmit: (name: string, email: string, phone: string) => void;
  onGoogleAuth?: (name: string, email: string, phone: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  isRegister,
  onToggleRegister,
  onSubmit,
  onGoogleAuth,
}) => {
  const [name, setName] = useState('Camila Morales');
  const [email, setEmail] = useState('camila.retex@gmail.com');
  const [phone, setPhone] = useState('987 654 321');
  const [password, setPassword] = useState('••••••••••••');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handlePhoneChange = (val: string) => {
    // Keep numbers and format as 9 digits in blocks: 987 654 321
    const raw = val.replace(/\D/g, '').slice(0, 9);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6, 9)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)} ${raw.slice(3, 6)}`;
    }
    setPhone(formatted);
    if (phoneError) setPhoneError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const cleanPhone = phone.replace(/\s/g, '');
      if (cleanPhone.length < 9) {
        setPhoneError('Por favor ingresa un número de celular válido de 9 dígitos.');
        return;
      }
    }
    onSubmit(name, email, phone);
  };

  const handleGoogleSelect = (gName: string, gEmail: string, gPhone: string) => {
    setShowGoogleModal(false);
    if (onGoogleAuth) {
      onGoogleAuth(gName, gEmail, gPhone);
    } else {
      onSubmit(gName, gEmail, gPhone);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-2">
      <div>
        <div className="text-center my-2">
          <div className="w-[80px] h-[80px] mx-auto mb-2 rounded-[22px] bg-white flex items-center justify-center shadow-[0_8px_20px_rgba(30,92,60,0.14)] border border-[#e2ece5] p-2">
            <img
              src={RETEX_LOGO_URL}
              alt="RETEX Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-[21px] font-extrabold text-[#132a1c] tracking-tight">
            {isRegister ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-[12.5px] text-[#60796b] mt-0.5 max-w-[280px] mx-auto">
            {isRegister
              ? 'Únete al movimiento de economía circular textil.'
              : 'Ingresa para gestionar tus recojos y catálogo.'}
          </p>
        </div>

        {/* Google Authentication Button */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-3 px-4 bg-white hover:bg-[#f6faf8] text-[#132a1c] border-[1.5px] border-[#d3ded7] hover:border-[#1e5c3c] rounded-2xl font-bold text-[13.5px] shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer group"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <GoogleIcon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
            </div>
            <span>
              {isRegister ? 'Registrarse con Google' : 'Iniciar sesión con Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex py-2.5 items-center">
            <div className="flex-grow border-t border-[#e2ece5]"></div>
            <span className="shrink mx-3 text-[11px] font-bold text-[#8ca395] uppercase tracking-wider">
              o con correo electrónico
            </span>
            <div className="flex-grow border-t border-[#e2ece5]"></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e2ece5] rounded-2xl p-4 shadow-sm space-y-3"
        >
          {isRegister && (
            <>
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#1e5c3c]" />
                  <span>Nombre completo</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Camila Morales"
                  className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#132a1c] outline-none focus:border-[#1e5c3c] focus:ring-2 focus:ring-[#1e5c3c]/15 transition-all"
                  required
                />
              </div>

              {/* Cell Phone Number (Mandatory on registration) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11.5px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#1e5c3c]" />
                    <span>Número de celular</span>
                  </label>
                  <span className="text-[10px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
                    Obligatorio
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#f8faf8] border-[1.5px] border-[#e2ece5] rounded-xl px-3 py-2.5 text-[13px] font-bold text-[#132a1c] shrink-0 flex items-center gap-1.5">
                    <span>🇵🇪</span>
                    <span>+51</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="987 654 321"
                    maxLength={11}
                    className={`flex-1 bg-white border-[1.5px] rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#132a1c] outline-none transition-all ${
                      phoneError
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-[#e2ece5] focus:border-[#1e5c3c] focus:ring-2 focus:ring-[#1e5c3c]/15'
                    }`}
                    required
                  />
                </div>
                {phoneError ? (
                  <span className="text-[11px] text-red-500 font-semibold pl-1">
                    {phoneError}
                  </span>
                ) : (
                  <span className="text-[11px] text-[#60796b] flex items-center gap-1 pl-1">
                    <CheckCircle2 className="w-3 h-3 text-[#1e5c3c] shrink-0" />
                    <span>Para coordinar recojos gratuitos y confirmación por WhatsApp.</span>
                  </span>
                )}
              </div>
            </>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11.5px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#1e5c3c]" />
              <span>Correo electrónico</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#132a1c] outline-none focus:border-[#1e5c3c] focus:ring-2 focus:ring-[#1e5c3c]/15 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11.5px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#1e5c3c]" />
              <span>Contraseña</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-[1.5px] border-[#e2ece5] rounded-xl px-3.5 py-2.5 text-[14px] text-[#132a1c] outline-none focus:border-[#1e5c3c] focus:ring-2 focus:ring-[#1e5c3c]/15 transition-all"
              required
            />
          </div>

          {!isRegister && (
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() =>
                  alert(
                    'Simulación: enlace de restablecimiento de contraseña enviado a tu correo.'
                  )
                }
                className="text-[12px] text-[#1e5c3c] font-semibold hover:underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3.5 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[14.5px] shadow-[0_4px_14px_rgba(30,92,60,0.22)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>{isRegister ? 'Crear cuenta y comenzar' : 'Ingresar'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onToggleRegister}
          className="w-full py-3 px-4 bg-transparent hover:bg-[#eaf4ed] text-[#1e5c3c] border-[1.5px] border-[#1e5c3c] rounded-xl font-bold text-[13.5px] transition-all cursor-pointer"
        >
          <span>
            {isRegister
              ? 'Ya tengo cuenta, iniciar sesión'
              : '¿No tienes cuenta? Crear una'}
          </span>
        </button>
      </div>

      {/* Google Authentication Modal */}
      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelectAccount={handleGoogleSelect}
        mode={isRegister ? 'register' : 'login'}
        initialPhone={phone}
      />
    </div>
  );
};
