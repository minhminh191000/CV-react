import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../ThemeContext';

interface StarData {
  id: number;
  left: number; // Store as number for calculations
  top: number;  // Store as number for calculations
  size: number;
  duration: number;
  delay: number;
  color: string;
  offsetX: number; // Current displacement from explosion
  offsetY: number; // Current displacement from explosion
  isExplodingSource: boolean;
}

const AmbientBackground: React.FC = () => {
  const { theme } = useTheme();
  const [stars, setStars] = useState<StarData[]>([]);
  const [explosion, setExplosion] = useState<{ x: number, y: number, active: boolean }>({ x: 0, y: 0, active: false });

  // Initialize stars
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let starCount = 30;
    if (theme === 'dark') {
      starCount = isMobile ? 40 : 100;
    }

    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 14 + 6,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      color: Math.random() > 0.6 
        ? 'text-vn-red/40 dark:text-vn-red/60' 
        : (Math.random() > 0.5 
            ? 'text-vn-yellow/40 dark:text-vn-yellow/60' 
            : 'text-slate-300 dark:text-slate-600'),
      offsetX: 0,
      offsetY: 0,
      isExplodingSource: false
    }));
    setStars(newStars);
  }, [theme]);

  // Handle Explosion Logic
  const triggerExplosion = useCallback(() => {
    if (theme !== 'dark' || stars.length === 0) return;

    // Pick a random star to be the epicenter
    const sourceIdx = Math.floor(Math.random() * stars.length);
    const sourceStar = stars[sourceIdx];
    const centerX = sourceStar.left;
    const centerY = sourceStar.top;

    setExplosion({ x: centerX, y: centerY, active: true });

    // Calculate push for all stars
    setStars(prevStars => prevStars.map((star, idx) => {
      if (idx === sourceIdx) return { ...star, isExplodingSource: true };

      // Calculate distance in viewport percentage
      const dx = star.left - centerX;
      const dy = star.top - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = 25; // Explosion radius in % of screen

      if (distance < radius && distance > 0) {
        // Calculate push strength (stronger when closer)
        const power = (1 - distance / radius) * 5; // Max 5% screen push
        return {
          ...star,
          offsetX: (dx / distance) * power,
          offsetY: (dy / distance) * power,
          isExplodingSource: false
        };
      }
      return { ...star, isExplodingSource: false };
    }));

    // Reset explosion visual and star positions after a delay
    setTimeout(() => {
      setExplosion(prev => ({ ...prev, active: false }));
      setStars(prevStars => prevStars.map(star => ({
        ...star,
        offsetX: 0,
        offsetY: 0,
        isExplodingSource: false
      })));
    }, 1500);
  }, [theme, stars]);

  useEffect(() => {
    if (theme !== 'dark') return;
    
    // Interval between 2-3 seconds
    const intervalTime = 2000 + Math.random() * 1000;
    const interval = setInterval(triggerExplosion, intervalTime);
    
    return () => clearInterval(interval);
  }, [theme, triggerExplosion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Shockwave Visual */}
      {explosion.active && (
        <div 
          className="absolute rounded-full border border-white/20 bg-white/5 animate-ping"
          style={{
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            width: '200px',
            height: '200px',
            marginLeft: '-100px',
            marginTop: '-100px',
          }}
        />
      )}

      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} transition-transform duration-1000 ease-out`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${star.offsetX}vw, ${star.offsetY}vh) ${star.isExplodingSource ? 'scale(2.5)' : 'scale(1)'}`,
            zIndex: star.isExplodingSource ? 10 : 1
          }}
        >
          <div className={`w-full h-full ${!star.isExplodingSource ? 'animate-blob' : ''}`}
            style={{
              animationDuration: `${star.duration}s`,
              animationDelay: `-${star.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full drop-shadow-sm transition-all duration-300 ${star.isExplodingSource ? 'text-white brightness-200' : ''}`}>
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmbientBackground;