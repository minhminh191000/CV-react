import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star as StarIcon, Zap } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const ClickStarEffect: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isFalling, setIsFalling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load total stars from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_total_stars');
    if (saved) setTotalStars(parseInt(saved));
  }, []);

  // Calculate simulated rank based on star count
  const calculateRank = (count: number) => {
    if (count <= 1) return 98;
    if (count <= 5) return 85;
    if (count <= 10) return 60;
    if (count <= 25) return 30;
    if (count <= 50) return 15;
    if (count <= 100) return 5;
    return 1; // Top 1% for legends
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isComplete || showAchievement) return;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], #cv-profile-img');
      
      if (isInteractive) return;

      const newPoint = { x: e.clientX, y: e.clientY };

      setPoints(prev => {
        const newPoints = [...prev, newPoint];
        
        if (newPoints.length === 5) {
          setIsComplete(true);
          
          // Increment and save stars
          const newTotal = totalStars + 1;
          setTotalStars(newTotal);
          localStorage.setItem('cv_total_stars', newTotal.toString());
          
          // Dispatch achievement event to Header
          window.dispatchEvent(new CustomEvent('star-achieved', { detail: { count: newTotal } }));

          // Star falling animation
          setTimeout(() => {
            setIsFalling(true);
          }, 400);

          // Show Achievement after falling starts
          setTimeout(() => {
            setShowAchievement(true);
          }, 800);

          // Reset system after notification
          setTimeout(() => {
            setPoints([]);
            setIsComplete(false);
            setIsFalling(false);
          }, 1500);
        }

        return newPoints;
      });
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isComplete, showAchievement, totalStars]);

  const getStarPath = () => {
    if (points.length !== 5) return '';
    const p = points;
    return `M ${p[0].x} ${p[0].y} L ${p[2].x} ${p[2].y} L ${p[4].x} ${p[4].y} L ${p[1].x} ${p[1].y} L ${p[3].x} ${p[3].y} Z`;
  };

  if (points.length === 0 && !showAchievement) return null;

  const currentRank = calculateRank(totalStars);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      <svg className="w-full h-full">
        <defs>
          <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g 
          className={`transition-transform duration-1000 ease-in ${isFalling ? 'translate-y-[120vh] rotate-45' : ''}`}
          style={{ transformOrigin: 'center' }}
        >
          {points.length === 5 && (
            <path
              d={getStarPath()}
              fill="rgba(255, 255, 0, 0.4)"
              stroke="#FFFF00"
              strokeWidth="3"
              filter="url(#star-glow)"
              className="animate-pulse"
            />
          )}

          {points.map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y})`}>
              <circle r="5" fill="#DA251D" stroke="#FFFF00" strokeWidth="2" />
              <path 
                d="M 0 -10 L 2.5 -2.5 L 10 0 L 2.5 2.5 L 0 10 L -2.5 2.5 L -10 0 L -2.5 -2.5 Z" 
                fill="#FFFF00" 
                className="animate-spin-slow origin-center scale-75"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Achievement Notification Overlay */}
      {showAchievement && (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-500">
           <div className="bg-slate-900 dark:bg-white border-2 border-vn-yellow rounded-3xl p-8 shadow-[0_0_50px_rgba(255,223,0,0.3)] max-w-sm w-full text-center animate-scale-in relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 text-vn-yellow/10 rotate-12"><StarIcon size={120} fill="currentColor" /></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-vn-yellow to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
                        <Trophy size={40} className="text-slate-900" />
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white dark:text-slate-900 uppercase tracking-tight mb-2">Thành tựu mới!</h3>
                    
                    <div className="space-y-4 mb-8">
                        <div className="bg-white/10 dark:bg-slate-100 p-4 rounded-2xl border border-white/5 dark:border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng ngôi sao</p>
                            <div className="flex items-center justify-center gap-2">
                                <StarIcon size={20} className="text-vn-yellow" fill="currentColor" />
                                <span className="text-4xl font-display font-black text-vn-yellow">{totalStars}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-vn-red dark:text-vn-red-dark font-bold animate-bounce">
                            <Zap size={18} fill="currentColor" />
                            <span>Bạn đang ở TOP {currentRank}%</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowAchievement(false)}
                        className="w-full py-4 bg-vn-red hover:bg-vn-red-dark text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 pointer-events-auto"
                    >
                        Tiếp tục khám phá
                    </button>
                </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClickStarEffect;