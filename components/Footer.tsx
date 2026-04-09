import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Database, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  const { data } = useLanguage();
  const { personal, ui } = data;
  const [logoState, setLogoState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoState((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderDynamicLogo = () => {
    const initials = personal.name.split(' ').map(n => n[0]).join('');
    const logoItems = [
      <span key="initials" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-vn-yellow to-white">{initials}</span>,
      <Database key="db" size={28} className="text-vn-yellow drop-shadow-[0_0_8px_rgba(255,255,0,0.5)]" />,
      <Terminal key="code" size={28} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />,
    ];
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {logoItems.map((item, index) => (
          <div key={index} className={`absolute transition-all duration-700 ease-in-out transform ${logoState === index ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12 pointer-events-none'}`}>
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className="relative mt-0 pt-20 pb-10 print:hidden overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900 dark:bg-black rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-vn-red-dark via-slate-900 to-slate-900 dark:from-slate-900 dark:via-black dark:to-black opacity-90"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-[-50%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-vn-red rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg mb-4 hover:scale-110 transition-transform duration-500 overflow-hidden relative">
            {renderDynamicLogo()}
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mb-2">{personal.name}</h2>
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase">{personal.role}</p>
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-vn-red to-vn-yellow mx-auto rounded-full mb-8"></div>
        <div className="text-slate-400 text-sm flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} <span className="text-white font-semibold">{personal.name}</span>. {ui.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;