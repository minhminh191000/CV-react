import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, Github, Globe, Download, X, User, Moon, Sun, Star, Copy, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import Toast from './Toast';

const Header: React.FC = () => {
  const { data, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { personal, contact, ui } = data;
  const [showModal, setShowModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Stats State
  const [viewCount, setViewCount] = useState(1205); // Fake start number
  const [likeCount, setLikeCount] = useState(48);   // Fake start number
  const [hasLiked, setHasLiked] = useState(false);

  // Handle Parallax Effect, Mobile Check & Stats
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    // --- LOGIC FOR VIEWS AND LIKES (Simulation using LocalStorage) ---
    // 1. Handle Views
    const storedViews = localStorage.getItem('portfolio_views');
    let currentViews = storedViews ? parseInt(storedViews) : 1205;
    
    // Increment view only once per session (optional logic, here we do it on load)
    const sessionKey = sessionStorage.getItem('view_counted');
    if (!sessionKey) {
        currentViews += 1;
        localStorage.setItem('portfolio_views', currentViews.toString());
        sessionStorage.setItem('view_counted', 'true');
    }
    setViewCount(currentViews);

    // 2. Handle Likes
    const storedLikes = localStorage.getItem('portfolio_likes');
    const userLiked = localStorage.getItem('user_has_liked') === 'true';
    
    if (storedLikes) {
        setLikeCount(parseInt(storedLikes));
    }
    setHasLiked(userLiked);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLikeToggle = () => {
      let newCount = likeCount;
      let newLikedState = !hasLiked;

      if (newLikedState) {
          newCount += 1;
          setToastMessage('Thanks for the love! ❤️');
      } else {
          newCount -= 1;
          setToastMessage('Like removed.');
      }

      setLikeCount(newCount);
      setHasLiked(newLikedState);
      setShowToast(true);

      // Persist
      localStorage.setItem('portfolio_likes', newCount.toString());
      localStorage.setItem('user_has_liked', newLikedState.toString());
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} copied to clipboard!`);
      setShowToast(true);
    });
  };

  return (
    <>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      <header className="relative w-full h-auto md:min-h-[95vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-start font-sans overflow-hidden print:min-h-0 print:bg-white transition-colors duration-500 pb-16 md:pb-0" id="section-home">
        
        {/* --- 1. THE DARK BANNER BACKGROUND --- */}
        <div className="absolute top-0 left-0 w-full h-[65%] bg-slate-900 dark:bg-slate-950 overflow-hidden z-0 shadow-2xl rounded-b-[3rem] md:rounded-b-[5rem] print:hidden border-b border-slate-800">
            
            {/* Abstract Gradient Orbs within Banner */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-vn-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-vn-yellow rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
            
            {/* Background Scattered Stars */}
            <div className="absolute top-[15%] left-[5%] text-white/10 animate-spin-slow"><Star size={24} /></div>
            <div className="absolute top-[25%] right-[10%] text-vn-yellow/20 animate-pulse-slow"><Star size={32} /></div>
            <div className="absolute bottom-[30%] left-[15%] text-vn-red/20 animate-bounce-slow"><Star size={20} /></div>
            <div className="absolute top-[10%] left-[40%] text-white/10 animate-pulse-slow delay-700"><Star size={16} /></div>

            {/* Marquee Background Text (Running Text) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
                <div className="whitespace-nowrap animate-marquee flex items-center">
                    <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()} - {personal.role.toUpperCase()}</span>
                    <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()} - {personal.role.toUpperCase()}</span>
                    <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()} - {personal.role.toUpperCase()}</span>
                </div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        {/* --- 2a. TOP LEFT STATS (Views & Likes) --- */}
        <div className="absolute top-6 left-6 z-50 flex gap-3 print:hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white select-none">
                <Eye size={16} className="text-blue-300" />
                <span className="text-xs font-bold font-mono">{viewCount.toLocaleString()}</span>
            </div>
            
            <button 
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 px-3 py-2 backdrop-blur-md rounded-full shadow-lg border transition-all duration-300 active:scale-95 group ${
                    hasLiked 
                    ? 'bg-vn-red/80 border-vn-red text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                title="Like this portfolio"
            >
                <Heart size={16} className={`transition-transform duration-300 ${hasLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-xs font-bold font-mono">{likeCount.toLocaleString()}</span>
            </button>
        </div>

        {/* --- 2b. TOP RIGHT NAVIGATION --- */}
        <div className="absolute top-6 right-6 z-50 flex gap-3 print:hidden">
            <button 
                onClick={handlePrint} 
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-vn-red transition-all duration-300"
                title={ui.common.downloadCV}
            >
                <Download size={18} />
                <span className="text-sm font-medium hidden md:block">{ui.common.downloadCV}</span>
            </button>
            <button 
                onClick={toggleTheme} 
                className="group flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-yellow-500 transition-all duration-300"
                title="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
                onClick={toggleLanguage} 
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{language}</span>
            </button>
        </div>

        {/* --- 3. MAIN CONTENT CONTAINER --- */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center pt-20 md:pt-28">
            
            {/* NAME & ROLE (Inside Dark Banner) */}
            <div 
                className="text-center mb-10 transform transition-transform will-change-transform relative"
                style={{ transform: !isMobile ? `translateY(${scrollY * -0.2}px)` : 'none' }} 
            >
                {/* Floating Stars around Name */}
                <div className="absolute -left-16 top-1/2 text-vn-yellow animate-spin-slow hidden md:block opacity-80"><Star size={28} fill="currentColor" /></div>
                <div className="absolute -right-16 top-0 text-vn-red animate-pulse-slow hidden md:block opacity-80"><Star size={24} fill="currentColor" /></div>

                <div className="inline-block px-4 py-1.5 rounded-full border border-vn-red/30 bg-vn-red/10 backdrop-blur-sm mb-4 animate-fade-in-up">
                    <h2 className="text-sm md:text-base font-bold text-vn-yellow tracking-widest uppercase">
                        {personal.role}
                    </h2>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-none drop-shadow-2xl animate-fade-in-up delay-100">
                    {personal.name}
                </h1>
            </div>

            {/* PROFILE IMAGE (Bridging the gap - Parallax Pull Effect) */}
            {/* 
                This element sits between the dark top and light bottom.
                id="cv-profile-img" is used by ScrollProgressLine.
            */}
            <div 
                id="cv-profile-img"
                onClick={() => setShowModal(true)}
                className="relative w-56 h-56 md:w-72 md:h-72 cursor-pointer group z-20 mt-4 mb-8"
                style={{ transform: !isMobile ? `translateY(${scrollY * 0.15}px)` : 'none' }} 
            >
                {/* Extra stars around profile image as requested */}
                <div className="absolute top-0 -left-10 text-vn-yellow animate-bounce-slow z-30 drop-shadow-lg"><Star size={32} fill="currentColor" /></div>
                <div className="absolute bottom-10 -right-8 text-white animate-spin-slow z-30 drop-shadow-lg"><Star size={20} fill="currentColor" /></div>
                <div className="absolute -top-6 right-10 text-vn-red animate-pulse-slow z-30 drop-shadow-lg"><Star size={24} /></div>

                {/* Outer Glow Ring */}
                <div className="absolute -inset-4 bg-gradient-to-b from-vn-yellow to-vn-red rounded-full opacity-30 blur-xl group-hover:opacity-50 transition-duration-500 animate-pulse-slow"></div>
                
                {/* Spinning Border */}
                <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-vn-red via-vn-yellow to-transparent animate-spin-slow opacity-80"></div>

                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-slate-900 shadow-2xl bg-slate-800">
                    <img 
                        src="https://picsum.photos/600/800" 
                        alt={personal.name} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-vn-red/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                         <User size={40} className="text-white drop-shadow-md" />
                    </div>
                </div>
            </div>

            {/* INFO BAR (On the Light Background) */}
            <div 
                className="w-full max-w-5xl bg-white dark:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-2xl p-6 md:p-8 animate-fade-in-up delay-200 relative group overflow-visible border-t-4 border-vn-red transition-colors duration-300"
                style={{ transform: !isMobile ? `translateY(${scrollY * 0.05}px)` : 'none' }}
            >
                {/* --- Decorative Stars for Info Bar --- */}
                <div className="absolute -top-6 -left-6 text-vn-yellow animate-spin-slow drop-shadow-md z-20"><Star size={32} fill="currentColor" /></div>
                <div className="absolute -bottom-4 -right-4 text-vn-red animate-bounce-slow drop-shadow-md z-20"><Star size={24} fill="currentColor" /></div>
                <div className="absolute top-1/2 left-4 text-slate-200 dark:text-slate-800 animate-pulse-slow pointer-events-none -z-10"><Star size={120} /></div>

                {/* Hover gradient effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vn-red via-vn-yellow to-vn-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                {/* --- 3 DISTINCT INFO BOXES --- */}
                {/* Changes: Added darker borders for dark mode, stronger shadows, and bg-white/slate-800 to make them pop out */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {/* Phone - Click to Copy */}
                    <div 
                        onClick={() => copyToClipboard(contact.phone, ui.labels.mobile)}
                        className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-2 group/item cursor-pointer relative"
                    >
                        <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <Copy size={16} className="text-slate-400" />
                        </div>
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl flex items-center justify-center mb-3 shadow-md border border-slate-100 dark:border-slate-600 group-hover/item:border-vn-red/50 group-hover/item:scale-110 transition-transform duration-300">
                            <Phone size={22} className="text-vn-red" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.mobile}</p>
                        <span className="text-lg text-slate-800 dark:text-slate-200 font-bold hover:text-vn-red transition-colors font-display tracking-wide">{contact.phone}</span>
                    </div>

                    {/* Email - Click to Copy */}
                    <div 
                        onClick={() => copyToClipboard(contact.email, ui.labels.email)}
                        className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-2 group/item delay-75 cursor-pointer relative"
                    >
                         <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <Copy size={16} className="text-slate-400" />
                        </div>
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl flex items-center justify-center mb-3 shadow-md border border-slate-100 dark:border-slate-600 group-hover/item:border-vn-red/50 group-hover/item:scale-110 transition-transform duration-300">
                            <Mail size={22} className="text-vn-red" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.email}</p>
                        <span className="text-lg text-slate-800 dark:text-slate-200 font-bold hover:text-vn-red transition-colors font-display tracking-wide truncate max-w-full px-2">{contact.email}</span>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:border-vn-red/40 transition-all duration-300 hover:-translate-y-2 group/item delay-150">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl flex items-center justify-center mb-3 shadow-md border border-slate-100 dark:border-slate-600 group-hover/item:border-vn-red/50 group-hover/item:scale-110 transition-transform duration-300">
                            <MapPin size={22} className="text-vn-red" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{ui.labels.location}</p>
                        <p className="text-lg text-slate-800 dark:text-slate-200 font-bold font-display tracking-wide">{contact.address}</p>
                    </div>
                </div>

                {/* Social Links Row */}
                <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-center gap-6 relative z-10">
                    {contact.socials.github && (
                        <a href={contact.socials.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                            <Github size={24} />
                        </a>
                    )}
                    {contact.socials.linkedin && (
                        <a href={contact.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {contact.socials.facebook && (
                        <a href={contact.socials.facebook} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                            <Facebook size={24} />
                        </a>
                    )}
                    {contact.socials.youtube && (
                        <a href={contact.socials.youtube} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#FF0000] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                            <Youtube size={24} />
                        </a>
                    )}
                </div>
            </div>

        </div>
      </header>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="h-32 bg-slate-900 relative">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="px-6 pb-6 relative">
                 {/* Avatar */}
                <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-slate-800 shadow-xl overflow-hidden -mt-16 mx-auto bg-slate-200">
                    <img 
                        src="https://picsum.photos/600/800" 
                        alt={personal.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="text-center mt-4 mb-6">
                    <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">{personal.name}</h2>
                    <p className="text-vn-red font-bold text-sm tracking-wide">{personal.role}</p>
                </div>

                <div className="space-y-4">
                     <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-slate-200 dark:text-slate-700 animate-spin-slow"><Star size={16} /></div>
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700 relative z-10">
                            <User size={18} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">{ui.common.basicInfo}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{ui.labels.gender}</p>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">{personal.gender}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{ui.labels.dob}</p>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">{personal.dob}</p>
                            </div>
                        </div>
                     </div>
                     
                     <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                         <div className="flex items-center gap-3 mb-2">
                            <MapPin size={18} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">{ui.labels.address}</span>
                         </div>
                         <p className="font-medium text-slate-900 dark:text-white text-sm pl-8">{contact.address}</p>
                     </div>
                </div>

                <button 
                    onClick={() => setShowModal(false)}
                    className="w-full mt-6 bg-slate-900 hover:bg-vn-red text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-red-500/30"
                >
                    {ui.common.close}
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;