
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, Github, Globe, X, User, Moon, Sun, Star, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import Toast from './Toast';

interface StarParticle {
  id: number;
  angle: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
}

const Header: React.FC = () => {
  const { data, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { personal, contact, ui } = data;
  const [showModal, setShowModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Avatar Interaction State
  const [isHovering, setIsHovering] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [shotStars, setShotStars] = useState<StarParticle[]>([]);
  const nextParticleId = useRef(0);
  const holdIntervalRef = useRef<number | null>(null);

  // Avatar Carousel State
  const [avatarIndex, setAvatarIndex] = useState(0);
  const carouselPausedRef = useRef(false);
  
  const avatarImages = [
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=500&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=500&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop"  
  ];

  // Stats State
  const [viewCount, setViewCount] = useState(1205); 
  const [likeCount, setLikeCount] = useState(48);   
  const [hasLiked, setHasLiked] = useState(false);
  const [isSpinningHeart, setIsSpinningHeart] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    // Carousel Logic: Only cycle if not interacting
    const intervalId = setInterval(() => {
      if (!carouselPausedRef.current) {
        setAvatarIndex((prev) => (prev + 1) % avatarImages.length);
      }
    }, 4000);

    // Listen for star achievement to trigger super heart spin
    const handleStarAchieved = () => {
      setIsSpinningHeart(true);
      let count = 0;
      const targetIncrease = 30 + Math.floor(Math.random() * 40);
      const timer = setInterval(() => {
        setLikeCount(prev => prev + 1);
        count++;
        if (count >= targetIncrease) {
          clearInterval(timer);
          // Wait a bit before stopping the spin for dramatic effect
          setTimeout(() => setIsSpinningHeart(false), 800);
        }
      }, 40);
    };

    window.addEventListener('star-achieved', handleStarAchieved);

    // Initial state loading
    const storedViews = localStorage.getItem('portfolio_views');
    let currentViews = storedViews ? parseInt(storedViews) : 1205;
    if (!sessionStorage.getItem('view_counted')) {
        currentViews += 1;
        localStorage.setItem('portfolio_views', currentViews.toString());
        sessionStorage.setItem('view_counted', 'true');
    }
    setViewCount(currentViews);

    const storedLikes = localStorage.getItem('portfolio_likes');
    if (storedLikes) setLikeCount(parseInt(storedLikes));
    setHasLiked(localStorage.getItem('user_has_liked') === 'true');

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('star-achieved', handleStarAchieved);
        clearInterval(intervalId);
    };
  }, []);

  // Update carousel pause ref based on interactions
  useEffect(() => {
    carouselPausedRef.current = isHovering || isHolding;
  }, [isHovering, isHolding]);

  // Particle Spawning Logic
  const spawnStar = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 160 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const colors = ['#FFFF00', '#DA251D', '#FFFFFF', '#3b82f6', '#fbbf24'];
    
    const newStar: StarParticle = {
      id: nextParticleId.current++,
      angle,
      tx,
      ty,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 12 + Math.random() * 16
    };

    setShotStars(prev => [...prev, newStar]);
    setTimeout(() => {
      setShotStars(prev => prev.filter(s => s.id !== newStar.id));
    }, 1000);
  }, []);

  useEffect(() => {
    if (isHolding) {
      holdIntervalRef.current = window.setInterval(spawnStar, 70);
    } else if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding, spawnStar]);

  const handleLikeToggle = () => {
      if (isSpinningHeart) return;
      let newCount = likeCount;
      let newLikedState = !hasLiked;
      if (newLikedState) {
          newCount += 1;
      } else {
          newCount -= 1;
      }
      setLikeCount(newCount);
      setHasLiked(newLikedState);
      localStorage.setItem('portfolio_likes', newCount.toString());
      localStorage.setItem('user_has_liked', newLikedState.toString());
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${label} copied!`);
      setShowToast(true);
    });
  };

  return (
    <>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      <header className="relative w-full h-auto md:min-h-[95vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-start font-sans overflow-hidden print:min-h-0 print:bg-white transition-colors duration-500 pb-16 md:pb-0" id="section-home">
        
        {/* --- BANNER BACKGROUND --- */}
        <div className="absolute top-0 left-0 w-full h-[65%] bg-slate-900 dark:bg-slate-950 overflow-hidden z-0 shadow-2xl rounded-b-[3rem] md:rounded-b-[5rem] print:hidden border-b border-slate-800">
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-vn-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-vn-yellow rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-[15%] left-[5%] text-white/10 animate-spin-slow"><Star size={24} /></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
                <div className="whitespace-nowrap animate-marquee flex items-center">
                    <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()}</span>
                    <span className="text-[25vh] font-display font-bold text-white mx-10">{personal.name.toUpperCase()}</span>
                </div>
            </div>
        </div>

        {/* --- TOP ACTIONS --- */}
        <div className="absolute top-6 left-6 z-50 flex gap-3 print:hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white">
                <Eye size={16} className="text-blue-300" />
                <span className="text-xs font-bold font-mono">{viewCount.toLocaleString()}</span>
            </div>
            <button onClick={handleLikeToggle} className={`flex items-center gap-2 px-3 py-2 backdrop-blur-md rounded-full shadow-lg border transition-all duration-300 active:scale-95 group ${hasLiked || isSpinningHeart ? 'bg-vn-red/80 border-vn-red text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
                <Heart size={16} className={`transition-transform duration-300 ${isSpinningHeart ? 'animate-spin-super-fast' : (hasLiked ? 'fill-current scale-110' : 'group-hover:scale-110')}`} />
                <span className="text-xs font-bold font-mono">{likeCount.toLocaleString()}</span>
            </button>
        </div>

        <div className="absolute top-6 right-6 z-50 flex gap-3 print:hidden">
            <button onClick={toggleTheme} className="group flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-yellow-500 transition-all duration-300">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')} className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300"><Globe size={18} /><span className="text-sm font-medium uppercase">{language}</span></button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center pt-20 md:pt-28">
            <div className="text-center mb-10 transform transition-transform will-change-transform relative" style={{ transform: !isMobile ? `translateY(${scrollY * -0.2}px)` : 'none' }}>
                <div className="inline-block px-4 py-1.5 rounded-full border border-vn-red/30 bg-vn-red/10 backdrop-blur-sm mb-4 animate-fade-in-up">
                    <h2 className="text-sm md:text-base font-bold text-vn-yellow tracking-widest uppercase">{personal.role}</h2>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-none drop-shadow-2xl animate-fade-in-up delay-100">{personal.name}</h1>
            </div>

            {/* INTERACTIVE AVATAR */}
            <div 
                id="cv-profile-img"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => { setIsHovering(false); setIsHolding(false); }}
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onClick={() => !isHolding && setShowModal(true)}
                className="relative w-56 h-56 md:w-72 md:h-72 cursor-pointer group z-20 mt-4 mb-8 select-none"
                style={{ transform: !isMobile ? `translateY(${scrollY * 0.15}px)` : 'none' }} 
            >
                {shotStars.map(star => (
                   <div key={star.id} className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                      <div className="animate-star-shoot" style={{ color: star.color, '--tw-translate-x': `${star.tx}px`, '--tw-translate-y': `${star.ty}px` } as React.CSSProperties}>
                         <Star size={star.size} fill="currentColor" />
                      </div>
                   </div>
                ))}

                <div className={`absolute -inset-4 bg-gradient-to-b from-vn-yellow to-vn-red rounded-full blur-xl transition-all duration-500 ${isHolding ? 'opacity-70 scale-110' : 'opacity-30'}`}></div>
                <div className={`absolute -inset-[3px] rounded-full bg-gradient-to-tr from-vn-red via-vn-yellow to-transparent opacity-80 ${isHolding ? 'animate-spin-super-fast' : isHovering ? 'animate-spin-fast' : 'animate-spin-slow'}`}></div>

                {/* Main Image - Fixed to prevent square bug and Carousel change during spin */}
                <div className={`relative w-full h-full rounded-full overflow-hidden border-[6px] border-slate-900 shadow-2xl bg-slate-800 transition-all duration-500 ${isHolding ? 'scale-90 animate-spin-super-fast' : isHovering ? 'animate-spin-fast' : ''}`}>
                    {avatarImages.map((imgUrl, index) => (
                      <img 
                          key={index}
                          src={imgUrl}
                          alt="avatar" 
                          className={`absolute inset-0 w-full h-full object-cover rounded-full transform transition-all duration-1000 ${
                            avatarIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                          }`}
                      />
                    ))}
                    <div className={`absolute inset-0 bg-vn-red/40 flex items-center justify-center rounded-full transition-opacity duration-300 backdrop-blur-[1px] ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        <User size={40} className={`text-white drop-shadow-md transition-transform ${isHolding ? 'scale-150 text-vn-yellow' : ''}`} />
                    </div>
                </div>
            </div>

            {/* INFO BAR */}
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
                <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-center gap-6">
                    {contact.socials.github && <a href={contact.socials.github} target="_blank" className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><Github size={24} /></a>}
                    {contact.socials.linkedin && <a href={contact.socials.linkedin} target="_blank" className="p-2 text-slate-400 hover:text-[#0077b5] transition-all"><Linkedin size={24} /></a>}
                    {contact.socials.facebook && <a href={contact.socials.facebook} target="_blank" className="p-2 text-slate-400 hover:text-[#1877F2] transition-all"><Facebook size={24} /></a>}
                </div>
            </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-scale-in">
            <div className="h-32 bg-slate-900 relative">
                 <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white"><X size={20} /></button>
            </div>
            <div className="px-6 pb-6 relative text-center">
                <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-slate-800 shadow-xl overflow-hidden -mt-16 mx-auto">
                    <img src={avatarImages[avatarIndex]} alt="avatar" className="w-full h-full object-cover rounded-full" />
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
                <button onClick={() => setShowModal(false)} className="w-full mt-6 bg-slate-900 hover:bg-vn-red text-white font-bold py-3 rounded-xl transition-all">{ui.common.close}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
