import React, { useEffect, useState } from 'react';

const AmbientBackground: React.FC = () => {
  const [stars, setStars] = useState<Array<{
    id: number;
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Optimization: Reduce particle count on mobile devices for better performance
    // Increased counts as requested: 100 for desktop, 40 for mobile
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 40 : 100;

    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 14 + 6, // 6px to 20px
      duration: Math.random() * 15 + 10, // 10s to 25s
      delay: Math.random() * 10,
      // Colors adjusted to be visible in both light (off-white) and dark (slate-900) modes
      color: Math.random() > 0.6 
        ? 'text-vn-red/40 dark:text-vn-red/60' 
        : (Math.random() > 0.5 
            ? 'text-vn-yellow/40 dark:text-vn-yellow/60' 
            : 'text-slate-300 dark:text-slate-600'),
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} animate-blob`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `-${star.delay}s`,
          }}
        >
          {/* 4-point Star / Sparkle Shape */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default AmbientBackground;