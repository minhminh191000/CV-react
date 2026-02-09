import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Star, Code, Database, Terminal, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  const { data } = useLanguage();
  const { personal, ui } = data;
  const [logoState, setLogoState] = useState(0);

  // Logic to cycle logo every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoState((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderDynamicLogo = () => {
    const initials = personal.name.split(' ').map(n => n[0]).join('');
    
    const logoItems = [
      // State 0: Initials
      <span key="initials" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-vn-yellow to-white">
        {initials}
      </span>,
      // State 1: Odoo / Backend Icon
      <Database key="db" size={28} className="text-vn-yellow drop-shadow-[0_0_8px_rgba(255,255,0,0.5)]" />,
      // State 2: Code / Python Icon
      <Terminal key="code" size={28} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />,
      // State 3: Vietnam Star
      <Star key="star" size={28} fill="currentColor" className="text-vn-yellow animate-pulse" />
    ];

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {logoItems.map((item, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out transform ${
              logoState === index 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-50 rotate-12 pointer-events-none'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className="relative mt-0 pt-20 pb-10 print:hidden overflow-hidden">
        {/* --- Background Styling to fit the frame --- */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 dark:bg-black rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-vn-red-dark via-slate-900 to-slate-900 dark:from-slate-900 dark:via-black dark:to-black opacity-90"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute top-[-50%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-vn-red rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
        </div>

        {/* --- Decorative Floating Stars --- */}
        <div className="absolute top-10 left-10 text-vn-yellow opacity-40 animate-spin-slow z-10"><Star size={24} fill="currentColor" /></div>
        <div className="absolute top-16 right-16 text-white opacity-20 animate-bounce-slow z-10"><Star size={16} fill="currentColor" /></div>
        <div className="absolute bottom-20 left-1/4 text-vn-red opacity-30 animate-pulse-slow z-10"><Star size={32} /></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            
            {/* Logo / Name Area */}
            <div className="mb-8">
                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg mb-4 hover:scale-110 transition-transform duration-500 group overflow-hidden relative">
                     {renderDynamicLogo()}
                     {/* Tiny star on logo hover */}
                     <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-vn-yellow"><Star size={12} fill="currentColor" /></div>
                 </div>
                 <h2 className="text-3xl font-display font-bold text-white tracking-wide mb-2">{personal.name}</h2>
                 <p className="text-white/60 text-sm font-medium tracking-widest uppercase">{personal.role}</p>
            </div>

            {/* Separator */}
            <div className="w-16 h-1 bg-gradient-to-r from-vn-red to-vn-yellow mx-auto rounded-full mb-8"></div>

            {/* Links / Copyright */}
            <div className="text-slate-400 text-sm flex flex-col items-center gap-2 relative">
                <div className="absolute -left-10 md:left-[30%] top-1 text-vn-yellow/20 animate-spin-slow"><Star size={12} /></div>
                <div className="absolute -right-10 md:right-[30%] top-1 text-vn-red/20 animate-pulse-slow"><Star size={12} /></div>
                
                <p>&copy; {new Date().getFullYear()} <span className="text-white font-semibold">{personal.name}</span>. {ui.footer.rights}</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;