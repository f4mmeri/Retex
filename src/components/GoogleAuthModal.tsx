import React, { useState } from 'react';
import { X, Check, Loader2, Plus, Phone, AlertCircle } from 'lucide-react';

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.39 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.61 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

export interface GoogleAccount {
  name: string;
  email: string;
  avatarColor: string;
  tag?: string;
  avatarLetter: string;
  suggestedPhone?: string;
}

const PRESET_ACCOUNTS: GoogleAccount[] = [
  {
    name: 'Fabiana Ameri',
    email: 'fabiana.ameri@utec.edu.pe',
    avatarColor: 'bg-[#1a73e8]',
    avatarLetter: 'F',
    tag: 'UTEC · Cuenta universitaria',
    suggestedPhone: '981 234 567',
  },
  {
    name: 'Camila Morales',
    email: 'camila.retex@gmail.com',
    avatarColor: 'bg-[#1e5c3c]',
    avatarLetter: 'C',
    tag: 'Cuenta Google verificada',
    suggestedPhone: '987 654 321',
  },
];

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (name: string, email: string, phone: string) => void;
  mode: 'login' | 'register';
  initialPhone?: string;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
  mode,
  initialPhone = '987 654 321',
}) => {
  const [selectedEmail, setSelectedEmail] = useState<string>(PRESET_ACCOUNTS[0].email);
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneChange = (val: string) => {
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

  const handleConfirmAccount = (account: GoogleAccount) => {
    const cleanPhone = phone.replace(/\s/g, '');
    if (mode === 'register' && cleanPhone.length < 9) {
      setPhoneError('Ingresa un celular de 9 dígitos para coordinar tus recojos');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSelectAccount(
        account.name,
        account.email,
        phone || account.suggestedPhone || '987 654 321'
      );
    }, 450);
  };

  const handleConfirmCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.includes('@')) return;
    const cleanPhone = phone.replace(/\s/g, '');
    if (mode === 'register' && cleanPhone.length < 9) {
      setPhoneError('Ingresa un celular de 9 dígitos para coordinar tus recojos');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSelectAccount(customName.trim(), customEmail.trim(), phone || '987 654 321');
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[370px] bg-white rounded-3xl shadow-2xl border border-[#e2ece5] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 pt-5 pb-3 border-b border-[#edf3ef] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#e2ece5] flex items-center justify-center p-1">
              <GoogleIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[14.5px] font-bold text-[#132a1c] leading-tight">
                {mode === 'register' ? 'Registrarse con Google' : 'Acceder con Google'}
              </h3>
              <p className="text-[11.5px] text-[#60796b]">
                Para continuar en <span className="font-semibold text-[#1e5c3c]">RETEX</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full hover:bg-[#f0f5f2] flex items-center justify-center text-[#60796b] hover:text-[#132a1c] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 flex flex-col gap-3.5 max-h-[75vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-8 h-8 text-[#1e5c3c] animate-spin" />
              <p className="text-[14px] font-bold text-[#132a1c]">
                Conectando con Google...
              </p>
              <p className="text-[12px] text-[#60796b]">
                Verificando credenciales de forma segura
              </p>
            </div>
          ) : !customMode ? (
            <>
              <p className="text-[12px] font-medium text-[#60796b]">
                Selecciona una cuenta para {mode === 'register' ? 'crear tu perfil' : 'iniciar sesión'}:
              </p>

              {/* Accounts List */}
              <div className="flex flex-col gap-2">
                {PRESET_ACCOUNTS.map((account) => {
                  const isSelected = selectedEmail === account.email;
                  return (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => {
                        setSelectedEmail(account.email);
                        if (account.suggestedPhone && !phone) {
                          setPhone(account.suggestedPhone);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#1e5c3c] bg-[#f4f9f6] shadow-xs'
                          : 'border-[#e5ede8] bg-white hover:bg-[#fafcfa] hover:border-[#ccdcd2]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-full ${account.avatarColor} text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {account.avatarLetter}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-[#132a1c] truncate">
                            {account.name}
                          </p>
                          <p className="text-[11.5px] text-[#60796b] truncate">
                            {account.email}
                          </p>
                          {account.tag && (
                            <span className="inline-block text-[9.5px] font-semibold text-[#1e5c3c] bg-[#eaf4ed] px-1.5 py-0.2 rounded-md mt-0.5">
                              {account.tag}
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 border ${
                          isSelected
                            ? 'bg-[#1e5c3c] border-[#1e5c3c] text-white'
                            : 'border-[#ccdcd2] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}

                {/* Add / custom account option */}
                <button
                  type="button"
                  onClick={() => setCustomMode(true)}
                  className="w-full p-2.5 rounded-xl border border-dashed border-[#ccdcd2] hover:border-[#1e5c3c] bg-[#fdfefe] hover:bg-[#f4f9f6] text-[#1e5c3c] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Usar otra cuenta de Google</span>
                </button>
              </div>

              {/* Phone number field (especially important for registration) */}
              <div className="pt-1 flex flex-col gap-1.5 border-t border-[#edf3ef]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#60796b] uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#1e5c3c]" />
                    <span>Número de WhatsApp</span>
                  </label>
                  {mode === 'register' && (
                    <span className="text-[9.5px] font-bold text-[#1e5c3c] bg-[#eaf4ed] px-1.5 py-0.2 rounded-full">
                      Requerido
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-2.5 py-2 text-[12.5px] font-bold text-[#132a1c] shrink-0 flex items-center gap-1">
                    <span>🇵🇪</span>
                    <span>+51</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="987 654 321"
                    maxLength={11}
                    className={`flex-1 bg-white border rounded-xl px-3 py-2 text-[13px] font-medium text-[#132a1c] outline-none transition-all ${
                      phoneError
                        ? 'border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'border-[#e2ece5] focus:border-[#1e5c3c]'
                    }`}
                  />
                </div>
                {phoneError && (
                  <span className="text-[10.5px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{phoneError}</span>
                  </span>
                )}
                <span className="text-[10.5px] text-[#60796b]">
                  Para enviarte el enlace de rastreo en tiempo real y coordinar el recojo gratuito.
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const acc = PRESET_ACCOUNTS.find((a) => a.email === selectedEmail) || PRESET_ACCOUNTS[0];
                    handleConfirmAccount(acc);
                  }}
                  className="w-full py-3 px-4 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[13.5px] shadow-[0_4px_12px_rgba(30,92,60,0.2)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <GoogleIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                  <span>
                    Continuar como {selectedEmail === PRESET_ACCOUNTS[0].email ? 'Fabiana' : 'Camila'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            /* Custom account entry */
            <form onSubmit={handleConfirmCustom} className="space-y-3">
              <p className="text-[12px] font-medium text-[#60796b]">
                Ingresa los datos de tu cuenta Google:
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#60796b] uppercase">Nombre</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Tu nombre y apellido"
                  className="w-full bg-white border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#60796b] uppercase">Correo Gmail</label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  className="w-full bg-white border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#60796b] uppercase">Celular</label>
                <div className="flex items-center gap-2">
                  <div className="bg-[#f8faf8] border border-[#e2ece5] rounded-xl px-2.5 py-2 text-[12px] font-bold text-[#132a1c] shrink-0">
                    +51
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="987 654 321"
                    maxLength={11}
                    className="flex-1 bg-white border border-[#e2ece5] rounded-xl px-3 py-2 text-[13px] text-[#132a1c] outline-none focus:border-[#1e5c3c]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomMode(false)}
                  className="flex-1 py-2.5 px-3 bg-transparent border border-[#ccdcd2] text-[#60796b] rounded-xl font-bold text-[12.5px] hover:bg-[#f4f9f6] cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 bg-[#1e5c3c] hover:bg-[#17482f] text-white rounded-xl font-bold text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GoogleIcon className="w-3.5 h-3.5 bg-white rounded-full p-0.5" />
                  <span>Continuar</span>
                </button>
              </div>
            </form>
          )}

          {/* Privacy footer */}
          <div className="pt-2 text-center text-[10.5px] text-[#8ca395] leading-normal border-t border-[#edf3ef]">
            Al continuar con Google, RETEX vinculará tu correo electrónico de forma segura para gestionar tus donaciones de ropa y puntos.
          </div>
        </div>
      </div>
    </div>
  );
};
