import React, { useEffect, useState, useRef } from 'react';

const ScrollProgressLine: React.FC = () => {
  const [pathData, setPathData] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [containerHeight, setContainerHeight] = useState('100%');
  
  // Refs for direct DOM manipulation
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const requestRef = useRef<number>(0);
  
  // Physics state
  const targetLengthRef = useRef(0);
  const currentLengthRef = useRef(0);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const calculatePath = () => {
    const profileImg = document.getElementById('cv-profile-img');
    const timeline = document.getElementById('cv-experience-timeline');
    const horizontalConnector = document.getElementById('cv-horizontal-connector');
    const horizontalTrack = document.getElementById('cv-horizontal-track');
    
    // Ensure container covers full scroll height
    const docHeight = document.documentElement.scrollHeight;
    setContainerHeight(`${docHeight}px`);
    
    if (!profileImg || !timeline) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const imgRect = profileImg.getBoundingClientRect();
    const timelineRect = timeline.getBoundingClientRect();

    // Absolute positions relative to the document
    const absImgTop = imgRect.top + scrollTop;
    const absImgLeft = imgRect.left + imgRect.width / 2;
    const absTimelineTop = timelineRect.top + scrollTop;
    
    // --- SEGMENT 1: Start (Image) to Experience Top ---
    const startX = absImgLeft;
    const startY = imgRect.bottom + scrollTop;

    // Experience Left Line position correction
    // Mobile dots are usually shifted slightly relative to the container edge.
    // In Experience.tsx: dots are absolute left-[-5px]. Container is relative.
    // We adjust verticalLineX to align visually with the dots.
    const verticalLineX = timelineRect.left + 6; // +6px nudge to hit the center of the bullets on mobile/desktop
    
    const expStartY = absTimelineTop + 30; 
    const expEndY = timelineRect.bottom + scrollTop;

    // Dynamic Control Points (Bezier Curve)
    // Adjust control points based on distance to avoid loops on short screens
    const distY = expStartY - startY;
    const controlPointOffset = Math.min(150, Math.max(50, distY / 2));

    const cp1X = startX;
    const cp1Y = startY + controlPointOffset; 
    const cp2X = verticalLineX;
    const cp2Y = expStartY - controlPointOffset;

    let d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${verticalLineX} ${expStartY}`;

    // --- SEGMENT 2: Vertical Line Down Experience ---
    d += ` L ${verticalLineX} ${expEndY}`;

    // --- SEGMENT 3: Turn Right and Horizontal Line (If Elements Exist) ---
    if (horizontalConnector && horizontalTrack) {
        const trackRect = horizontalTrack.getBoundingClientRect();
        
        // We want to turn from verticalLineX at expEndY to the horizontal track
        const horizontalY = trackRect.top + scrollTop; 
        const horizontalEndX = trackRect.right;

        // Radius for the 90 degree turn
        const radius = 30;
        
        // Ensure we have space to curve
        // If vertical section ends too close or below the horizontal target, simply connect straight
        if (horizontalY > expEndY + radius) {
             // Continue vertical down to turn point
             d += ` L ${verticalLineX} ${horizontalY - radius}`;
             // Quadratic curve to turn right
             d += ` Q ${verticalLineX} ${horizontalY} ${verticalLineX + radius} ${horizontalY}`;
             // Horizontal line across
             d += ` L ${horizontalEndX} ${horizontalY}`;
        } else {
             // Fallback: Direct line logic for tight spaces
             d += ` L ${verticalLineX} ${horizontalY} L ${horizontalEndX} ${horizontalY}`;
        }
    }

    setPathData(d);
  };

  // Update path length when path changes
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalLength(len);
    }
  }, [pathData]);

  // Animation Loop
  useEffect(() => {
    const animate = () => {
      // Logic: Calculate how much of the path should be shown based on scroll position
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll percentage
      let scrollPercent = 0;
      if (docHeight > 0) {
        scrollPercent = scrollTop / docHeight;
      }
      
      // Accelerate the filling slightly so it finishes before the absolute bottom
      scrollPercent = Math.min(scrollPercent * 1.15, 1);

      if (totalLength > 0) {
          targetLengthRef.current = totalLength * scrollPercent;
      }

      // Smooth interpolation (Lerp)
      currentLengthRef.current = lerp(currentLengthRef.current, targetLengthRef.current, 0.1);

      if (pathRef.current && glowPathRef.current) {
        const dashOffset = Math.max(0, totalLength - currentLengthRef.current);
        
        pathRef.current.style.strokeDashoffset = `${dashOffset}`;
        glowPathRef.current.style.strokeDashoffset = `${dashOffset}`;

        // Move the glowing head
        if (headRef.current && currentLengthRef.current > 0 && currentLengthRef.current < totalLength) {
           try {
               const point = pathRef.current.getPointAtLength(currentLengthRef.current);
               headRef.current.setAttribute('transform', `translate(${point.x}, ${point.y})`);
               headRef.current.style.opacity = '1';
           } catch (e) {
               // Ignore geometry errors during layout shifts
           }
        } else if (headRef.current) {
            // Hide head at start or very end if desired
            headRef.current.style.opacity = currentLengthRef.current < 5 ? '0' : '1';
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [totalLength]);

  // Handle Resize and Init
  useEffect(() => {
    // Initial calc
    setTimeout(calculatePath, 100); 

    window.addEventListener('resize', calculatePath);
    // Recalculate on scroll to handle dynamic UI changes (like sticky headers or expanding cards)
    window.addEventListener('scroll', calculatePath);
    
    // Periodic check for layout shifts (e.g., images loading)
    const timer = setInterval(calculatePath, 1000);
    
    return () => {
        window.removeEventListener('resize', calculatePath);
        window.removeEventListener('scroll', calculatePath);
        clearInterval(timer);
    };
  }, []);

  return (
    <div 
      className="absolute top-0 left-0 w-full pointer-events-none z-0 overflow-hidden"
      style={{ height: containerHeight }}
    >
      <svg 
        ref={svgRef}
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFF00" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#DA251D" />
          </linearGradient>

          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The faint background track */}
        <path
          d={pathData}
          fill="none"
          stroke="#94a3b8" 
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-20 dark:opacity-10"
        />

        {/* The Glow effect behind the beam */}
        <path
          ref={glowPathRef}
          d={pathData}
          fill="none"
          stroke="#DA251D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength}
          filter="url(#strong-glow)"
          className="opacity-60"
        />

        {/* The main colored beam */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#beamGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength}
        />

        {/* The Head Particle */}
        <g ref={headRef} className="transition-opacity duration-300 opacity-0">
          <circle r="8" fill="#DA251D" className="opacity-50" filter="url(#strong-glow)" />
          <circle r="4" fill="#FFFF00" />
          <circle r="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export default ScrollProgressLine;