import React, { useEffect, useState, useRef } from 'react';

const ScrollProgressLine: React.FC = () => {
  const [pathData, setPathData] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  
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
    const verticalLineX = timelineRect.left + 6; 
    
    const expStartY = absTimelineTop + 30; 
    const expEndY = timelineRect.bottom + scrollTop;

    // Dynamic Control Points
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
        
        const horizontalY = trackRect.top + scrollTop; 
        const horizontalEndX = trackRect.right;
        const radius = 30;
        
        if (horizontalY > expEndY + radius) {
             d += ` L ${verticalLineX} ${horizontalY - radius}`;
             d += ` Q ${verticalLineX} ${horizontalY} ${verticalLineX + radius} ${horizontalY}`;
             d += ` L ${horizontalEndX} ${horizontalY}`;
        } else {
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
      // Calculate scroll percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      
      let scrollPercent = 0;
      if (docHeight > 0) {
        scrollPercent = scrollTop / docHeight;
      }
      
      scrollPercent = Math.min(scrollPercent * 1.15, 1);

      if (totalLength > 0) {
          targetLengthRef.current = totalLength * scrollPercent;
      }

      currentLengthRef.current = lerp(currentLengthRef.current, targetLengthRef.current, 0.1);

      if (pathRef.current && glowPathRef.current) {
        const dashOffset = Math.max(0, totalLength - currentLengthRef.current);
        
        pathRef.current.style.strokeDashoffset = `${dashOffset}`;
        glowPathRef.current.style.strokeDashoffset = `${dashOffset}`;

        if (headRef.current && currentLengthRef.current > 0 && currentLengthRef.current < totalLength) {
           try {
               const point = pathRef.current.getPointAtLength(currentLengthRef.current);
               headRef.current.setAttribute('transform', `translate(${point.x}, ${point.y})`);
               headRef.current.style.opacity = '1';
           } catch (e) {
               // Ignore geometry errors
           }
        } else if (headRef.current) {
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
    setTimeout(calculatePath, 100); 

    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath);
    
    // Use ResizeObserver to redraw path when body height changes (e.g. search filter)
    const resizeObserver = new ResizeObserver(() => {
        // Wrap in RAF to ensure layout is done and avoid loop
        requestAnimationFrame(() => calculatePath());
    });
    resizeObserver.observe(document.body);
    
    return () => {
        window.removeEventListener('resize', calculatePath);
        window.removeEventListener('scroll', calculatePath);
        resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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

        <path
          d={pathData}
          fill="none"
          stroke="#94a3b8" 
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-20 dark:opacity-10"
        />

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