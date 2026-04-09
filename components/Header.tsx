import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Github, Globe, X, User, Moon, Sun, Eye, Heart, Download } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import Toast from './Toast';
import avatarImg from '../avatar.jpg';
import cvPdf from '../NGUYEN-VAN-MINH.pdf';

const Header: React.FC = () => {
  const { data, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { personal, contact, ui } = data;
  const [showModal, setShowModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Avatar state
  const [isHovering, setIsHovering] = useState(false);
  const avatarSrc = avatarImg;

  // Stats
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    // View count — base 500, tăng mỗi session
    const BASE_VIEWS = 500;
    const BASE_LIKES = 300;
    const storedViews = parseInt(localStorage.getItem('portfolio_views') || BASE_VIEWS.toString());
    if (!sessionStorage.getItem('view_counted')) {
      const newViews = storedViews + 1;
      localStorage.setItem('portfolio_views', newViews.toString());
      sessionStorage.setItem('view_counted', 'true');
      setViewCount(newViews);
    } else {
      setViewCount(storedViews);
    }

    // Like count — base 300
    const storedLikes = parseInt(localStorage.getItem('portfolio_likes') || BASE_LIKES.toString());
    setLikeCount(storedLikes);
    setHasLiked(localStorage.getItem('user_has_liked') === 'true');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLikeToggle = () => {
    const newLiked = !hasLiked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(newCount);
    setHasLiked(newLiked);
    localStorage.setItem('portfolio_likes', newCount.toString());
    localStorage.setItem('user_has_liked', newLiked.toString());
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} copied!`);
      setShowToast(true);
    });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvPdf;
    link.download = 'NGUYEN-VAN-MINH.pdf';
    link.click();
  };

  return (
    <>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      <header className="relative w-full h-auto md:min-h-[95vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-start font-sans overflow-hidden print:min-h-0 print:bg-white transition-colors duration-500 pb-16 md:pb-0" id="section-home">

        {/* Banner background */}
        <div className="absolute top-0 left-0 w-full h-[65%] bg-slate-900 dark:bg-slate-950 overflow-hidden z-0 shadow-2xl rounded-b-[3rem] md:rounded-b-[5rem] print:hidden border-b border-slate-800">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-vn-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-vn-yellow rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
            <div className="whitespace-nowrap animate-marquee flex items-center">
              <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()}</span>
              <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Top left: view + like */}
        <div className="absolute top-6 left-6 z-50 flex gap-3 print:hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white">
            <Eye size={16} className="text-blue-300" />
            <span className="text-xs font-bold font-mono">{viewCount.toLocaleString()}</span>
          </div>
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 px-3 py-2 backdrop-blur-md rounded-full shadow-lg border transition-all duration-300 active:scale-95 group ${hasLiked ? 'bg-vn-red/80 border-vn-red text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
          >
            <Heart size={16} className={`transition-transform duration-300 ${hasLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
            <span className="text-xs font-bold font-mono">{likeCount.toLocaleString()}</span>
          </button>
        </div>

        {/* Top right: theme + language + download CV */}
        <div className="absolute top-6 right-6 z-50 flex gap-3 print:hidden">
          <button onClick={toggleTheme} className="group flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-yellow-500 transition-all duration-300">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
            <Globe size={18} /><span className="text-sm font-medium uppercase">{language}</span>
          </button>
          <button onClick={handleDownloadCV} className="group flex items-center gap-2 px-4 py-2 bg-vn-red/80 backdrop-blur-md rounded-full shadow-lg border border-vn-red text-white hover:bg-vn-red transition-all duration-300">
            <Download size={18} /><span className="text-sm font-medium hidden sm:inline">{ui.common.downloadCV}</span>
          </button>
        </div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center pt-20 md:pt-28">
          <div className="text-center mb-10 transform transition-transform will-change-transform relative" style={{ transform: !isMobile ? `translateY(${scrollY * -0.2}px)` : 'none' }}>
            <div className="inline-block px-4 py-1.5 rounded-full border border-vn-red/30 bg-vn-red/10 backdrop-blur-sm mb-4 animate-fade-in-up">
              <h2 className="text-sm md:text-base font-bold text-vn-yellow tracking-widest uppercase">{personal.role}</h2>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-none drop-shadow-2xl animate-fade-in-up delay-100">{personal.name}</h1>
          </div>

          {/* Avatar */}
          <div
            id="cv-profile-img"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => setShowModal(true)}
            className="relative w-56 h-56 md:w-72 md:h-72 cursor-pointer group z-20 mt-4 mb-8 select-none"
            style={{ transform: !isMobile ? `translateY(${scrollY * 0.15}px)` : 'none' }}
          >
            <div className={`absolute -inset-4 bg-gradient-to-b from-vn-yellow to-vn-red rounded-full blur-xl transition-all duration-500 ${isHovering ? 'opacity-50' : 'opacity-30'}`}></div>
            <div className={`absolute -inset-[3px] rounded-full bg-gradient-to-tr from-vn-red via-vn-yellow to-transparent opacity-80 ${isHovering ? 'animate-spin-fast' : 'animate-spin-slow'}`}></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-slate-900 shadow-2xl bg-slate-800">
              <img
                src={avatarSrc}
                alt={personal.name}
                className="w-full h-full object-cover rounded-full"
              />
              <div className={`absolute inset-0 bg-vn-red/40 flex items-center justify-center rounded-full transition-opacity duration-300 backdrop-blur-[1px] ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <User size={40} className="text-white drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Info bar */}
          <div className="w-full max-w-5xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-6 md:p-8 animate-fade-in-up delay-200 relative border-t-4 border-vn-red transition-colors duration-300" style={{ transform: !isMobile ? `translateY(${scrollY * 0.05}px)` : 'none' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onClick={() => copyToClipboard(contact.phone, ui.labels.mobile)} className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <Phone size={22} className="text-vn-red mb-3" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.mobile}</p>
                <span className="text-lg text-slate-800 dark:text-slate-200 font-bold">{contact.phone}</span>
              </div>
              <div onClick={() => copyToClipboard(contact.email, ui.labels.email)} className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <Mail size={22} className="text-vn-red mb-3" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.email}</p>
                <span className="text-lg text-slate-800 dark:text-slate-200 font-bold truncate max-w-full px-2">{contact.email}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-1">
                <MapPin size={22} className="text-vn-red mb-3" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.location}</p>
                <p className="text-lg text-slate-800 dark:text-slate-200 font-bold">{contact.address}</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-center gap-6 flex-wrap">
              {contact.socials.github && <a href={contact.socials.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all" title="GitHub"><Github size={24} /></a>}
              {contact.socials.linkedin && <a href={contact.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#0077b5] transition-all" title="LinkedIn"><Linkedin size={24} /></a>}
              {contact.socials.facebook && <a href={contact.socials.facebook} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#1877F2] transition-all" title="Facebook"><Facebook size={24} /></a>}
              {contact.socials.youtube && (
                <a href={contact.socials.youtube} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#FF0000] transition-all" title="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {contact.socials.odooDemo && (
                <a href={`https://${contact.socials.odooDemo}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-vn-red border border-slate-200 dark:border-slate-700 hover:border-vn-red/50 rounded-full transition-all" title="Odoo Demo">
                  <Globe size={14} /> Demo ERP
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-scale-in">
            <div className="h-32 bg-slate-900 relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white"><X size={20} /></button>
            </div>
            <div className="px-6 pb-6 relative text-center">
              <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-slate-800 shadow-xl overflow-hidden -mt-16 mx-auto">
                <img src={avatarSrc} alt={personal.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-4">{personal.name}</h2>
              <p className="text-vn-red font-bold text-sm">{personal.role}</p>
              <div className="mt-6 space-y-4 text-left">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{ui.labels.gender}</p><p className="text-sm dark:text-white">{personal.gender}</p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{ui.labels.dob}</p><p className="text-sm dark:text-white">{personal.dob}</p></div>
                  </div>
                </div>
              </div>
              <button onClick={handleDownloadCV} className="w-full mt-4 flex items-center justify-center gap-2 bg-vn-red hover:bg-vn-red-dark text-white font-bold py-3 rounded-xl transition-all">
                <Download size={18} /> {ui.common.downloadCV}
              </button>
              <button onClick={() => setShowModal(false)} className="w-full mt-3 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all">{ui.common.close}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
