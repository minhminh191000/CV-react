import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { data } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-vn-red to-vn-red-dark p-6 text-white relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold pr-8">{title}</h2>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
          {children}
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shrink-0 text-right">
             <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg transition-colors"
              >
                {data.ui.common.close}
              </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;