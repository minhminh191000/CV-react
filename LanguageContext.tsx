import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData } from './types';
import { DATA_EN, DATA_VI } from './constants';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: CVData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      return savedLang === 'en' || savedLang === 'vi' ? savedLang : 'vi';
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const data = language === 'en' ? DATA_EN : DATA_VI;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};