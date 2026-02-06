import React, { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const ClickStarEffect: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isFalling, setIsFalling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // If animation is in progress, ignore clicks
      if (isComplete) return;

      const target = e.target as HTMLElement;
      
      // Check if user clicked on an interactive element (link, button, input, etc.)
      // Also check if they clicked inside our modal (we don't want stars inside the modal content usually)
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      
      // If clicking interactive element, do nothing
      if (isInteractive) return;

      const newPoint = { x: e.clientX, y: e.clientY };

      setPoints(prev => {
        const newPoints = [...prev, newPoint];
        
        if (newPoints.length === 5) {
          // We have 5 points, trigger the sequence
          setIsComplete(true);
          
          // Small delay before falling to let user see the connection
          setTimeout(() => {
            setIsFalling(true);
          }, 300);

          // Reset after animation
          setTimeout(() => {
            setPoints([]);
            setIsComplete(false);
            setIsFalling(false);
          }, 1500); // 1.5s total duration matches transition
        }

        return newPoints;
      });
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isComplete]);

  // Generate the SVG path for the star
  // Standard pentagram connection order: 0 -> 2 -> 4 -> 1 -> 3 -> 0
  const getStarPath = () => {
    if (points.length !== 5) return '';
    const p = points;
    return `M ${p[0].x} ${p[0].y} L ${p[2].x} ${p[2].y} L ${p[4].x} ${p[4].y} L ${p[1].x} ${p[1].y} L ${p[3].x} ${p[3].y} Z`;
  };

  if (points.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      <svg className="w-full h-full">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Falling Group */}
        <g 
          className={`transition-transform duration-1000 ease-in ${isFalling ? 'translate-y-[120vh] rotate-12' : ''}`}
          style={{ transformOrigin: 'center' }}
        >
          {/* Draw connecting lines when we have 5 points */}
          {points.length === 5 && (
            <path
              d={getStarPath()}
              fill="rgba(255, 255, 0, 0.3)"
              stroke="#FFFF00"
              strokeWidth="2"
              filter="url(#glow)"
              className="animate-pulse"
            />
          )}

          {/* Draw dots at click locations */}
          {points.map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y})`}>
              <circle r="4" fill="#DA251D" stroke="#FFFF00" strokeWidth="2" />
              {/* Star sparkle effect on the dot */}
              <path 
                d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" 
                fill="#FFFF00" 
                className="animate-spin-slow origin-center scale-50"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ClickStarEffect;