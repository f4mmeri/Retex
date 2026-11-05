import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warn';
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="absolute top-14 left-4 right-4 z-50 pointer-events-none flex justify-center">
      <div className="bg-[#132a1c] text-white px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 max-w-[340px] pointer-events-auto border border-white/10 text-[12.5px] font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
        {toast.type === 'success' && (
          <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0" />
        )}
        {toast.type === 'warn' && (
          <AlertTriangle className="w-4 h-4 text-[#facc15] shrink-0" />
        )}
        {toast.type === 'info' && (
          <Info className="w-4 h-4 text-[#60a5fa] shrink-0" />
        )}
        <span className="flex-1">{toast.text}</span>
      </div>
    </div>
  );
};
