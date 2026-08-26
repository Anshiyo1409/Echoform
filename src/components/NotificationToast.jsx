import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl max-w-md ${
        isSuccess
          ? 'bg-dark-900/95 border-cyber-emerald/40 text-cyber-emerald'
          : isError
          ? 'bg-dark-900/95 border-rose-500/40 text-rose-400'
          : 'bg-dark-900/95 border-cyber-cyan/40 text-cyber-cyan'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 shrink-0" />}
        
        <p className="text-xs font-medium text-slate-200 flex-1">
          {message}
        </p>

        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
