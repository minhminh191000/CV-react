import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700 dark:border-slate-200">
        <CheckCircle size={20} className="text-green-500" />
        <span className="font-bold text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;