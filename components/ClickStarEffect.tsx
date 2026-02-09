
import React, { useState, useEffect, useRef } from 'react';
import { Star as StarIcon } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const ClickStarEffect: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isFalling, setIsFalling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cv_total_stars');
    if (saved) setTotalStars(parseInt(saved));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isComplete) return;
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], #cv-profile-img')) return;

      const newPoint = { x: e.clientX, y: e.clientY };
      setPoints(prev => {
        const newPoints = [...prev, newPoint];
        if (newPoints.length === 5) {
          setIsComplete(true);
          const newTotal = totalStars + 1;
          setTotalStars(newTotal);
          localStorage.setItem('cv_total_stars', newTotal.toString());
          
          setIsPulsing(true);
          setTimeout(() => setIsPulsing(false), 1000);
          window.dispatchEvent(new CustomEvent('star-achieved', { detail: { count: newTotal } }));

          setTimeout(() => setIsFalling(true), 400);
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
  }, [isComplete, totalStars]);

  const getStarPath = () => {
    if (points.length !== 5) return '';
    const p = points;
    return `M ${p[0].x} ${p[0].y} L ${p[2].x} ${p[2].y} L ${p[4].x} ${p[4].y} L ${p[1].x} ${p[1].y} L ${p[3].x} ${p[3].y} Z`;
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <svg className="w-full h-full">
        <g className={`transition-transform duration-1000 ease-in ${isFalling ? 'translate-y-[120vh] rotate-45' : ''}`} style={{ transformOrigin: 'center' }}>
          {points.length === 5 && (
            <path d={getStarPath()} fill="rgba(255, 255, 0, 0.4)" stroke="#FFFF00" strokeWidth="3" className="animate-pulse" />
          )}
          {points.map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y})`}>
              <circle r="5" fill="#DA251D" stroke="#FFFF00" strokeWidth="2" />
              <path d="M 0 -10 L 2.5 -2.5 L 10 0 L 2.5 2.5 L 0 10 L -2.5 2.5 L -10 0 L -2.5 -2.5 Z" fill="#FFFF00" className="animate-spin-slow origin-center scale-75" />
            </g>
          ))}
        </g>
      </svg>

      {totalStars > 0 && (
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${isPulsing ? 'scale-125' : 'scale-100'}`}>
            <div className={`flex items-center gap-3 px-6 py-3 bg-slate-900/80 dark:bg-white/90 backdrop-blur-md rounded-full shadow-2xl border-2 transition-colors duration-300 ${isPulsing ? 'border-vn-yellow shadow-[0_0_20px_rgba(255,223,0,0.5)]' : 'border-white/10 dark:border-slate-200'}`}>
                <StarIcon size={22} fill={isPulsing ? "#FFFF00" : "#FFFF00"} className={`text-vn-yellow ${isPulsing ? 'animate-bounce' : ''}`} />
                <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stars</span>
                    <span className={`text-2xl font-black font-display ${isPulsing ? 'text-vn-yellow' : 'text-white dark:text-slate-900'}`}>{totalStars}</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ClickStarEffect;
