import React, { useEffect, useState } from 'react';
import { Home, Briefcase, Wrench, FolderOpen, Mail } from 'lucide-react';

const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'section-home', icon: Home, label: 'Home' },
    { id: 'section-experience', icon: Briefcase, label: 'Exp' },
    { id: 'section-skills', icon: Wrench, label: 'Skills' },
    { id: 'section-projects', icon: FolderOpen, label: 'Projects' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for potential sticky headers or comfort
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Logic to determine active section based on scroll position
      const scrollPosition = window.scrollY + 300; // Offset to trigger earlier

      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 print:hidden">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 dark:border-slate-700 rounded-full shadow-2xl px-2 py-4 flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`p-3 rounded-full transition-all duration-300 relative group ${
              activeSection === item.id
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-110'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={item.label}
          >
            <item.icon size={20} />
            
            {/* Tooltip - Positioned to the left */}
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingNav;